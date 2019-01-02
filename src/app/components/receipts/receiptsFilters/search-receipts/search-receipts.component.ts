import {Component, OnInit, LOCALE_ID} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {DocumentService} from '../../../../services/documents.service';
import {DocumentModel} from '../../../../models/document.model';
import {MatDialog, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material';
import {UserService} from '../../../../services/user.service';
import {SessionTimeoutDialogComponent} from '../../../session-timeout-dialog/session-timeout-dialog.component';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import {DateRangeModel} from '../../../../models/date.range.model';
import {CompanyService} from '../../../../services/company.service';
import {CompanyModel} from '../../../../models/company.model';

@Component({
    selector: 'app-search-receipts',
    templateUrl: './search-receipts.component.html',
    styleUrls: ['./search-receipts.component.css'],
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
export class SearchReceiptsComponent implements OnInit {

    companyId: string;
    documents: DocumentModel[] = [];
    isPromiseDone = false;
    sortAsc: boolean;
    sortKey: string;
    startDateFrom: string;
    startDateTo: string;
    updateBtn = false;
    UUID: string;
    advanceSearch: DateRangeModel = new DateRangeModel();
    company: CompanyModel;

    constructor(private route: ActivatedRoute, private documentService: DocumentService, public dialog: MatDialog,
                public userService: UserService, private router: Router, private companyService: CompanyService) {
    }

    ngOnInit() {
        this.advanceSearch.EndDate = (new Date()).toISOString();
        this.startDateTo = (new Date()).toISOString();
        const now = new Date();
        now.setMonth(now.getMonth() - 1);
        this.startDateFrom = now.toISOString();
        this.advanceSearch.InitDate = now.toISOString();

        this.route.params.subscribe((params: Params) => {
            this.companyId = params['cid'];
        });

        this.companyService.getCompanyById(this.companyId)
            .subscribe(data => {
                this.company = data;
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

        this.loadDocuments();
    }

    loadDocuments() {
        this.isPromiseDone = false;
        this.documents = [];
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.documentService.getAllDocumentsByCompanyDateRange(params.get('cid'),
                    this.advanceSearch.InitDate, this.advanceSearch.EndDate, this.advanceSearch.Rfc,
                    this.advanceSearch.Curp, 'Recibo', this.advanceSearch.Status,
                    this.advanceSearch.UUID, this.advanceSearch.Value1, this.advanceSearch.Value2,
                    this.advanceSearch.Value3, this.advanceSearch.Value4, this.advanceSearch.Value5,
                    this.advanceSearch.Value6))
            .subscribe(data => {
                this.documents = data;
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
    }

    sortedBy(event) {
        this.sortAsc = this.sortKey === event ? !this.sortAsc : false;
        this.sortKey = event;
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

    onNotify(status: boolean): void {
        console.log(status);
        this.updateBtn = !status;
    }
}
