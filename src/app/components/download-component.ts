import { Component, Input } from '@angular/core';
import {Headers, Http, RequestOptions, ResponseContentType} from '@angular/http';
import { CustomBrowserXhr } from '../services/custom-browser-xhr';
import * as FileSaver from 'file-saver';
import {environment} from '../../environments/environment';
import {DocumentModel} from '../models/document.model';

const rootURL: string = environment.serviceUrl;

@Component({
    selector: 'download-btn',
    template: '<button mat-raised-button color="primary" style=" width: 100%;" (click)="downloadFile()" [disabled]="disable"' +
    '                  i18n="action | button which will send a notification to the employees to sign the selected receipt.">' +
    '              Descargar' +
    '          </button> ',
    providers: [
        { provide: CustomBrowserXhr, useClass: CustomBrowserXhr }
    ]
})

export class DownloadComponent {

    @Input() docs: DocumentModel[];
    @Input() disable: boolean;

    constructor(private http: Http) {
    }

    public downloadFile() {
        let docIds: number[] = [];
        for (const d of this.docs) {
            if (d.CheckedBox) {
                docIds.push(d.DocumentId);
                d.CheckedBox = false;
            }
        }
        const _headers = new Headers({ 'Content-Type': 'application/json' })
        const url = rootURL + 'api/documents/download/';
        const body: number[] = docIds;
        const options = new RequestOptions({ method: 'POST', headers: _headers, responseType: ResponseContentType.Blob });
        return this.http.post(url, body, options)
            .subscribe(
                (res: any) => {
                    let blob = res.blob();
                    let filename = 'nominas.zip';
                    FileSaver.saveAs(blob, filename);
                }
            );
    }
}
