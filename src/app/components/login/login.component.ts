import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model'

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {
  user = {
    EmailAddress: '',
    PasswordHash: ''
  };
  userName: string
  password: string

  activeUser: User;
  usernameFormControl = new FormControl('', [
    Validators.required]);

  passwordFormControl = new FormControl('', [
    Validators.required]);


  constructor(private authService: AuthService, private router: Router, private userService: UserService, public dialog: MatDialog) {

  }

  ngOnInit() {

  }

  reroute(activeUser) {
    this.userService.setUser(activeUser);
    this.router.navigate(['/layout'])
  }

  gotoForgotPassword(): boolean {
      var message = "Se envio un enlace de restablecimiento de contrasena a su email en el archivo";
      if (this.usernameFormControl.hasError('required') || this.usernameFormControl.hasError('email')) {
          message = "Pon su email y entonces oprima 'me Olvide Mi Contrasena'";
          let dialogRef = this.dialog.open(LoginAlertDialog, {
              width: '50%',
              data: { 'message': message }
          });
      }
      else {
          this.user.EmailAddress = this.userName;
          this.authService.sendPasswordReset(this.user).subscribe(
              userData => {
                  this.userService.setUser(userData);
                  let dialogRef = this.dialog.open(LoginAlertDialog, {
                      width: '50%',
                      data: { 'message': message }
                  });
              },
              error => {
                  let dialogRef = this.dialog.open(LoginAlertDialog, {
                      width: '50%',
                      data: { 'message': "Si el email proporcionado fue correcto, se enviara un enlace de restablecimiento de contrasena" }
                  });
              })

      }
      return false;
  }

  login() {
    this.user.EmailAddress = this.userName
    this.user.PasswordHash = this.password
    this.authService.loginUser(this.user).subscribe(
      userData => this.userService.setUser(userData),
      error => {
          let dialogRef = this.dialog.open(LoginAlertDialog, {
          width: '50%',
          data: {
              'message': "El email y / o contrasena provistos no pudieron ser autenticados con exito" }
        })
      ;},
      () =>  {
        
        let user = this.userService.getUser()
        switch(user.UserType){
          case 3: { //global admin
            this.router.navigate(['/dashboard'])
            break;
          } 
          case 2: { //company admin
            this.router.navigate(['/companyEdit', user.CompanyId ])
            break;
          }
          case 1: { //HR user
            this.router.navigate(['/employeesList', user.CompanyId])
            break;
          }
          default: { //default case
            this.router.navigate(['/login'])
            break;
          }
        }
      }
    )
  }


}

@Component({
    selector: 'login-alert-dialog',
    templateUrl: 'login-alert.dialog.html',
})
export class LoginAlertDialog implements OnInit {

    constructor(public dialogRef: MatDialogRef<LoginAlertDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }
    loginMessage: string;

    ngOnInit() {
        this.loginMessage = this.data['message']; //"The email and/or password provided could not be authenticated sucessfully.";
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
