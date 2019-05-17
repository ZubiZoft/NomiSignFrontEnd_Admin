import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {DocumentService} from '../../../../services/documents.service';
import {DocumentModel} from '../../../../models/document.model';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material';
import {VerifyNotAlertDialog} from '../unsigned-receipts/unsigned-receipts.component';
import {Location} from '@angular/common';
import {UserService} from '../../../../services/user.service';
import {SessionTimeoutDialogComponent} from '../../../session-timeout-dialog/session-timeout-dialog.component';
import {DateAdapter} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {CompanyModel} from '../../../../models/company.model';
import {CompanyService} from '../../../../services/company.service';
import {DateRangeModel} from '../../../../models/date.range.model';

@Component({
    selector: 'app-denied-receipts',
    templateUrl: './denied-receipts.component.html',
    styleUrls: ['./denied-receipts.component.css'],
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
export class DeniedReceiptsComponent implements OnInit {

    companyId: string;
    documents: DocumentModel[] = [];
    isPromiseDone = false;
    sortAsc: boolean;
    sortKey: string;
    updateBtn = false;
    company: CompanyModel;
    advanceSearch: DateRangeModel = new DateRangeModel();
    searchX = '';

    constructor(private route: ActivatedRoute, private documentService: DocumentService, public dialog: MatDialog,
                public userService: UserService, private router: Router, private companyService: CompanyService) {
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

        this.advanceSearch.CompanyId = this.companyId;
        this.advanceSearch.Status = 'Rechazado';

        this.route.queryParams.subscribe(params => {
            this.searchX = params['search'];
            if (this.searchX == null) {
                this.searchX = '';
            }
        });
    }

    loadDocuments() {
        this.isPromiseDone = false;
        this.route.paramMap
            .switchMap((params: ParamMap) => this.companyService.getCompanyById(params.get('cid')))
            .subscribe(data => {
                this.company = data;
                this.route.paramMap
                    .switchMap((params: ParamMap) => this.documentService.getRejectedDocumentsForCompany(params.get('cid')))
                    .subscribe(dataX => {
                        for (let d of dataX) {
                            d.CheckedBox = false;
                        }
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

    selectAllDocuments() {
        if (this.documents.length <= 0) {
            return;
        }
        var l = true;
        if (this.documents[0].CheckedBox) {
            l = false;
        }
        this.documents.filter(item => {
            for (const key in item) {
                if (key === 'CheckedBox') {
                    continue;
                }
                let lowerKey = '' + item[key];
                if (lowerKey !== undefined && lowerKey.toString().toLowerCase().includes(this.searchX.toLowerCase())) {
                    item['CheckedBox'] = l;
                }
            }
        });
        this.updateBtn = l;
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
                    data: {'message': '¡Los recibos de nómina seleccionados han sido actualizados!'}
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
                        data: {'message': '¡Un error ocurrió actualizando los recibos de nómina!'}
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
                private location: Location) {
    }

    loginMessage: string;

    ngOnInit() {
        this.loginMessage = this.data['message'];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
