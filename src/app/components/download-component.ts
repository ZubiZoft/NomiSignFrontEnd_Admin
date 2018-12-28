import {Component, Input} from '@angular/core';
import {Headers, Http, RequestOptions, ResponseContentType} from '@angular/http';
import {CustomBrowserXhr} from '../services/custom-browser-xhr';
import * as FileSaver from 'file-saver';
import {environment} from '../../environments/environment';
import {DocumentModel} from '../models/document.model';
import {SessionTimeoutDialogComponent} from './session-timeout-dialog/session-timeout-dialog.component';
import {MatDialog} from '@angular/material';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {VerifySignatureRequest} from '../models/VerifySignatureRequest.model';

const rootURL: string = environment.serviceUrl;

@Component({
    selector: 'download-btn',
    template: '<button mat-raised-button color="primary" style=" width: 100%;" (click)="downloadFile()" [disabled]="disable">' +
    '              Descargar' +
    '          </button> ',
    providers: [
        {provide: CustomBrowserXhr, useClass: CustomBrowserXhr}
    ]
})

export class DownloadComponent {

    @Input() docs: DocumentModel[];
    @Input() verifySignReqs: VerifySignatureRequest[];
    @Input() disable: boolean;

    constructor(private http: Http, public dialog: MatDialog, private userService: UserService, private router: Router) {
    }

    public downloadVerificationFile () {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        const url = rootURL + 'api/upload/downloadCerts';
        const body = JSON.stringify(this.verifySignReqs);
        const options = new RequestOptions({method: 'POST', headers: _headers, responseType: ResponseContentType.Blob});
        return this.http.post(url, body, options)
            .subscribe(
                (res: any) => {
                    let blob = res.blob();
                    let filename = 'Constancias.zip';
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

    public downloadFile() {
        if (this.docs == null) {
            this.downloadVerificationFile();
            return;
        }
        let docIds: number[] = [];
        for (const d of this.docs) {
            if (d.CheckedBox) {
                docIds.push(d.DocumentId);
                d.CheckedBox = false;
            }
        }
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        const url = rootURL + 'api/documents/download/';
        const body: number[] = docIds;
        const options = new RequestOptions({method: 'POST', headers: _headers, responseType: ResponseContentType.Blob});
        return this.http.post(url, body, options)
            .subscribe(
                (res: any) => {
                    let blob = res.blob();
                    let filename = 'nominas.zip';
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
