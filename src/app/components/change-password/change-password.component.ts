import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormControl, Validators} from '@angular/forms';
import {ChangePasswordModel} from '../../models/ChangePassword.model';
import {CompanyUsersService} from '../../services/companyUser.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {UploadedAlertDialog} from '../company/companyEdit/companyEdit.component';
import {MatDialog} from '@angular/material';
import {SessionTimeoutDialogComponent} from '../session-timeout-dialog/session-timeout-dialog.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    oldHide = true;
    newHide = true;
    confirmHide = true;
    user: User;
    changePassword: ChangePasswordModel = new ChangePasswordModel();
    isPromiseDone = true;
    oldPasswordFormControl = new FormControl('', [Validators.required]);
    passwordFormControl = new FormControl('', [Validators.required]);
    passwordVerifyFormControl = new FormControl('', [Validators.required, Validators.pattern('')]);

    constructor(public companyUserService: CompanyUsersService, public userService: UserService, public dialog: MatDialog,
                private router: Router, private location: Location) {
    }

    ngOnInit() {
        this.user = this.userService.getUser();
    }

    changePwd() {
        this.isPromiseDone = false;
        this.companyUserService.changePasswordService(this.changePassword, this.user.UserId).subscribe(
            () => {
                let dialogRef = this.dialog.open(UploadedAlertDialog, {
                    width: '50%',
                    data: {'message': 'Tu contraseña ha sido actualizada.'}
                });
                this.oldPasswordFormControl.setValue('');
                this.passwordVerifyFormControl.setValue('');
                this.passwordFormControl.setValue('');
                this.isPromiseDone = true;
                this.oldPasswordFormControl.reset();
                this.passwordVerifyFormControl.reset();
                this.passwordFormControl.reset();
            }, error => {
                if (error.status === 405) {
                    this.dialog.closeAll();
                    let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                        width: '75%'
                    });
                } else {
                    let dialogRef = this.dialog.open(UploadedAlertDialog, {
                        width: '50%',
                        data: {'message': 'Tu contraseña actual es incorrecta.'}
                    });
                }
                this.isPromiseDone = true;
            });
    }

}
