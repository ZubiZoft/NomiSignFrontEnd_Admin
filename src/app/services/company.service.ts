import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {CompanyModel} from '../models/company.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../environments/environment';
import {UserService} from './user.service';

const rootURL: string = environment.serviceUrl;


@Injectable()
export class CompanyService {

    constructor(private http: Http, private userService: UserService) {
    }

    //GET
    getCompanies(): Observable<CompanyModel[]> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        return this.http.get(rootURL + 'api/companies', {headers: _headers}).map(response => response.json());
    }

    //GET/:id
    getCompanyById(companyId: string): Observable<CompanyModel> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        return this.http.get(rootURL + 'api/companies/' + companyId, {headers: _headers}).map(response => response.json());
    }

    //PUT
    updateCompanyDetails(companyId: string, companyDetails: CompanyModel): Observable<CompanyModel> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        var options = new RequestOptions({method: 'PUT', headers: _headers});
        var body = JSON.stringify(companyDetails);
        var url = rootURL + 'api/companies/' + companyId;
        return this.http.put(url, body, options).map(response => response.json());
    }

    //POST
    saveNewCompany(companyDetails: CompanyModel): Observable<CompanyModel> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        var options = new RequestOptions({method: 'POST', headers: _headers});
        var body = JSON.stringify(companyDetails);
        let url = rootURL + 'api/companies';
        return this.http.post(url, body, options).map(response => response.json());
    }

    getPurchaseSignature(companyId: number) {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        return this.http.get(rootURL + 'api/signaturepurchases/' + companyId, {headers: _headers}).map(response => response.json());
    }

    getCompanyLogo(companyId: number): Observable<CompanyModel> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        return this.http.get(rootURL + 'api/companies/' + companyId + '/logo', {headers: _headers}).map(response => response.json());
    }
}
