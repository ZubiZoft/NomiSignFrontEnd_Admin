import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ResetAccountModel} from '../models/reset.account.model';
import {environment} from '../../environments/environment';

const rootURL: string = environment.serviceUrl;

@Injectable()
export class AuthService {

    constructor(private http: Http) {
    }

    loginUser(user): Observable<any> {
        const _headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({method: 'POST', headers: _headers});
        const url = rootURL + 'api/adminlogin';
        const body = JSON.stringify(user);
        return this.http.post(url, body, options).map(response => response.json());
    }

    sendPasswordReset(user: ResetAccountModel): Observable<any> {
        const _headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({method: 'POST', headers: _headers});
        const url = rootURL + 'api/adminlogin/reset';
        const body = JSON.stringify(user);
        return this.http.post(url, body, options).map(response => response.json());
    }

    isAvailableorReset(userId: number) {
        const _headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({method: 'GET', headers: _headers});
        const url = rootURL + 'api/companyuser/isresetable/' + userId;
        return this.http.get(url, options).map(response => response.json());
    }
}
