//angular imports
import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
//rxjs imports
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
//custom imports
import {EmployeeService} from '../../../services/employee.service';
import {UserService} from '../../../services/user.service';
import {EmployeeModel} from '../../../models/employee.model';
//angular material imports
import {MatDialog, MatSnackBar} from '@angular/material';
import {SessionTimeoutDialogComponent} from '../../session-timeout-dialog/session-timeout-dialog.component';

@Component({
    selector: 'ng-employee-new',
    templateUrl: './employeeNew.component.html',
    styleUrls: ['./employeeNew.component.css'],
    providers: [EmployeeService]
})
export class EmployeeNewComponent implements OnInit {
    employee: EmployeeModel;
    cellNumberVerificationStatus: string;
    companyId: string;
    employeeID: string;

    constructor(private route: ActivatedRoute, private employeeService: EmployeeService, public dialog: MatDialog,
                private userService: UserService, private router: Router, public snackbar: MatSnackBar, private _location: Location) {
        this.employee = new EmployeeModel();
        route.params.subscribe((params: Params) => {
            this.employee.CompanyId = params['cid'];
        });
    }

    ngOnInit(): void {
    }

    saveEmployee() {
        if ((this.employee.EmailAddress != '' && this.employee.CellPhoneNumber == '') || (this.cellNumberVerificationStatus == 'Success')) {
            var loggedInUser = this.userService.getUser();
            this.employee.CreatedByUserId = loggedInUser.UserId;
            this.route.paramMap
                .switchMap((params: ParamMap) =>
                    this.employeeService.saveNewEmployee(this.employee).finally(() => {
                        this.snackbar.open('Cargados Exitosamente', '', {duration: 5000});
                    }))
                .subscribe(data => {
                    this.employee = data;
                    this._location.back();
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
        else {
            alert('Cell Phone has not been verified');
        }
    }

    verifyNewEmployeeCellNumber() {
        console.log('verify employee cell');
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.employeeService.verifyNewEmployeeCellNumber(this.employee).finally(() => {
                    return false;
                }))
            .subscribe(data => {
                    this.cellNumberVerificationStatus = data;
                    return false;
                }, error => {
                    if (error.status === 405) {
                        this.dialog.closeAll();
                        let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                            width: '75%'
                        });
                    } else {
                        this.cellNumberVerificationStatus = error;
                    }
                }
            );
    }
}
