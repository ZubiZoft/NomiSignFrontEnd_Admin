//angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
//rxjs imports
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/finally'
//custom imports
import { EmployeeService } from '../../../services/employee.service'
import { User } from '../../../models/user.model'
//angular material imports
import { MdSnackBar } from '@angular/material'

@Component({
  selector: 'ng-employee-new',
  templateUrl: './employeeNew.component.html',
  styleUrls: ['./employeeNew.component.css'],
  providers: [ EmployeeService ]
})
export class EmployeeNewComponent implements OnInit {
  employee: User;
  companyId: string;
  employeeID: string;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, public snackbar: MdSnackBar) { 
      this.employee = new User()
      route.params.subscribe((params: Params) => {
        this.employee.CompanyId = params['cid'];
      })
  }

  ngOnInit(): void {
  }

  saveEmployee(){
    this.employee.CreatedByUserId = 2 //TODO FIX THIS HARDCODE
    console.log("save employee")
     this.route.paramMap
     .switchMap((params: ParamMap) => this.employeeService.saveNewEmployee(this.employee).finally(()=> this.snackbar.open("Updated successfully", "", {duration: 5000}) ))
     .subscribe(data => this.employee = data,
                 error => this.snackbar.open(error, "",{duration: 5000}))
  }
}