import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
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

    constructor(private route: ActivatedRoute, private documentService: DocumentService) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.companyId = params['cid'];
        });

        this.route.paramMap
            .switchMap((params: ParamMap) => this.documentService.getAllDocumentsByCompany(params.get('cid')))
            .subscribe(data => {
                this.documents = data;
                this.isPromiseDone = true;
            });
    }

    sortedBy(event) {
        this.sortAsc = this.sortKey === event ? !this.sortAsc : false;
        this.sortKey = event;
    }

}
