import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Headers, RequestOptions} from '@angular/http';

@Injectable()
export class StorageFeeService {

  constructor() { }

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
