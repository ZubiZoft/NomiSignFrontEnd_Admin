import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ChangePasswordModel} from '../../models/ChangePassword.model';
import {CompanyUsersService} from '../../services/companyUser.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {UploadedAlertDialog} from '../company/companyEdit/companyEdit.component';
import {MatDialog} from '@angular/material';

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

  oldPasswordFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  passwordVerifyFormControl = new FormControl('', [Validators.required, Validators.pattern('')]);

  constructor(public companyUserService: CompanyUsersService, public userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  changePwd() {
    this.companyUserService.changePasswordService(this.changePassword, this.user.UserId).subscribe(
        () => {
            let dialogRef = this.dialog.open(UploadedAlertDialog, {
                width: '50%',
                data: {'message': 'Tu contraseña ha sido actualizada.'}
            });
        });
  }

}
