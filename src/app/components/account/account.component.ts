import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import {CompanyUsersService} from '../../services/companyUser.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UserService} from '../../services/user.service';
import {ResetAccountModel} from '../../models/reset.account.model';
import {LoginAlertDialog} from '../login/login.component';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'ng-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    hide = true;
    hideV = true;
    form: FormGroup;
    isPromiseDone = true;
    acc: ResetAccountModel;
    isAvailable = false;

    constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private authService: AuthService,
                private companyUserService: CompanyUsersService, private formBuilder: FormBuilder, public dialog: MatDialog) {
        this.userService.clearUser();
        this.form = formBuilder.group({
            'code': [null, Validators.compose([Validators.minLength(3), Validators.required])],
            'email': [null, Validators.compose([Validators.required, Validators.email])],
            'password': [null, Validators.compose([Validators.required,
                Validators.pattern('^(?!(.{0,5}|[^0-9]*|[^A-Z]*|[^a-z]*)$).*$')])],
            'verifyPassword': [null, Validators.required]
        }, {
            validator: PasswordValidation.MatchPassword
        });
    }

    ngOnInit(): void {
        this.acc = new ResetAccountModel();
        this.route.params.subscribe(params => {
            this.acc.UserId = +params['uid'];
        });
        this.isPromiseDone = false;
        this.authService.isAvailableorReset(this.acc.UserId).subscribe(() => {
            this.isAvailable = true;
            this.isPromiseDone = true;
        }, error => {
            if (error.status === 404) {
                let dialogRef = this.dialog.open(LoginAlertDialog, {
                    width: '75%',
                    data: {
                        'message': '¡El link ha expirado, utiliza la opción \'Olvidé mi Contraseña\' para obtener un nuevo link de'
                            + ' activación!'
                    }
                });
                dialogRef.afterClosed().subscribe(
                    () => {
                        this.router.navigate(['/login']);
                    }
                );
            } else {
                let dialogRef = this.dialog.open(LoginAlertDialog, {
                    width: '75%',
                    data: {
                        'message': '¡Un error ha ocurrido, por favor contacta a tu administrador!'
                    }
                });
                dialogRef.afterClosed().subscribe(
                    () => {
                        this.router.navigate(['/login']);
                    }
                );
            }
        });
    }

    activateAccount(): void {
        this.companyUserService.activateAccount(this.acc).subscribe(
            data => {
                this.dialog.closeAll();
                let dialogRef = this.dialog.open(LoginAlertDialog, {
                    width: '75%',
                    data: {
                        'message': '¡Tu cuenta ha sido activada satisfactoriamente!'
                    }
                });
                dialogRef.afterClosed().subscribe(
                    () => {
                        this.router.navigate(['/login']);
                    }
                );
            }, error => {
                if (error.status === 409) {
                    let dialogRef = this.dialog.open(LoginAlertDialog, {
                        width: '75%',
                        data: {
                            'message': '¡Tu correo o código de seguridad no corresponden, por favor verifica tu información!'
                        }
                    });
                } else if (error.status === 404) {
                    let dialogRef = this.dialog.open(LoginAlertDialog, {
                        width: '75%',
                        data: {
                            'message': '¡La cuenta que intentas verificar no es válida, por favor contacta a tu administrador!'
                        }
                    });
                    dialogRef.afterClosed().subscribe(
                        () => {
                            this.router.navigate(['/login']);
                        }
                    );
                } else {
                    let dialogRef = this.dialog.open(LoginAlertDialog, {
                        width: '75%',
                        data: {
                            'message': '¡Un error ha ocurrido, por favor contacta a tu administrador!'
                        }
                    });
                    dialogRef.afterClosed().subscribe(
                        () => {
                            this.router.navigate(['/login']);
                        }
                    );
                }
            }
        );
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

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('password').value;
        const confirmPassword = AC.get('verifyPassword').value;
        if (password !== confirmPassword) {
            AC.get('verifyPassword').setErrors({MatchPassword: true});
        } else {
            return null;
        }
    }
}
