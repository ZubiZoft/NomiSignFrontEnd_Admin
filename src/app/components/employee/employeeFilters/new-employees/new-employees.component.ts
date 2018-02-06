import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { EmployeeService } from '../../../../services/employee.service';
import { EmployeeModel } from '../../../../models/employee.model';
import 'rxjs/add/operator/switchMap';
import { SortByPipe } from '../../../../pipes/sort-by.pipe';


@Component({
  selector: 'app-new-employees',
  templateUrl: './new-employees.component.html',
  styleUrls: ['./new-employees.component.css']
})
export class NewEmployeesComponent implements OnInit {

    companyId: string;
    employees: EmployeeModel[];
    isPromiseDone = false;
    sortAsc: boolean;
    sortKey: string;

    constructor(private employeeService: EmployeeService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.companyId = params['cid'];
        });

        this.route.paramMap
            .switchMap((params: ParamMap) => this.employeeService.getNewEmployeesByCompany(params.get('cid')))
            .subscribe(data => {
                this.employees = data;
                this.isPromiseDone = true;
            });
    }

    sortedBy(event) {
        this.sortAsc = this.sortKey === event ? !this.sortAsc : false;
        this.sortKey = event;
    }
}