import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DocumentService} from '../../services/documents.service';
import {DocumentModel} from '../../models/document.model';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {SessionTimeoutDialogComponent} from '../session-timeout-dialog/session-timeout-dialog.component';
import * as moment from 'moment';

@Component({
    selector: 'app-global-search',
    templateUrl: './global-search.component.html',
    styleUrls: ['./global-search.component.css'],
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
export class GlobalSearchComponent implements OnInit {

    companyId: string;
    documents: DocumentModel[];
    isPromiseDone = false;
    sortAsc: boolean;
    sortKey: string;
    startDateFrom: string;
    startDateTo: string;
    fromVal: string;
    toVal: string;
    rfcEmployeeVal: string;
    rfcCompanyVal: string;
    rfcClientVal: string;
    curpVal: string;
    uuid: string;
    statusVal: string;
    updateBtn = false;

    constructor(private route: ActivatedRoute, private documentService: DocumentService, public dialog: MatDialog,
                private userService: UserService, private router: Router) {
    }

    ngOnInit() {
    }

    loadDocuments() {
        let from = null;
        let to = null;
        if (this.fromVal != null) {
            console.log(this.fromVal);
            from = moment(this.fromVal).format('MM/DD/YYYY');
        }
        if (this.toVal != null) {
            console.log(this.toVal);
            to = moment(this.toVal).format('MM/DD/YYYY');
        }
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.documentService.globalSearch(null,
                    from, to, this.rfcEmployeeVal, this.curpVal, this.rfcCompanyVal, this.rfcClientVal,
                    this.uuid, this.statusVal))
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
}
