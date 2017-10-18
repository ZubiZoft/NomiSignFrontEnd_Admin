import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import { CompanyModel } from '../models/company.model'

import 'rxjs/add/operator/map';

const rootURL = "http://ogrean.com/nomisign/";

@Injectable()
export class CompanyService {
    
    constructor( private http: Http ) {}
    //GET
    getCompanies(): Observable<CompanyModel[]>{
        var _headers = new Headers ({})
        return this.http.get(rootURL + 'api/companies', {headers: _headers}).map(response => response.json());
    }
    //GET/:id
    getCompanyById(companyId: string): Observable<CompanyModel>{
        var _headers = new Headers ({})
        return this.http.get(rootURL + 'api/companies/' + companyId, {headers: _headers}).map(response => response.json());
    }
    //PUT
    updateCompanyDetails(companyId: string, companyDetails: CompanyModel): Observable<CompanyModel>{
        var _headers = new Headers ({'Content-Type': 'application/json'})
        var options = new RequestOptions({method: 'PUT', headers: _headers})
        var body = JSON.stringify(companyDetails);
        var url = rootURL + 'api/companies/' + companyId
        return this.http.put(url, body, options).map(response => response.json());
    }
    //POST
    saveNewCompany(companyDetails : CompanyModel) : Observable<CompanyModel>{
         var _headers = new Headers({ 'Content-Type': 'application/json' })
         var options = new RequestOptions({method: 'POST', headers: _headers})
         var body = JSON.stringify(companyDetails);
         console.log(companyDetails)
         let url = rootURL + "api/companies";
        return this.http.post(url, body, options).map(response => response.json());
    }    
}