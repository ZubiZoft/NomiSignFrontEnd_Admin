import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import {CompanyUsersService} from '../../services/companyUser.service';
import {CompanyUserModel} from '../../models/companyUser.model';
import {MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SessionTimeoutDialogComponent} from '../session-timeout-dialog/session-timeout-dialog.component';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'ng-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    providers: [CompanyUsersService]
})
export class AccountComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute, public snackbar: MatSnackBar, private userService: UserService,
                private companySserService: CompanyUsersService, private _formBuilder: FormBuilder, public dialog: MatDialog) {
    }

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
            .switchMap((params: ParamMap) => this.companySserService.getCompanyUserById('0', params.get('uid')))
            .subscribe(data => {
                this.user = data;
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


    reroute(activeUser) {

        // will need phone later maybe  this.employeePasswordDetails.EmailAddress === this.employee.EmailAddress &&
        if ((!this.passwordVerifyFormControl.hasError('pattern'))) {
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
        this.route.paramMap.switchMap(
            (params: ParamMap) => this.companySserService.updateCompanyUserDetails(this.user.UserId.toString(), this.user).finally(
                () => this.snackbar.open('Cargado Correctamente', '', {duration: 5000})))
            .subscribe(data => this.user = data, error => {
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

@Component({
    selector: 'password-alert-dialog',
    templateUrl: '../login/login-alert-dialog.html',
})
export class PasswordAlertDialog {

    constructor(public dialogRef: MatDialogRef<PasswordAlertDialog>) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
