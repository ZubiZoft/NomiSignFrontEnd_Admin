import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {CompanyUserModel} from '../models/companyUser.model';
import {User} from '../models/user.model';

import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {UserService} from './user.service';

//const rootURL: string = 'http://ogrean.com/nomisign/'
const rootURL: string = environment.serviceUrl;

@Injectable()
export class CompanyUsersService {

    constructor(private http: Http, private userService: UserService) {
    }

    //GET/:cid
    getCompanyUsersByCompany(companyId: string, userTypeId: string): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        return this.http.get(rootURL + 'api/companyusers/' + companyId + '/' + userTypeId, {headers: _headers}).map(response => response.json());
    }

    //GET/:cid/:eid
    getCompanyUserById(companyId: string, companyUserId: string): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        return this.http.get(rootURL + 'api/companyuser/' + companyId + '/' + companyUserId, {headers: _headers}).map(response => response.json());
    }

    //PUT
    updateCompanyUserDetails(companyUserId: string, companyUser: CompanyUserModel): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        var options = new RequestOptions({method: 'PUT', headers: _headers});
        var body = JSON.stringify(companyUser);
        var url = rootURL + 'api/companyusers/' + companyUserId;
        return this.http.put(url, body, options).map(response => response.json());
    }

    //POST
    saveNewCompanyUser(companyUser: CompanyUserModel): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        var options = new RequestOptions({method: 'POST', headers: _headers});
        var body = JSON.stringify(companyUser);
        console.log(companyUser);
        var url = rootURL + 'api/companyusers';
        return this.http.post(url, body, options).map(response => response.json());
    }
}