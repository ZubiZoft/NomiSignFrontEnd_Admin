import {Component, OnInit} from '@angular/core';
import {UploadService} from '../../services/upload.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {MatDialog} from '@angular/material';
import * as shajs from 'sha.js';
import {VerifySignatureRequest} from '../../models/VerifySignatureRequest.model';

@Component({
    selector: 'app-validator',
    templateUrl: './validator.component.html',
    styleUrls: ['./validator.component.css']
})
export class ValidatorComponent implements OnInit {

    file: File;
    reqs: VerifySignatureRequest[];
    req: VerifySignatureRequest;
    nom: string;

    constructor(private userService: UserService, private router: Router, public dialog: MatDialog) {
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
                        console.log(req);
                    }
                    myReaderNOM.readAsText(filesNOM[f]);
                };
                myReaderPDF.readAsBinaryString(filesPDF[f]);
            }
        }
    }

    onFileSelectDemo($event: any) {
        let ref = this;

        this.file = $event.target.files[0];

        const myReaderPDF: FileReader = new FileReader();
        myReaderPDF.onloadend = function (e) {
            // you can perform an action with read data here
            ref.req = new VerifySignatureRequest();
            ref.req.PdfReceiptName = ref.file.name;
            ref.req.PdfReceiptFile = btoa(myReaderPDF.result);
            ref.req.PdfReceiptHash = shajs('sha256').update(btoa(ref.req.PdfReceiptFile)).digest('hex');
        };
        myReaderPDF.readAsBinaryString(ref.file);
    }

    updateModelReq() {
        this.req.NOM151Cert = this.nom;
        this.req.NOM151CertHash = shajs('sha256').update(this.nom).digest('hex');
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
