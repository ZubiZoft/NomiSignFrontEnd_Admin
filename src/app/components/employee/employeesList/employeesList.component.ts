//angular imports
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
//rxjs imports
import "rxjs/add/operator/switchMap";
//custom imports
import { EmployeeService } from '../../../services/employee.service'
import { EmployeeModel } from '../../../models/employee.model'
import { States } from '../../../models/states.models'
import {MatDialog} from '@angular/material';
import {UserService} from '../../../services/user.service';
import {SessionTimeoutDialogComponent} from '../../session-timeout-dialog/session-timeout-dialog.component';

@Component({
  selector: 'ng-employees',
  templateUrl: './employeesList.component.html',
  styleUrls: ['./employeesList.component.css'],
  providers: [ EmployeeService ]
})
export class EmployeesListComponent implements OnInit {
  employees: EmployeeModel[];
  companyId: string;
  isPromiseDone: boolean = false;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, public dialog: MatDialog,
              private userService: UserService, private router: Router) {
     route.params.subscribe((params: Params) => {
       this.companyId = params['cid'];
     });
  }

  ngOnInit(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.employeeService.getEmployeesByCompany(params.get('cid')))
    .subscribe(data => {
      this.employees = data
      this.isPromiseDone = true;
    }, error => {
        if (error.status === 405) {
            this.dialog.closeAll();
            let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                width: '75%'
            });
        } else {
            this.userService.clearUser();
            this.router.navigate(['/login']);
        }
    });
  }

  updateEmployee(){
    //  this.route.paramMap
    //  .switchMap((params: ParamMap) => this.employeeService.updateCompanyDetails(params.get('id'), this.company))
    //  .subscribe(data => this.company = data);
  }
}