import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../environments/environment';
import {UserService} from './user.service';
import {CounterEmployeedbystatusModel} from './../models/counter.employeedbystatus.model';
import {CounterReceiptsbystatusModel} from './../models/counter.receiptsbystatus.model';
import {CounterSignaturesstatusModule} from '../models/counter.signaturesstatus.module';
import {CounterDaysstatusModel} from '../models/counter.daysstatus.model';
import {CounterRejectedbyperiodModel} from '../models/counter.rejectedbyperiod.model';

const rootURL: string = environment.serviceUrl;


@Injectable()
export class DashboardsService {

    constructor(private http: Http, private userService: UserService) {
    }

    //GET
    getEmployeesbyStatusCAdmin(): Observable<CounterEmployeedbystatusModel> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        return this.http.get(rootURL + 'api/dashboard/EmployeesByStatus', {headers: _headers}).map(response => response.json());
    }

    //GET
    getReceiptsbyStatusCAdmin(): Observable<CounterReceiptsbystatusModel> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        return this.http.get(rootURL + 'api/dashboard/ReceiptsByStatus', {headers: _headers}).map(response => response.json());
    }

    //GET
    getSignaturesStatusCAdmin(): Observable<CounterSignaturesstatusModule> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        return this.http.get(rootURL + 'api/dashboard/SignaturesStatus', {headers: _headers}).map(response => response.json());
    }

    //GET
    getDaysStatusCAdmin(): Observable<CounterDaysstatusModel> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        return this.http.get(rootURL + 'api/dashboard/DaysLeft', {headers: _headers}).map(response => response.json());
    }

    getReceiptsRejectedByPeriod(): Observable<CounterRejectedbyperiodModel[]> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        return this.http.get(rootURL + 'api/dashboard/RejectedReceiptsByPeriod', {headers: _headers}).map(response => response.json());
    }
}
