import {Component, Input} from '@angular/core';
import {Headers, Http, RequestOptions, ResponseContentType} from '@angular/http';
import {CustomBrowserXhr} from '../services/custom-browser-xhr';
import * as FileSaver from 'file-saver';
import {environment} from '../../environments/environment';
import {SessionTimeoutDialogComponent} from './session-timeout-dialog/session-timeout-dialog.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {DateRangeModel} from '../models/date.range.model';

const rootURL: string = environment.serviceUrl;

@Component({
    selector: 'download-doc-report',
    template: '<button mat-raised-button color="primary" style=" width: 100%;" (click)="downloadFile()" [disabled]="disable"' +
        '                  i18n="action | button which will send a notification to the employees to sign the selected receipt.">' +
        '              <mat-icon>import_export</mat-icon>' +
        '              Excel' +
        '          </button> ',
    providers: [
        {provide: CustomBrowserXhr, useClass: CustomBrowserXhr}
    ]
})

export class DownloadDocReportComponent {

    @Input() companyId: number;
    @Input() disable: boolean;
    @Input() advanceSearch: DateRangeModel;

    constructor(private http: Http, public dialog: MatDialog, private router: Router, private userService: UserService) {
    }

    public downloadFile() {
        this.disable = true;
        const user = this.userService.getUser();
        const _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        const url = rootURL + 'api/documents/' + this.companyId +  '/DocumentsReport';
        const options = new RequestOptions({method: 'POST', headers: _headers, responseType: ResponseContentType.Blob});
        const body = JSON.stringify(this.advanceSearch);
        console.log(this.advanceSearch);
        return this.http.post(url, body, options)
            .subscribe(
                (res: any) => {
                    const blob = res.blob();
                    const filename = 'Reporte.xlsx';
                    FileSaver.saveAs(blob, filename);
                    this.disable = false;
                }, error => {
                    if (error.status === 405) {
                        this.dialog.closeAll();
                        const dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                            width: '75%'
                        });
                    } else {
                        this.userService.clearUser();
                        this.router.navigate(['/login']);
                    }
                    this.disable = false;
                }
            );
    }
}
