import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import {EmployeeService} from '../../../services/employee.service';
import {EmployeeModel} from '../../../models/employee.model';
import {OpenBatchModel} from '../../../models/openbatch.model';
import {UploadService} from '../../../services/upload.service';
import {CompanyModel} from '../../../models/company.model';
import {CompanyService} from '../../../services/company.service';
import {UserService} from '../../../services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {SessionTimeoutDialogComponent} from '../../session-timeout-dialog/session-timeout-dialog.component';

@Component({
    selector: 'ng-employee-edit',
    templateUrl: './employeeEdit.component.html',
    styleUrls: ['./employeeEdit.component.css'],
    providers: [EmployeeService, CompanyService]
})
export class EmployeeEditComponent implements OnInit {
    employee: EmployeeModel;
    companyId: string;
    employeeID: string;
    allowEmployeeEdit = false;
    cellNumberVerificationStatus: string;
    openbatch: OpenBatchModel;
    company: CompanyModel;
    isPromiseDone = false;
    files: any[];
    phoneValid = true;
    emailValid = true;

    constructor(private route: ActivatedRoute, private employeeService: EmployeeService, public snackbar: MatSnackBar,
                private uploadService: UploadService, public dialog: MatDialog, public userService: UserService, private router: Router,
                private companyService: CompanyService, private _location: Location) {
        route.params.subscribe((params: Params) => {
            this.companyId = params['cid'];
        });
    }

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.employeeService.getEmployeeById(params.get('cid'), params.get('eid')))
            .subscribe(data => {
                this.employee = data;
                if (this.employee.EmailAddress == null || this.employee.EmailAddress == '') {
                    this.allowEmployeeEdit = true;
                }
                if (this.userService.getUserType() != 2) {
                    this.allowEmployeeEdit = true;
                }
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

        // Need ApiKey from Company
        this.route.paramMap
            .switchMap((params: ParamMap) => this.companyService.getCompanyById(params.get('cid')))
            .subscribe(data => {
                this.company = data;
                this.openbatch = new OpenBatchModel();
                this.openbatch.CompanyRfc = this.company.CompanyRFC;
                this.openbatch.ApiKey = this.company.ApiKey;
                this.openbatch.FileCount = 1;
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

    verifyNewEmployeeCellNumber() {
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.employeeService.verifyNewEmployeeCellNumber(this.employee).finally(() => {
                    return false;
                }))
            .subscribe(
                data => {
                    this.cellNumberVerificationStatus = data;
                    this.cellNumberVerificationStatus = 'Válido';
                    return false;
                },
                error => {
                    this.cellNumberVerificationStatus = error;
                    this.cellNumberVerificationStatus = 'Inválido';
                }
            );
    }

    updateEmployee() {
        if (this.allowEmployeeEdit && (this.cellNumberVerificationStatus == 'Success' || this.employee.EmailAddress != '')) {
            if (this.employee.EmployeeStatus === 1) {
                this.employee.EmployeeStatus = 5; // allows for 1 time update of employees created by bulk editor
            }
            this.route.paramMap
                .switchMap((params: ParamMap) => this.employeeService.updateEmployeeDetails(params.get('eid'), this.employee).finally(
                    () => {
                        this.snackbar.open('¡Actualizado Satisfactoriamente!', '', {duration: 5000});
                    }))
                .subscribe(data => {
                    this.employee = data;
                    if (!this.files) {
                        let dialogRef1 = this.dialog.open(EditEmployeeAlertDialog, {
                            width: '50%',
                            data: {
                                'message': '¡La información del empleado ha sido actualizada satisfactoriamente!',
                                'AcceptReject': true
                            }
                        });
                        dialogRef1.afterClosed().subscribe(result => {
                            this._location.back();
                        });
                    }
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
        } else {
            let dialogRef1 = this.dialog.open(EditEmployeeAlertDialog, {
                width: '50%',
                data: {
                    'message': 'Por favor verifique su número celular o correo electrónico.',
                    'AcceptReject': false
                }
            });
        }
    }

    backLocation() {
        this._location.back();
    }

    ValidateEmail() {
        let emp: EmployeeModel = new EmployeeModel();
        emp.EmailAddress = this.employee.EmailAddress;
        emp.RFC = this.employee.RFC;
        this.employeeService.validateEmail(emp).subscribe(
            () => {
            this.emailValid = false;
        }, error => {
            this.emailValid = true;
        });
    }

    ValidatePhone() {
        let emp: EmployeeModel = new EmployeeModel();
        emp.CellPhoneNumber = this.employee.CellPhoneNumber;
        emp.RFC = this.employee.RFC;
        if (emp.CellPhoneNumber.length === 10) {
            this.employeeService.validatePhone(emp).subscribe(
                () => {
                    this.phoneValid = false;
                }, error => {
                    this.phoneValid = true;
                });
        } else {
            this.phoneValid = true;
        }
    }

    ResetAccount() {
        this.isPromiseDone = false;
        this.employeeService.resetEmployee(this.employee.EmployeeId).subscribe(
            () => {
                this.isPromiseDone = true;
                this.snackbar.open('¡Actualizado Satisfactoriamente!', '', {duration: 5000});
            }, error => {
                this.snackbar.open('¡Error reinicindo la cuenta!', '', {duration: 5000});
            });
    }

    moveToNotLongerEmployeed() {
        let dialogRef1 = this.dialog.open(EditEmployeeAlertDialog, {
            width: '50%',
            data: {
                'message': '¿Estás seguro de dar de baja al empleado ' + this.employee.FirstName + ' '
                    + this.employee.LastName1 + ' ' + this.employee.LastName2 + '?',
                'AcceptReject': false,
                'employee': this.employee,
                'parent': this
            }
        });
    }
}

@Component({
    selector: 'edit-employee-alert-dialog',
    templateUrl: 'edit-employee-alert-dialog.html'
})
export class EditEmployeeAlertDialog implements OnInit {

    constructor(public dialogRef: MatDialogRef<EditEmployeeAlertDialog>, @Inject(MAT_DIALOG_DATA) public data: any,
                private snackbar: MatSnackBar, private employeeService: EmployeeService, private dialog: MatDialog,
                private userService: UserService, private route: ActivatedRoute, private router: Router) {
    }

    loginMessage: string;
    hideButtons: boolean;
    employee: EmployeeModel;
    isPromiseDone = true;
    parent: EmployeeEditComponent;

    ngOnInit() {
        this.loginMessage = this.data['message'];
        this.hideButtons = this.data['AcceptReject'];
        this.employee = this.data['employee'];
        this.parent = this.data['parent'];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    changeStatus(): void {
        this.parent.isPromiseDone = false;
        this.isPromiseDone = false;
        this.route.paramMap
            .switchMap((params: ParamMap) => this.employeeService.moveToNotLongerEmployeed(this.employee.EmployeeId.toString(),
                this.employee).finally(
                () => {
                    this.snackbar.open('¡Actualizado Satisfactoriamente!', '', {duration: 5000});
                }))
            .subscribe(data => {
                this.isPromiseDone = true;
                this.parent.isPromiseDone = true;
                this.dialogRef.close();
                this.router.navigate(['/employees', this.userService.getUser().CompanyId, 'new']);
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
}
