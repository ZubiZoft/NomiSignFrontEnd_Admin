//angular imports
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

//rxjs imports
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/finally'

import { DocumentModel } from '../../models/document.model'
import { DocumentService } from '../../services/documents.service'

//angular material imports
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'


@Component({
    selector: 'ng-documents-view',
    templateUrl: './documentList.component.html',
    //styleUrls: ['./employeeEdit.component.css'],
    providers: [DocumentService]
})
export class DocumentListComponent implements OnInit {
    documents: DocumentModel[];
    companyId: string;
    signStatusSearch: string;
    isPromiseDone: boolean = false;

    constructor(private route: ActivatedRoute, private documentService: DocumentService, public snackbar: MatSnackBar, public dialog: MatDialog) {
        route.params.subscribe((params: Params)  => {
            this.signStatusSearch = params['sts'];
            this.companyId = params['cid'];
        });
    }

    showDialog(document: DocumentModel) {
        let dialogRef = this.dialog.open(RefusedDocumentAlertDialog, {
            width: '50%',
            data: {'document': document} 
        } )
    }

    sendUnVerifiedMsg() {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.documentService.notifyUnsignedDocumentsForCompany(this.companyId))
            .subscribe(data => {
                //this.documents = data
                this.isPromiseDone = true;
                alert("Successfully sent document reminders");
            });
    }

    ngOnInit(): void {

        // 1 == unsigned, 3 == rejected
        if (this.signStatusSearch === '1') {
            this.route.paramMap
                .switchMap((params: ParamMap) => this.documentService.getUnsignedDocumentsForCompany(this.companyId))
                .subscribe(data => {
                    this.documents = data
                    this.isPromiseDone = true;
                });
        }
        else {
            this.route.paramMap
                .switchMap((params: ParamMap) => this.documentService.getRejectedDocumentsForCompany(this.companyId))
                .subscribe(data => {
                    this.documents = data
                    this.isPromiseDone = true;
                });
        }
    }

}

@Component({
    selector: 'refused-alert-dialog',
    templateUrl: 'document-alert.dialog.html',
})
export class RefusedDocumentAlertDialog implements OnInit {
    doc: DocumentModel

    constructor(private route: ActivatedRoute, public dialogRef: MatDialogRef<RefusedDocumentAlertDialog>, private documentService: DocumentService, @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onResubmitClick(): void {
        this.doc.SignStatus = '1';
        // send doc update call
        this.route.paramMap
            .switchMap((params: ParamMap) => this.documentService.updateDocument(this.doc))
            .subscribe(data => {
                this.doc = data;
                this.dialogRef.close();
            });
    }

    ngOnInit(): void {
        this.doc = this.data['document'];
    }
}