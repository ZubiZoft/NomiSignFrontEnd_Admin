import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {DocumentService} from '../../../../services/documents.service';
import {DocumentModel} from '../../../../models/document.model';

@Component({
    selector: 'app-search-receipts',
    templateUrl: './search-receipts.component.html',
    styleUrls: ['./search-receipts.component.css']
})
export class SearchReceiptsComponent implements OnInit {

    companyId: string;
    documents: DocumentModel[];
    isPromiseDone = false;
    sortAsc: boolean;
    sortKey: string;
    startDateFrom: Date;
    startDateTo: Date;
    fromVal: Date;
    toVal: Date;
    updateBtn = false;

    constructor(private route: ActivatedRoute, private documentService: DocumentService) {
    }

    ngOnInit() {
        this.toVal = new Date();
        this.startDateTo = new Date();
        const now = new Date();
        now.setMonth(now.getMonth() - 1);
        this.startDateFrom = now;
        this.fromVal = now;

        this.route.params.subscribe((params: Params) => {
            this.companyId = params['cid'];
        });
        this.loadDocuments();
    }

    loadDocuments() {
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.documentService.getAllDocumentsByCompanyDateRange(params.get('cid'),
                    this.fromVal.toLocaleDateString('en-US'),
                    this.toVal.toLocaleDateString('en-US')))
            .subscribe(data => {
                this.documents = data;
                this.isPromiseDone = true;
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
}
