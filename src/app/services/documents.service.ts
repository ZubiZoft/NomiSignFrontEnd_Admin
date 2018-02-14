//angular imports
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
//rxjs imports
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import {DateRangeModel} from '../models/date.range.model';

const rootURL: string = environment.serviceUrl;

@Injectable()
export class DocumentService {

    constructor(private http: Http) { }

    getRejectedDocumentsForCompany(companyId): Observable<any> {
        let _headers = new Headers({})
        let options = new RequestOptions({ method: 'GET', headers: _headers })
        let url = rootURL + 'api/documents/rejected/' + companyId;

        return this.http.get(url, options).map(response => response.json());
    }

    getUnsignedDocumentsForCompany(companyId): Observable<any> {
        let _headers = new Headers({})
        let options = new RequestOptions({ method: 'GET', headers: _headers })
        let url = rootURL + 'api/documents/unsigned/' + companyId;

        return this.http.get(url, options).map(response => response.json());
    }

    notifyUnsignedDocumentsForCompany(companyId): Observable<any> {
        let _headers = new Headers({})
        let options = new RequestOptions({ method: 'GET', headers: _headers })
        let url = rootURL + 'api/documents/unsigned/notify/' + companyId;

        return this.http.get(url, options).map(response => response.json());
    }

    updateDocument(document): Observable<any> {
        let _headers = new Headers({ 'Content-Type': 'application/json' })
        let options = new RequestOptions({ method: 'PUT', headers: _headers })
        let url = rootURL + 'api/documents/' + document.DocumentId;
        let body = JSON.stringify(document);

        return this.http.put(url, body, options).map(response => response.json());
    }

    getAllDocumentsByCompany(companyId): Observable<any> {
        let _headers = new Headers({})
        let options = new RequestOptions({ method: 'GET', headers: _headers })
        let url = rootURL + 'api/documentsByCompany/' + companyId;

        return this.http.get(url, options).map(response => response.json());
    }

    getAllDocumentsByCompanyDateRange(companyId, fromDate, toDate): Observable<any> {
        let _headers = new Headers({'Content-Type': 'application/json'})
        let options = new RequestOptions({ method: 'POST', headers: _headers })
        let url = rootURL + 'api/documentsByCompanyDateRange/' + companyId;
        let range: DateRangeModel = new DateRangeModel();
        range.InitDate = fromDate;
        range.EndDate = toDate;
        let body = JSON.stringify(range);

        return this.http.post(url, body, options).map(response => response.json());
    }

    sendToUnsignedDocuments(docIds): Observable<any> {
        let _headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ method: 'POST', headers: _headers });
        let url = rootURL + 'api/documents/rejected';
        let body = JSON.stringify(docIds);

        return this.http.put(url, body, options).map(response => response.json());
    }

    notifyUnsignedDocuments(docIds): Observable<any> {
        let _headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ method: 'POST', headers: _headers });
        let url = rootURL + 'api/SendNotificationsToUnsignedDocuments';
        let body = JSON.stringify(docIds);

        return this.http.put(url, body, options).map(response => response.json());
    }
}