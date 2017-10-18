//angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
//rxjs imports
import "rxjs/add/operator/switchMap";
//custom imports
import { CompanyUsersService } from '../../../services/companyUser.service'
import { EmployeeModel } from '../../../models/employee.model'
import { States } from '../../../models/states.models'

@Component({
  selector: 'ng-company-users-list',
  templateUrl: './companyUsersList.component.html',
  styleUrls: ['./companyUsersList.component.css'],
  providers: [ CompanyUsersService ]
})
export class CompanyUsersListComponent implements OnInit {
  companyId: string;
  companyUsers: any[]
 // states : States

  constructor(private route: ActivatedRoute, private employeeService: CompanyUsersService) { 
     route.params.subscribe((params: Params) => {
       this.companyId = params['cid'];
     })
  }

  ngOnInit(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.employeeService.getCompanyUsersByCompany(params.get('cid')))
    .subscribe(data => this.companyUsers = data);
  }

  updateEmployee(){
    //  this.route.paramMap
    //  .switchMap((params: ParamMap) => this.employeeService.updateCompanyDetails(params.get('id'), this.company))
    //  .subscribe(data => this.company = data);
  }
}