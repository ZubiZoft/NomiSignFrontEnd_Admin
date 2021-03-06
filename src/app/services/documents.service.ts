﻿import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { DateRangeModel } from '../models/date.range.model';
import { UserService } from './user.service';

const rootURL: string = environment.serviceUrl;

@Injectable()
export class DocumentService {

    constructor(private http: Http, private userService: UserService) { }

    getRejectedDocumentsForCompany(companyId): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({ method: 'GET', headers: _headers })
        let url = rootURL + 'api/documents/rejected/' + companyId;

        return this.http.get(url, options).map(response => response.json());
    }

    getUnsignedDocumentsForCompany(companyId): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({ method: 'GET', headers: _headers })
        let url = rootURL + 'api/documents/unsigned/' + companyId;

        return this.http.get(url, options).map(response => response.json());
    }

    notifyUnsignedDocumentsForCompany(companyId): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({ method: 'GET', headers: _headers })
        let url = rootURL + 'api/documents/unsigned/notify/' + companyId;

        return this.http.get(url, options).map(response => response.json());
    }

    updateDocument(document): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({ method: 'PUT', headers: _headers })
        let url = rootURL + 'api/documents/' + document.DocumentId;
        let body = JSON.stringify(document);

        return this.http.put(url, body, options).map(response => response.json());
    }

    getAllDocumentsByCompany(companyId): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({ method: 'GET', headers: _headers })
        let url = rootURL + 'api/documentsByCompany/' + companyId;

        return this.http.get(url, options).map(response => response.json());
    }

    getAllDocumentsByCompanyDateRange(companyId, fromDate, toDate, rfc, curp, type, status): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({ method: 'POST', headers: _headers })
        let url = rootURL + 'api/documentsByCompanyDateRange/' + companyId;
        let range: DateRangeModel = new DateRangeModel();
        range.InitDate = fromDate;
        range.EndDate = toDate;
        range.Type = type;
        range.Status = status;
        range.Rfc = rfc;
        range.Curp = curp;
        let body = JSON.stringify(range);

        return this.http.post(url, body, options).map(response => response.json());
    }

    globalSearch(companyId, fromDate, toDate, rfcEmp, curpEmp, rfcComp, rfcClient, uuid, status): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({ method: 'POST', headers: _headers });
        let url = '';
        if (companyId != null)
            url = rootURL + 'api/documentsByCompanyDateRange/' + companyId;
        else
            url = rootURL + 'api/documentsByCompanyDateRange';
        let range: DateRangeModel = new DateRangeModel();
        range.InitDate = fromDate;
        range.EndDate = toDate;
        range.Status = status;
        range.Rfc = rfcEmp;
        range.Curp = curpEmp;
        range.RFCCompany = rfcComp;
        range.RFCLabora = rfcClient;
        range.UUID = uuid;
        let body = JSON.stringify(range);

        return this.http.post(url, body, options).map(response => response.json());
    }

    sendToUnsignedDocuments(docIds): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({ method: 'POST', headers: _headers });
        let url = rootURL + 'api/documents/rejected';
        let body = JSON.stringify(docIds);

        return this.http.put(url, body, options).map(response => response.json());
    }

    notifyUnsignedDocuments(docIds): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({ method: 'POST', headers: _headers });
        let url = rootURL + 'api/SendNotificationsToUnsignedDocuments';
        let body = JSON.stringify(docIds);

        return this.http.post(url, body, options).map(response => response.json());
    }

    downloadDocuments(docIds): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({ method: 'POST', headers: _headers });
        let url = rootURL + 'api/documents/download/';
        let body = JSON.stringify(docIds);

        return this.http.post(url, body, options).map(response => response.json());
    }

    getUserDocumentData(documentId): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'GET', headers: _headers});
        let url = rootURL + 'api/documentsEmployee/' + documentId;

        return this.http.get(url, options).map(response => response.json());
    }
}
