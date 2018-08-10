import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import { DocumentService } from '../../../../services/documents.service';
import { DocumentModel } from '../../../../models/document.model';
import 'rxjs/add/operator/switchMap';
import { SortByPipe } from '../../../../pipes/sort-by.pipe';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {VerifyNotAlertDialog} from '../unsigned-receipts/unsigned-receipts.component';
import { Location } from '@angular/common';
import {UserService} from '../../../../services/user.service';
import {SessionTimeoutDialogComponent} from '../../../session-timeout-dialog/session-timeout-dialog.component';

@Component({
  selector: 'app-denied-receipts',
  templateUrl: './denied-receipts.component.html',
  styleUrls: ['./denied-receipts.component.css']
})
export class DeniedReceiptsComponent implements OnInit {

    companyId: string;
    documents: DocumentModel[];
    isPromiseDone = false;
    sortAsc: boolean;
    sortKey: string;
    updateBtn = false;

    constructor(private route: ActivatedRoute, private documentService: DocumentService, public dialog: MatDialog,
                public userService: UserService, private router: Router) {
        this.dialog.afterAllClosed.subscribe(
            () => {
                this.loadDocuments();
            }
        );
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.companyId = params['cid'];
        });

        this.loadDocuments();
    }

    loadDocuments() {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.documentService.getRejectedDocumentsForCompany(params.get('cid')))
            .subscribe(data => {
                this.isPromiseDone = true;
                for (let d of data) {
                    d.CheckedBox = false;
                }
                this.documents = data;
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
            });
    }

    sortedBy(event) {
        this.sortAsc = this.sortKey === event ? !this.sortAsc : false;
        this.sortKey = event;
    }

    selectedCheckBox() {
        for (const c of this.documents) {
            if (c.CheckedBox) {
                this.updateBtn = true;
                return;
            }
        }
        this.updateBtn = false;
    }

    updateStatus() {
        var selectedIds: number[] = [];
        for (const c of this.documents) {
            if (c.CheckedBox) {
                selectedIds.push(c.DocumentId);
            }
        }
        this.documentService.sendToUnsignedDocuments(selectedIds)
            .subscribe(data => {
                const dialogRef = this.dialog.open(VerifyNotAlertDialog, {
                    width: '50%',
                    data: { 'message': '¡Los recibos de nómina seleccionados han sido actualizados!' }
                });
            }, error => {
                if (error.status === 405) {
                    this.dialog.closeAll();
                    let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                        width: '75%'
                    });
                } else {
                    const dialogRef = this.dialog.open(VerifyNotAlertDialog, {
                        width: '50%',
                        data: { 'message': '¡Un error ocurrió actualizando los recibos de nómina!' }
                    });
                }
            });

    }
}

@Component({
    selector: 'change-status-alert-dialog',
    templateUrl: 'change-status-alert-dialog.html'
})
export class ChangeStatusAlertDialog implements OnInit {

    constructor(public dialogRef: MatDialogRef<ChangeStatusAlertDialog>, @Inject(MAT_DIALOG_DATA) public data: any,
                private location: Location) { }
    loginMessage: string;

    ngOnInit() {
        this.loginMessage = this.data['message'];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
