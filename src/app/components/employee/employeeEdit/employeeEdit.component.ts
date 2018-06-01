import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import {EmployeeService} from '../../../services/employee.service';
import {EmployeeModel} from '../../../models/employee.model';
import {OpenBatchModel} from '../../../models/openbatch.model';
import {UploadService} from '../../../services/upload.service';
import {FileModel} from '../../../models/file.model';
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
                private uploadService: UploadService, public dialog: MatDialog, private userService: UserService, private router: Router,
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
                if (this.employee.EmployeeStatus == 1) {
                    this.allowEmployeeEdit = true;
                } else if (this.employee.CellPhoneNumber == null || this.employee.CellPhoneNumber == '') {
                    this.allowEmployeeEdit = true;
                } else if (this.employee.EmailAddress == null || this.employee.EmailAddress == '') {
                    this.allowEmployeeEdit = true;
                }
                if (!(this.employee.CellPhoneNumber == null || this.employee.CellPhoneNumber == '')) {
                    this.employee.CellPhoneNumber = this.employee.CellPhoneNumber.substring(0, 3);
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

    updateEmployeeFiles() {
        if (this.files && this.files.length > 0) {
            this.uploadEmployeeFiles();
        } else {
            let dialogRef = this.dialog.open(EditEmployeeAlertDialog, {
                width: '50%',
                data: {'message': 'Por favor selecione un archivo.'}
            });
        }
    }

    updateEmployee() {
        if (this.allowEmployeeEdit && (this.cellNumberVerificationStatus == 'Success' || this.employee.EmailAddress != '')) {
            this.employee.EmployeeStatus = 5; // allows for 1 time update of employees created by bulk editor
            this.route.paramMap
                .switchMap((params: ParamMap) => this.employeeService.updateEmployeeDetails(params.get('eid'), this.employee).finally(
                    () => {
                        this.snackbar.open('sucessfully updated', '', {duration: 5000});
                    }))
                .subscribe(data => {
                    this.employee = data;
                    if (!this.files) {
                        let dialogRef1 = this.dialog.open(EditEmployeeAlertDialog, {
                            width: '50%',
                            data: {'message': '¡La información del empleado ha sido actualizada satisfactoriamente!'}
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

            if (this.files && this.files.length > 0) {
                this.uploadEmployeeFiles();
            }
        } else {
            let dialogRef1 = this.dialog.open(EditEmployeeAlertDialog, {
                width: '50%',
                data: {'message': 'Por favor verifique su número celular o correo electrónico.'}
            });
        }
    }

    uploadEmployeeFiles() {
        this.companyService.getCompanyById(this.employee.CompanyId).subscribe(data => {
            this.uploadService.openBatch(this.companyId, this.openbatch).subscribe(
                data => {
                    let batchId = data.BatchId;
                    for (let file of this.files) {
                        this.uploadFile(file, batchId);
                    }
                    this.uploadService.closeBatch(batchId).subscribe(
                        data => {
                            let dialogRef1 = this.dialog.open(EditEmployeeAlertDialog, {
                                width: '50%',
                                data: {'message': '¡La información del empleado ha sido actualizada satisfactoriamente!'}
                            });
                            dialogRef1.afterClosed().subscribe(result => {
                                this._location.back();
                            });
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
        });
    }

    backLocation() {
        this._location.back();
    }

    onFileSelect(event) {
        this.files = event;
    }

    uploadFile(file, batchId): any {
        let uploadFile = new FileModel();
        uploadFile.EmployeeCURP = this.employee.CURP;
        uploadFile.FileName = file.name;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            uploadFile.PDFContent = reader.result.split(',')[1];
            this.uploadService.addFile(uploadFile, batchId).subscribe(data => data);
        };
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
        this.employeeService.validatePhone(emp).subscribe(
            () => {
                this.phoneValid = false;
            }, error => {
                this.phoneValid = true;
            });
    }
}

@Component({
    selector: 'edit-employee-alert-dialog',
    templateUrl: 'edit-employee-alert-dialog.html'
})
export class EditEmployeeAlertDialog implements OnInit {

    constructor(public dialogRef: MatDialogRef<EditEmployeeAlertDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    loginMessage: string;

    ngOnInit() {
        this.loginMessage = this.data['message'];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
