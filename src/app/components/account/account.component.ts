import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { ActivatedRoute, ParamMap } from '@angular/router';

//rxjs imports
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/finally'

//import { AlertComponent } from '../alert/alert.component'
import { CompanyUsersService } from '../../services/companyUser.service'
import { CompanyUserModel } from '../../models/companyUser.model'
import { SettingsService } from '../../services/settings.service'

//angular material imports
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'ng-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [CompanyUsersService]
})
export class AccountComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute, public snackbar: MatSnackBar, private userService: CompanyUsersService, private _formBuilder: FormBuilder, public dialog: MatDialog) { }

    user: CompanyUserModel;
    userPasswordDetails: CompanyUserModel;
    isPromiseDone: boolean = false;
    usernameFormControl = new FormControl('', [
        Validators.email]);

    securityCodeFormControl = new FormControl('', [Validators.required]);

    passwordFormControl = new FormControl('', [Validators.required]);

    passwordVerifyFormControl = new FormControl('', [Validators.required, Validators.pattern('')]);

    ngOnInit(): void {
        this.user = new CompanyUserModel();
        this.userPasswordDetails = new CompanyUserModel();

      this.route.paramMap
          .switchMap((params: ParamMap) => this.userService.getCompanyUserById("0", params.get('uid'))) // cid is not used in get service
          .subscribe(data => {
              this.user = data;
              this.isPromiseDone = true; 
          });
  }

    

    reroute(activeUser) {
       
        // will need phone later maybe  this.employeePasswordDetails.EmailAddress === this.employee.EmailAddress &&
        if ( (!this.passwordVerifyFormControl.hasError('pattern')) ) {
            this.user.PasswordHash = this.userPasswordDetails.PasswordHash;
            //this.user.SecurityCode = this.employeePasswordDetails.SecurityCode;
            // set user to active
            this.user.UserStatus = 2;
            this.updateUserPassword();
            this.router.navigate(['/login']);
        }
        else {
            let dialogRef = this.dialog.open(PasswordAlertDialog, {
                width: '50%',
                data: {}
            }); 
        }
      
  }

  //passwordMatch(c: AbstractControl) {
  //    return c.get('employeePasswordHash').value === c.get('employeeVerifyPasswordHash').value ? null : { 'nomatch': true };
  //}


  updateUserPassword() {
      this.route.paramMap
          .switchMap((params: ParamMap) => this.userService.updateCompanyUserDetails(this.user.UserId.toString(), this.user).finally(() => this.snackbar.open("sucessfully updated", "", { duration: 5000 })))
          .subscribe(data => this.user = data,
          error => this.snackbar.open(error, "", { duration: 5000 }))
  }

}

@Component({
    selector: 'password-alert-dialog',
    templateUrl: '../login/login-alert.dialog.html',
})
export class PasswordAlertDialog {

    constructor(public dialogRef: MatDialogRef<PasswordAlertDialog>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
