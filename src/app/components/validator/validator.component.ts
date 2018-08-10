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
    req: VerifySignatureRequest;
    nom: string;

    constructor(private userService: UserService, private router: Router, public dialog: MatDialog) {
    }

    ngOnInit() {
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
}
