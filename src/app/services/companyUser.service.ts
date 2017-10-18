import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import { CompanyUserModel } from '../models/companyUser.model'
import { User } from '../models/user.model'

import 'rxjs/add/operator/map';

const rootURL = "http://ogrean.com/nomisign/";

@Injectable()
export class CompanyUsersService {
    
    constructor( private http: Http ) {}
   
    //GET/:cid
    getCompanyUsersByCompany(companyId: string): Observable<any>{
        var _headers = new Headers ({})
        return this.http.get(rootURL + 'api/companyusers/' + companyId, {headers: _headers}).map(response => response.json());
    }
    //GET/:cid/:eid
    getCompanyUserById(companyId: string, companyUserId: string): Observable<any>{
        var _headers = new Headers ({})
        return this.http.get(rootURL + 'api/companyusers/' + companyId + '/' + companyUserId, {headers: _headers}).map(response => response.json());
    }
    //PUT
    updateCompanyUserDetails(companyUserId: string, companyUser: CompanyUserModel): Observable<any>{
        var _headers = new Headers ({'Content-Type': 'application/json'})
        var options = new RequestOptions({method: 'PUT', headers: _headers})
        var body = JSON.stringify(companyUser);
        var url = rootURL + 'api/companyusers/' + companyUserId 
        return this.http.put(url, body, options).map(response => response.json());
    }
    //POST
    saveNewCompanyUser(companyUser: CompanyUserModel): Observable<any>{
        var _headers = new Headers ({'Content-Type': 'application/json'})
        var options = new RequestOptions({method: 'POST', headers: _headers})
        var body = JSON.stringify(companyUser);
        console.log(companyUser)
        var url = rootURL + 'api/companyusers/4'
        return this.http.post(url, body, options).map(response => response.json());
    }
}