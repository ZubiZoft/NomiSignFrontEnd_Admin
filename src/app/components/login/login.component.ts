import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ResetAccountModel} from '../../models/reset.account.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthService]
})
export class LoginComponent implements OnInit {
    user = {
        EmailAddress: '',
        PasswordHash: ''
    };
    userName: string;
    password: string;
    form: FormGroup;
    isPromiseDone = true;
    hide = true;

    activeUser: User;

    constructor(private authService: AuthService, private router: Router, private userService: UserService,
                public dialog: MatDialog, private formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            'email': [null, Validators.compose([Validators.required, Validators.email])],
            'password': [null, Validators.required]
        });
    }

    ngOnInit() {
        if (this.userService.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
        }
    }

    openForgotPasswordDialog() {
        let dialogRef = this.dialog.open(ForgotPasswordDialog, {
            width: '50%'
        });
    }

    login() {
        this.user.EmailAddress = this.userName;
        this.user.PasswordHash = this.password;
        this.authService.loginUser(this.user).subscribe(
            userData => this.userService.setUser(userData),
            error => {
                let dialogRef = this.dialog.open(LoginAlertDialog, {
                        width: '50%',
                        data: {
                            'message': 'El email y / o contraseña provistos no pudieron ser autenticados con exito'
                        }
                    });
            }, () => {
                let user = this.userService.getUser();
                switch (user.UserType) {
                    case 3: { //global admin
                        this.router.navigate(['/dashboard']);
                        break;
                    }
                    case 2: { //company admin
                        this.router.navigate(['/home', user.CompanyId]);
                        break;
                    }
                    case 1: { //HR user
                        this.router.navigate(['/home', user.CompanyId]);
                        break;
                    }
                    default: { //default case
                        this.router.navigate(['/login']);
                        break;
                    }
                }
            }
        );
    }
}

@Component({
    selector: 'login-alert-dialog',
    templateUrl: 'login-alert-dialog.html',
})
export class LoginAlertDialog implements OnInit {

    constructor(public dialogRef: MatDialogRef<LoginAlertDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    loginMessage: string;

    ngOnInit() {
        this.loginMessage = this.data['message'];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

@Component({
    selector: 'forgot-password-dialog',
    templateUrl: 'forgot-password-dialog.html',
})
export class ForgotPasswordDialog implements OnInit {

    form: FormGroup;
    message: string;
    isPromiseDone = true;
    email: ResetAccountModel;

    constructor(public dialogRef: MatDialogRef<ForgotPasswordDialog>, @Inject(MAT_DIALOG_DATA) public data: any,
                private formBuilder: FormBuilder, private auth: AuthService, public dialog: MatDialog) {
        this.form = formBuilder.group({
            'email': [null, Validators.compose([Validators.required, Validators.email])]
        });
    }

    ngOnInit() {
        this.email = new ResetAccountModel();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    resetMyPassword() {
        this.isPromiseDone = false;
        this.auth.sendPasswordReset(this.email).subscribe(
            () => {
                this.dialogRef.afterClosed().subscribe(
                    () => {
                        this.dialog.open(LoginAlertDialog, {
                            width: '50%',
                            data: {
                                'message': 'Sí la cuenta de correo es correcta, entonces recibiras un correo para reiniciar tu cuenta.'
                            }
                        });
                    }
                );
                this.dialogRef.close();
                this.isPromiseDone = true;
            }, error => {
                this.dialogRef.afterClosed().subscribe(
                    () => {
                        this.dialog.open(LoginAlertDialog, {
                            width: '50%',
                            data: {
                                'message': '¡Hubo un error reiniciando la cuenta, por favor contacta a soporte técnico Nomisign!'
                            }
                        });
                    }
                );
                this.dialogRef.close();
                this.isPromiseDone = true;
            }
        );
    }
}
