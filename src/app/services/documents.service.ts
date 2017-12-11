//angular imports
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
//rxjs imports
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

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
}