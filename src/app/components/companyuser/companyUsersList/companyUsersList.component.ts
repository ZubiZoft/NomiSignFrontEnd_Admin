//angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
//rxjs imports
import "rxjs/add/operator/switchMap";
//custom imports
import { CompanyUsersService } from '../../../services/companyUser.service'
import { UserService } from '../../../services/user.service'
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
  companyUsers: any[];
  isPromiseDone = false;

  constructor(private route: ActivatedRoute, private employeeService: CompanyUsersService, private userService: UserService) {
     route.params.subscribe((params: Params) => {
       this.companyId = params['cid'];
     });
  }

  ngOnInit(): void {
    let user = this.userService.getUser();

    this.route.paramMap
    .switchMap((params: ParamMap) => this.employeeService.getCompanyUsersByCompany(params.get('cid'), user.UserType))
    .subscribe(data => {
      this.companyUsers = data
      this.isPromiseDone = true;
    });
  }

  updateEmployee(){
    //  this.route.paramMap
    //  .switchMap((params: ParamMap) => this.employeeService.updateCompanyDetails(params.get('id'), this.company))
    //  .subscribe(data => this.company = data);
  }
}