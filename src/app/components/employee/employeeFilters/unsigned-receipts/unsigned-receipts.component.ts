import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { DocumentService } from '../../../../services/documents.service';
import { DocumentModel } from '../../../../models/document.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-unsigned-receipts',
  templateUrl: './unsigned-receipts.component.html',
  styleUrls: ['./unsigned-receipts.component.css']
})
export class UnsignedReceiptsComponent implements OnInit {

    companyId: string;
    documents: DocumentModel[] = [];
    isPromiseDone = false;
    sortAsc: boolean;
    sortKey: string;
    updateBtn = false;

    constructor(private route: ActivatedRoute, private documentService: DocumentService, public dialog: MatDialog) {
        this.dialog.afterAllClosed.subscribe(
            () => {
                this.clearBoxes();
            }
        );
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.companyId = params['cid'];
        });

        this.route.paramMap
            .switchMap((params: ParamMap) => this.documentService.getUnsignedDocumentsForCompany(params.get('cid')))
            .subscribe(data => {
                this.documents = data;
                this.isPromiseDone = true;
            });
    }

    sortedBy(event) {
        this.sortAsc = this.sortKey === event ? !this.sortAsc : false;
        this.sortKey = event;
    }

    clearBoxes() {
        this.updateBtn = false;
        for (const d of this.documents) {
            d.CheckedBox = false;
        }
    }

    sendNotifications() {
        const selectedIds: number[] = [];
        for (const c of this.documents) {
            if (c.CheckedBox) {
                selectedIds.push(c.DocumentId);
            }
        }
        this.documentService.notifyUnsignedDocuments(selectedIds)
            .subscribe(() => {
                    const dialogRef = this.dialog.open(VerifyNotAlertDialog, {
                        width: '50%',
                        data: { 'message': '¡Se ha enviado una notificación a los empleados de los recibos de nómina seleccionados!' }
                    });
                },
                () => {
                    const dialogRef = this.dialog.open(VerifyNotAlertDialog, {
                        width: '50%',
                        data: { 'message': '¡Un error ocurrió enviando la notificación al empleado!' }
                    });
                });
    }

    selectedCheckBox() {
        for (const d of this.documents) {
            if (d.CheckedBox) {
                this.updateBtn = true;
                return;
            }
        }
        this.updateBtn = false;
    }
}

@Component({
    selector: 'verify-not-alert-dialog',
    templateUrl: 'verify-not-alert-dialog.html'
})
export class VerifyNotAlertDialog implements OnInit {

    constructor(public dialogRef: MatDialogRef<VerifyNotAlertDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }
    loginMessage: string;

    ngOnInit() {
        this.loginMessage = this.data['message'];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
