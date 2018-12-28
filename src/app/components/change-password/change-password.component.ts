import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ChangePasswordModel} from '../../models/ChangePassword.model';
import {CompanyUsersService} from '../../services/companyUser.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {UploadedAlertDialog} from '../company/companyEdit/companyEdit.component';
import {MatDialog} from '@angular/material';
import {SessionTimeoutDialogComponent} from '../session-timeout-dialog/session-timeout-dialog.component';
import {Router} from '@angular/router';
import {PasswordValidation} from '../account/account.component';

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
    form: FormGroup;

    constructor(public companyUserService: CompanyUsersService, public userService: UserService, public dialog: MatDialog,
                private router: Router, private location: Location, private formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            'oldPassword': [null, Validators.compose([Validators.minLength(3), Validators.required])],
            'password': [null, Validators.compose([Validators.required,
                Validators.pattern('^(?!(.{0,5}|[^0-9]*|[^A-Z]*|[^a-z]*)$).*$')])],
            'verifyPassword': [null, Validators.compose([Validators.required,
                Validators.pattern('^(?!(.{0,5}|[^0-9]*|[^A-Z]*|[^a-z]*)$).*$')])]
        }, {
            validator: PasswordValidation.MatchPassword
        });
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
                this.form['oldPasswors'].setValue('');
                this.form['password'].setValue('');
                this.form['verifyPassword'].setValue('');
                this.isPromiseDone = true;
                this.form['oldPasswors'].reset();
                this.form['password'].reset();
                this.form['verifyPassword'].reset();
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
