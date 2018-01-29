//angular imports
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
//rxjs imports
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/finally'
//custom imports
import { EmployeeService } from '../../../services/employee.service'
import { UserService } from '../../../services/user.service'
import { EmployeeModel } from '../../../models/employee.model'
//angular material imports
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'ng-employee-new',
  templateUrl: './employeeNew.component.html',
  styleUrls: ['./employeeNew.component.css'],
  providers: [ EmployeeService ]
})
export class EmployeeNewComponent implements OnInit {
    employee: EmployeeModel;
    cellNumberVerificationStatus: string;
  companyId: string;
  employeeID: string;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService,private userService: UserService, public snackbar: MatSnackBar, private _location: Location) { 
      this.employee = new EmployeeModel()
      route.params.subscribe((params: Params) => {
        this.employee.CompanyId = params['cid'];
      })
  }

  ngOnInit(): void {
  } 

  saveEmployee() {
      if (this.cellNumberVerificationStatus == "Success") {
          var loggedInUser = this.userService.getUser();
          this.employee.CreatedByUserId = loggedInUser.UserId;
          console.log("save employee")
          this.route.paramMap
              .switchMap((params: ParamMap) =>
                  this.employeeService.saveNewEmployee(this.employee).finally(() =>
                  { this.snackbar.open("Updated successfully", "", { duration: 5000 }); }))
              .subscribe(data => { this.employee = data; this._location.back(); },
              error => this.snackbar.open(error, "", { duration: 5000 }));
      }
      else {
          alert("Cell Phone has not been verified");
      }
  }

  verifyNewEmployeeCellNumber() {
      
      console.log("verify employee cell")
      this.route.paramMap
          .switchMap((params: ParamMap) =>
              this.employeeService.verifyNewEmployeeCellNumber(this.employee).finally(() =>
              { return false; }))
          .subscribe(data => { this.cellNumberVerificationStatus = data; return false;},
          error => this.cellNumberVerificationStatus = error
      );
      
  }
}