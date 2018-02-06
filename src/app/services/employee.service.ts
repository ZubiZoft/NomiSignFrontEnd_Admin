import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { EmployeeModel } from '../models/employee.model';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

const rootURL: string = environment.serviceUrl;

@Injectable()
export class EmployeeService {
    constructor( private http: Http ) {}

    //GET/:cid
    getEmployeesByCompany(companyId: string): Observable<any>{
        let _headers = new Headers ({});
        return this.http.get(rootURL + 'api/employees/' + companyId, {headers: _headers}).map(response => response.json());
    }
    //GET/:cid/:eid
    getEmployeeById(companyId: string, employeeId: string): Observable<any>{
        let _headers = new Headers ({});
        return this.http.get(rootURL + 'api/employees/' + companyId + '/' + employeeId,
            {headers: _headers}).map(response => response.json());
    }
    //PUT
    updateEmployeeDetails(employeeId: string, employee: EmployeeModel): Observable<any>{
        let _headers = new Headers ({'Content-Type': 'application/json'});
        let options = new RequestOptions({method: 'PUT', headers: _headers});
        let body = JSON.stringify(employee);
        let url = rootURL + 'api/employees/' + employeeId;
        return this.http.put(url, body, options).map(response => response.json());
    }
    //POST
    saveNewEmployee(employee: EmployeeModel): Observable<any> {
        let _headers = new Headers ({'Content-Type': 'application/json'});
        let options = new RequestOptions({method: 'POST', headers: _headers});
        let body = JSON.stringify(employee);
        console.log(employee);
        let url = rootURL + 'api/employees/';
        return this.http.post(url, body, options).map(response => response.json());
    }

    verifyNewEmployeeCellNumber(employee: EmployeeModel): Observable<any> {
        let _headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ method: 'POST', headers: _headers });
        let body = JSON.stringify(employee);
        let url = rootURL + 'api/employee/verifycell';
        return this.http.post(url, body, options).map(response => response.json());
    }

    getNewEmployeesByCompany(companyId: string): Observable<any> {
        let _headers = new Headers ({});
        return this.http.get(rootURL + 'api/employees/' + companyId + '/New',
            {headers: _headers}).map(response => response.json());
    }

    getInactiveEmployeesByCompany(companyId: string): Observable<any> {
        let _headers = new Headers ({});
        return this.http.get(rootURL + 'api/employees/' + companyId + '/inactive',
            {headers: _headers}).map(response => response.json());
    }
}