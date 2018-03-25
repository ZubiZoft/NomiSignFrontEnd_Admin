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
    documents: DocumentModel[];
    isPromiseDone = false;
    sortAsc: boolean;
    sortKey: string;
    startDateFrom: string;
    startDateTo: string;
    fromVal: string;
    toVal: string;
    rfcVal: string;
    curpVal: string;
    typeVal: string;
    statusVal: string;
    updateBtn = false;

    constructor(private route: ActivatedRoute, private documentService: DocumentService, public dialog: MatDialog,
                private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.toVal = (new Date()).toISOString();
        this.startDateTo = (new Date()).toISOString();
        const now = new Date();
        now.setMonth(now.getMonth() - 1);
        this.startDateFrom = now.toISOString();
        this.fromVal = now.toISOString();

        this.route.params.subscribe((params: Params) => {
            this.companyId = params['cid'];
        });
        this.loadDocuments();
    }

    loadDocuments() {
        let from = moment(this.fromVal).format('MM/DD/YYYY');
        let to = moment(this.toVal).format('MM/DD/YYYY');
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.documentService.getAllDocumentsByCompanyDateRange(params.get('cid'),
                    from, to, this.rfcVal, this.curpVal, this.typeVal, this.statusVal))
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
        for (const d of this.documents) {
            d.CheckedBox = true;
        }
        this.updateBtn = true;
    }
}
