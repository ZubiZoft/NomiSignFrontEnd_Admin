//angular imports
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
//rxjs imports
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import {UserService} from './user.service';

@Injectable()
export class SettingsService {
    private rootURL: string = environment.serviceUrl;

    constructor(private http: Http, private userService: UserService) {}
    //GET
    getSystemSettings(): Observable<any> {
        let _headers = new Headers ({ })
        let options = new RequestOptions({method: 'GET', headers: _headers})
        let url = this.rootURL + 'api/systemsettings';

        return this.http.get(url, options).map(response => response.json());
    }

    //PUT
    updateSystemSettings(settings): Observable<any>{
        var _headers = new Headers ({'Content-Type': 'application/json'})
        var options = new RequestOptions({method: 'PUT', headers: _headers})
        let url = this.rootURL + 'api/systemsettings';
        let body = JSON.stringify(settings)
        return this.http.put(url, settings, options).map(response => response.json());
    }

    clearDemo(): Observable<any>{
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        var options = new RequestOptions({method: 'GET', headers: _headers})
        let url = this.rootURL + 'api/cleardemo';
        return this.http.get(url, options).map(response => response.json());
    }
}