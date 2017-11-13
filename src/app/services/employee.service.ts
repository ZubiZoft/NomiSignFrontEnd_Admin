import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import { EmployeeModel } from '../models/employee.model'
import { User } from '../models/user.model'

import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

//const rootURL: string = 'http://ogrean.com/nomisign/'
 const rootURL: string = environment.serviceUrl;

@Injectable()
export class EmployeeService {
    
    constructor( private http: Http ) {}
   
    //GET/:cid
    getEmployeesByCompany(companyId: string): Observable<any>{
        var _headers = new Headers ({})
        return this.http.get(rootURL + 'api/employees/' + companyId, {headers: _headers}).map(response => response.json());
    }
    //GET/:cid/:eid
    getEmployeeById(companyId: string, employeeId: string): Observable<any>{
        var _headers = new Headers ({})
        return this.http.get(rootURL + 'api/employees/' + companyId + '/' + employeeId, {headers: _headers}).map(response => response.json());
    }
    //PUT
    updateEmployeeDetails(employeeId: string, employee: EmployeeModel): Observable<any>{
        var _headers = new Headers ({'Content-Type': 'application/json'})
        var options = new RequestOptions({method: 'PUT', headers: _headers})
        var body = JSON.stringify(employee);
        var url = rootURL + 'api/employees/' + employeeId 
        return this.http.put(url, body, options).map(response => response.json());
    }
    //POST
    saveNewEmployee(employee: User): Observable<any>{
        var _headers = new Headers ({'Content-Type': 'application/json'})
        var options = new RequestOptions({method: 'POST', headers: _headers})
        var body = JSON.stringify(employee);
        console.log(employee)
        var url = rootURL + 'api/employees/'
        return this.http.post(url, body, options).map(response => response.json());
    }
}