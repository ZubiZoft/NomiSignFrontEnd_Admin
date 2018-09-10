import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {EmployeeModel} from '../models/employee.model';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {UserService} from './user.service';
import {EmployeeSearch} from '../models/employee.search';

const rootURL: string = environment.serviceUrl;

@Injectable()
export class EmployeeService {
    constructor(private http: Http, private userService: UserService) {
    }

    //GET/:cid
    getEmployeesByCompany(companyId: string): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        return this.http.get(rootURL + 'api/employees/' + companyId, {headers: _headers}).map(response => response.json());
    }

    resetEmployee(employeeId: number): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        return this.http.delete(rootURL + 'api/resetemployee/' + employeeId,
            {headers: _headers}).map(response => response.json());
    }

    //GET/:cid/:eid
    getEmployeeById(companyId: string, employeeId: string): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        return this.http.get(rootURL + 'api/employees/' + companyId + '/' + employeeId,
            {headers: _headers}).map(response => response.json());
    }

    //PUT
    updateEmployeeDetails(employeeId: string, employee: EmployeeModel): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'PUT', headers: _headers});
        let body = JSON.stringify(employee);
        let url = rootURL + 'api/employees/' + employeeId;
        return this.http.put(url, body, options).map(response => response.json());
    }

    //POST
    saveNewEmployee(employee: EmployeeModel): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'POST', headers: _headers});
        let body = JSON.stringify(employee);
        let e: EmployeeModel = JSON.parse(body);
        e.CellPhoneNumber = e.CellPhoneNumber;
        body = JSON.stringify(e);
        let url = rootURL + 'api/employees/';
        return this.http.post(url, body, options).map(response => response.json());
    }

    verifyNewEmployeeCellNumber(employee: EmployeeModel): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'POST', headers: _headers});
        let e: EmployeeModel = new EmployeeModel();
        e.EmployeeId = employee.EmployeeId;
        e.CellPhoneNumber = employee.CellPhoneNumber;
        let body = JSON.stringify(e);
        let url = rootURL + 'api/employee/verifycell';
        return this.http.post(url, body, options).map(response => response.json());
    }

    getNewEmployeesByCompany(companyId: string, letter: string): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        if (letter === 'Todos') {
            letter = '';
        }
        return this.http.get(rootURL + 'api/employees/' + companyId + '/newstatus/' + letter,
            {headers: _headers}).map(response => response.json());
    }

    validateEmail(employee: EmployeeModel): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'POST', headers: _headers});
        let body = JSON.stringify(employee);
        let url = rootURL + 'api/emailEmployeeValidator';
        return this.http.post(url, body, options).map(response => response.json());
    }

    validatePhone(employee: EmployeeModel): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'POST', headers: _headers});
        let body = JSON.stringify(employee);
        let url = rootURL + 'api/phoneEmployeeValidator';
        return this.http.post(url, body, options).map(response => response.json());
    }

    getInactiveEmployeesByCompany(companyId: string, letter: string): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        if (letter === 'Todos') {
            letter = '';
        }
        return this.http.get(rootURL + 'api/employees/' + companyId + '/inactiveStatus/' + letter,
            {headers: _headers}).map(response => response.json());
    }

    getUnregisteredEmployeesByCompany(companyId: string, letter: string): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        if (letter === 'Todos') {
            letter = '';
        }
        return this.http.get(rootURL + 'api/employees/' + companyId + '/unregistered/' + letter,
            {headers: _headers}).map(response => response.json());
    }

    getRegisteredEmployeesByCompany(companyId: string, letter: string): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        if (letter === 'Todos') {
            letter = '';
        }
        return this.http.get(rootURL + 'api/employees/' + companyId + '/registered/' + letter,
            {headers: _headers}).map(response => response.json());
    }

    advanceSearch(companyId: string, search: EmployeeSearch): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'POST', headers: _headers});
        let body = JSON.stringify(search);
        let url = rootURL + 'api/employees/' + companyId + '/advancesearch';
        return this.http.post(url, body, options).map(response => response.json());
    }

    resetAccounts(ids: number[]) {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'POST', headers: _headers});
        let body = JSON.stringify(ids);
        let url = rootURL + 'api/resetemployee';
        return this.http.post(url, body, options).map(response => response.json());
    }

    moveToNotLongerEmployeed(employeeId: string, employee: EmployeeModel): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'PUT', headers: _headers});
        let body = JSON.stringify(employee);
        let url = rootURL + 'api/employees/NotLongerEmployeed/' + employeeId;
        return this.http.put(url, body, options).map(response => response.json());
    }
}
