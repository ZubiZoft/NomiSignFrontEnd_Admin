import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import {UserService} from './user.service';

@Injectable()
export class SettingsService {
    private rootURL: string = environment.serviceUrl;

    constructor(private http: Http, private userService: UserService) {}

    getSystemSettings(): Observable<any> {
        const _headers = new Headers ({ })
        const options = new RequestOptions({method: 'GET', headers: _headers})
        const url = this.rootURL + 'api/systemsettings';
        return this.http.get(url, options).map(response => response.json());
    }

    updateSystemSettings(settings): Observable<any> {
        const _headers = new Headers ({'Content-Type': 'application/json'})
        const options = new RequestOptions({method: 'PUT', headers: _headers})
        let url = this.rootURL + 'api/systemsettings';
        let body = JSON.stringify(settings)
        return this.http.put(url, settings, options).map(response => response.json());
    }

    clearDemo(): Observable<any> {
        const user = this.userService.getUser();
        const _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        const options = new RequestOptions({method: 'GET', headers: _headers})
        const url = this.rootURL + 'api/cleardemo';
        return this.http.get(url, options).map(response => response.json());
    }

    getCompanyLogo(companyId): Observable<any> {
        const user = this.userService.getUser();
        const _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        const options = new RequestOptions({method: 'GET', headers: _headers})
        const url = this.rootURL + 'api/companies/' + companyId + '/logo';
        return this.http.get(url, options).map(response => response.json());
    }
}
