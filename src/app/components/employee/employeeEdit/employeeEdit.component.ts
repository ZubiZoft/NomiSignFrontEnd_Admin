//angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
//rxjs imports
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/finally'
//custom imports
import { EmployeeService } from '../../../services/employee.service'
import { EmployeeModel } from '../../../models/employee.model'
//angular material imports
import { MdSnackBar } from '@angular/material'

@Component({
  selector: 'ng-employee-edit',
  templateUrl: './employeeEdit.component.html',
  styleUrls: ['./employeeEdit.component.css'],
  providers: [ EmployeeService ]
})
export class EmployeeEditComponent implements OnInit {
  employee: EmployeeModel;
  companyId: string;
  employeeID: string;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, public snackbar: MdSnackBar) { 
      
  }

  ngOnInit(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.employeeService.getEmployeeById(params.get('cid'), params.get('eid')))
    .subscribe(data => this.employee = data);
  }

  updateEmployee(){
    console.log("updating employee")
     this.route.paramMap
     .switchMap((params: ParamMap) => this.employeeService.updateEmployeeDetails(params.get('eid'), this.employee).finally(() => this.snackbar.open("sucessfully updated", "",{duration: 5000}) ))
     .subscribe(data => this.employee = data,
                error => this.snackbar.open(error, "",{duration: 5000}))
  }
}