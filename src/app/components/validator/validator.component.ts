import {Component, OnInit} from '@angular/core';
import {UploadService} from '../../services/upload.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {MatDialog} from '@angular/material';
import * as shajs from 'sha.js';
import {VerifySignatureRequest} from '../../models/VerifySignatureRequest.model';
import {SessionTimeoutDialogComponent} from '../session-timeout-dialog/session-timeout-dialog.component';

@Component({
    selector: 'app-validator',
    templateUrl: './validator.component.html',
    styleUrls: ['./validator.component.css']
})
export class ValidatorComponent implements OnInit {

    file: File;
    reqs: VerifySignatureRequest[];
    isPromiseDone = true;
    processStatus = 0;

    constructor(private userService: UserService, private router: Router, public dialog: MatDialog, private uploadService: UploadService) {
    }

    ngOnInit() {
        this.reqs = [];
    }

    onFilesSelected($event: any) {
        const filesPDF: { [name: string]: File } = {};
        const filesNOM: { [name: string]: File } = {};
        for (const f of $event.target.files) {
            const file: File = f;
            if (this.getExtension(file.name) === 'nom151') {
                filesNOM[this.removeExtension(file.name)] = file;
            }
            if (file.type.toLowerCase() === 'application/pdf') {
                filesPDF[this.removeExtension(file.name)] = file;
            }
        }
        for (const f in filesNOM) {
            if (filesPDF.hasOwnProperty(f)) {
                let ref = this;
                let req = new VerifySignatureRequest();
                const myReaderPDF: FileReader = new FileReader();
                myReaderPDF.onloadend = function (e) {
                    req.PdfReceiptName = f;
                    req.PdfReceiptFile = btoa(myReaderPDF.result);
                    req.PdfReceiptHash = shajs('sha256').update(btoa(req.PdfReceiptFile)).digest('hex');
                    const myReaderNOM: FileReader = new FileReader();
                    myReaderNOM.onloadend = function (e) {
                        req.NOM151Cert = myReaderNOM.result;
                        req.NOM151CertHash = shajs('sha256').update(req.NOM151Cert).digest('hex');
                        req.Status = 0;
                        ref.reqs.push(req);

                    }
                    myReaderNOM.readAsText(filesNOM[f]);
                };
                myReaderPDF.readAsBinaryString(filesPDF[f]);
            }
        }
        this.processStatus = 1;
    }

    validateSignature() {
        this.isPromiseDone = false;
        var res = new VerifySignatureRequest();
        for (const r of this.reqs) {
            this.uploadService.verifySignatureNoCert(r).subscribe(data => {
                r.Status = 1;
                res = data;
                r.DocumentId = res.DocumentId;
                r.NOM151Cert = '';
                r.PdfReceiptFile = '';
                this.isPromiseDone = true;
            }, error => {
                if (error.status === 405) {
                    this.dialog.closeAll();
                    let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                        width: '75%'
                    });
                }
                if (error.status === 409) {
                    r.Status = 2;
                }
                r.NOM151Cert = '';
                r.PdfReceiptFile = '';
            });
        }
        this.processStatus = 2;
    }

    removeExtension(name: string) {
        const arr: string[] = name.split('.');
        let realName = '';

        for (var i = 0; i < arr.length - 1; i++) {
            realName += arr[i];
        }

        if (realName == '') {
            realName = name;
        }
        return realName;
    }

    getExtension(name: string) {
        return name.split('.').pop();
    }
}
