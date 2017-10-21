//angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
//rxjs imports
import "rxjs/add/operator/switchMap";
//custom imports
import { EmployeeService } from '../../../services/employee.service'
import { EmployeeModel } from '../../../models/employee.model'
import { States } from '../../../models/states.models'

@Component({
  selector: 'ng-employees',
  templateUrl: './employeesList.component.html',
  styleUrls: ['./employeesList.component.css'],
  providers: [ EmployeeService ]
})
export class EmployeesListComponent implements OnInit {
  employees: EmployeeModel[];
  companyId: string;
 // states : States

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) { 
     route.params.subscribe((params: Params) => {
       this.companyId = params['cid'];
     })
  }

  ngOnInit(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.employeeService.getEmployeesByCompany(params.get('cid')))
    .subscribe(data => this.employees = data);
  }

  updateEmployee(){
    //  this.route.paramMap
    //  .switchMap((params: ParamMap) => this.employeeService.updateCompanyDetails(params.get('id'), this.company))
    //  .subscribe(data => this.company = data);
  }
}