import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {DocumentService} from '../../../../services/documents.service';
import {DocumentModel} from '../../../../models/document.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material';
import {UserService} from '../../../../services/user.service';
import {SessionTimeoutDialogComponent} from '../../../session-timeout-dialog/session-timeout-dialog.component';
import {DateAdapter} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {CompanyService} from '../../../../services/company.service';
import {CompanyModel} from '../../../../models/company.model';
import {DateRangeModel} from '../../../../models/date.range.model';

@Component({
    selector: 'app-unsigned-receipts',
    templateUrl: './unsigned-receipts.component.html',
    styleUrls: ['./unsigned-receipts.component.css'],
    providers: [{
        provide: LOCALE_ID, useValue: 'es-MX'
    }, {
        provide: MAT_DATE_LOCALE, useValue: 'es-MX'
    }, {
        provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]
    }, {
        provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS
    }]
})
export class UnsignedReceiptsComponent implements OnInit {

    companyId: string;
    documents: DocumentModel[] = [];
    isPromiseDone = false;
    sortAsc: boolean;
    sortKey: string;
    updateBtn = false;
    company: CompanyModel;
    advanceSearch: DateRangeModel = new DateRangeModel();

    constructor(private route: ActivatedRoute, private documentService: DocumentService, public dialog: MatDialog,
                public userService: UserService, private router: Router, private companyService: CompanyService) {
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
            .switchMap((params: ParamMap) => this.companyService.getCompanyById(params.get('cid')))
            .subscribe(data => {
                this.company = data;
                this.route.paramMap
                    .switchMap((params: ParamMap) => this.documentService.getUnsignedDocumentsForCompany(params.get('cid')))
                    .subscribe(dataX => {
                        this.documents = dataX;
                        this.isPromiseDone = true;
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

        this.advanceSearch.CompanyId = this.companyId;
        this.advanceSearch.Status = 'SinFirma';
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
        this.isPromiseDone = false;
        const selectedIds: number[] = [];
        for (const c of this.documents) {
            if (c.CheckedBox) {
                selectedIds.push(c.DocumentId);
            }
        }
        this.documentService.notifyUnsignedDocuments(selectedIds)
            .subscribe(() => {
                this.isPromiseDone = true;
                const dialogRef = this.dialog.open(VerifyNotAlertDialog, {
                    width: '50%',
                    data: {'message': '¡Se ha enviado una notificación a los empleados de los recibos de nómina seleccionados!'}
                });
            }, error => {
                this.isPromiseDone = true;
                if (error.status === 405) {
                    this.dialog.closeAll();
                    let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                        width: '75%'
                    });
                } else {
                    const dialogRef = this.dialog.open(VerifyNotAlertDialog, {
                        width: '50%',
                        data: {'message': '¡Un error ocurrió enviando la notificación al empleado!'}
                    });
                }
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

    selectAllDocuments() {
        if (this.documents.length <= 0) {
            return;
        }
        var l = true;
        if (this.documents[0].CheckedBox) {
            l = false;
        }
        for (const d of this.documents) {
            d.CheckedBox = l;
        }
        this.updateBtn = l;
    }
}

@Component({
    selector: 'verify-not-alert-dialog',
    templateUrl: 'verify-not-alert-dialog.html'
})
export class VerifyNotAlertDialog implements OnInit {

    constructor(public dialogRef: MatDialogRef<VerifyNotAlertDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    loginMessage: string;

    ngOnInit() {
        this.loginMessage = this.data['message'];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
