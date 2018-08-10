import {Component, Input} from '@angular/core';
import {Headers, Http, RequestOptions, ResponseContentType} from '@angular/http';
import {CustomBrowserXhr} from '../services/custom-browser-xhr';
import * as FileSaver from 'file-saver';
import {environment} from '../../environments/environment';
import {SessionTimeoutDialogComponent} from './session-timeout-dialog/session-timeout-dialog.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {LetterPaginationElem} from '../models/LetterPaginationElem';
import {UserService} from '../services/user.service';

const rootURL: string = environment.serviceUrl;

@Component({
    selector: 'download-report',
    template: '<button mat-raised-button color="primary" style=" width: 100%;" (click)="downloadFile()" [disabled]="disable"' +
        '                  i18n="action | button which will send a notification to the employees to sign the selected receipt.">' +
        '              Descargar' +
        '          </button> ',
    providers: [
        {provide: CustomBrowserXhr, useClass: CustomBrowserXhr}
    ]
})

export class DownloadReportComponent {

    @Input() letter: LetterPaginationElem;
    @Input() companyId: number;
    @Input() disable: boolean;

    constructor(private http: Http, public dialog: MatDialog, private router: Router, private userService: UserService) {
    }

    public downloadFile() {
        const user = this.userService.getUser();
        let _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });

        let url = rootURL;
        if (this.letter.value === 'Todos') {
            url += 'api/employeesLetter/download/' + this.companyId;
        } else {
            url += 'api/employeesLetter/download/' + this.companyId + '/' + this.letter.value;
        }
        const options = new RequestOptions({method: 'GET', headers: _headers, responseType: ResponseContentType.Blob});
        return this.http.get(url, options)
            .subscribe(
                (res: any) => {
                    let blob = res.blob();
                    let filename = 'Reporte.xlsx';
                    FileSaver.saveAs(blob, filename);
                }, error => {
                    if (error.status === 405) {
                        this.dialog.closeAll();
                        let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                            width: '75%'
                        });
                    } else {
                        this.userService.clearUser();
                        this.router.navigate(['/login']);
                    }
                }
            );
    }
}
