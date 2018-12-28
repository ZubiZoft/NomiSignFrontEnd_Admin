import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import {UserType} from '../../../models/usertype.models';
import {UserService} from '../../../services/user.service';
import {CompanyUsersService} from '../../../services/companyUser.service';
import {CompanyUserModel} from '../../../models/companyUser.model';
import {MatSnackBar, MatDialog} from '@angular/material';
import {SessionTimeoutDialogComponent} from '../../session-timeout-dialog/session-timeout-dialog.component';
import {LoginAlertDialog} from '../../login/login.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ResetAccountModel} from '../../../models/reset.account.model';

@Component({
    selector: 'ng-company-users-edit',
    templateUrl: './companyUsersEdit.component.html',
    styleUrls: ['./companyUsersEdit.component.css'],
    providers: [CompanyUsersService]
})
export class CompanyUsersEditComponent implements OnInit {
    companyUser: CompanyUserModel;
    companyId: string;
    usertype: UserType;
    isPromiseDone = false;
    selected: string;
    form: FormGroup;
    readonlytype = true;

    constructor(private route: ActivatedRoute, private companyUserService: CompanyUsersService, public snackbar: MatSnackBar,
                private _location: Location, public dialog: MatDialog, private userService: UserService, private router: Router,
                private formBuilder: FormBuilder, private authService: AuthService) {
        this.usertype = new UserType();
        this.form = formBuilder.group({
            'email': [null, Validators.compose([Validators.required, Validators.email])],
            'username': [null, Validators.required],
            'phone': [null, Validators.required],
            'type': [null, Validators.required]
        });
    }

    ngOnInit(): void {
        const user = this.userService.getUser();
        if (user.UserType !== 3) {
            this.usertype.codes = this.usertype.codes.filter(obj => obj.system !== 'GlobalAdmin');
        }

        this.route.params.subscribe((params: Params) => {
            this.companyId = params['cid'];
        });

        this.route.paramMap
            .switchMap((params: ParamMap) => this.companyUserService.getCompanyUserById(params.get('cid'), params.get('cuid')))
            .subscribe(data => {
                this.companyUser = data;
                switch (this.companyUser.UserType) {
                    case 'GlobalAdmin':
                        this.selected = 'Adminitrador Global';
                        break;
                    case 'CompanyAdmin':
                        this.selected = 'Administrador de Compañía';
                        break;
                    default:
                        this.selected = 'Recursos Humanos';
                        break;
                }
                if (user.UserType !== 3 && this.companyUser.UserType === 'GlobalAdmin') {
                    this.readonlytype = true;
                } else {
                    this.readonlytype = false;
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
    }

    updateCompanyUser() {
        switch (this.selected) {
            case 'Adminitrador Global':
                this.companyUser.UserType = 'GlobalAdmin';
                break;
            case 'Administrador de Compañía':
                this.companyUser.UserType = 'CompanyAdmin';
                break;
            default:
                this.companyUser.UserType = 'HumanResources';
                break;
        }
        this.route.paramMap
            .switchMap((params: ParamMap) => this.companyUserService.updateCompanyUserDetails(params.get('cuid'), this.companyUser).finally(
                () => this.snackbar.open('sucessfully updated', '', {duration: 5000})))
            .subscribe(data => {
                    this.companyUser = data;
                    this._location.back();
                },
                error => {
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

    removeAccount() {
        this.companyUserService.removeCompanyUser(this.companyUser.UserId).subscribe(data => {
                let dialogRef = this.dialog.open(LoginAlertDialog, {
                    width: '75%',
                    data: {
                        'message': 'El usuario se ha dado de baja correctamente.'
                    }
                });
                dialogRef.afterClosed().subscribe(() => {
                    this._location.back();
                });
            },
            error => {
                if (error.status === 405) {
                    this.dialog.closeAll();
                    let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                        width: '75%'
                    });
                } else {
                    this.dialog.closeAll();
                    let dialogRef = this.dialog.open(LoginAlertDialog, {
                        width: '75%',
                        data: {
                            'message': 'Ha ocurrido un error dando de baja al usuario, por favor contacte a su administrador.'
                        }
                    });
                }
            });
    }

    resetAccount() {
        let user = new ResetAccountModel();
        user.Email = this.companyUser.EmailAddress;
        user.UserId = this.companyUser.UserId;
        this.authService.sendPasswordReset(user).subscribe(() => {
            let dialogRef = this.dialog.open(LoginAlertDialog, {
                width: '75%',
                data: {
                    'message': '¡La cuenta ha sido reiniciada correctamente!'
                }
            });
        }, error => {
            let dialogRef = this.dialog.open(LoginAlertDialog, {
                width: '75%',
                data: {
                    'message': '¡Hubo un error, por favor contacte a su administrador!'
                }
            });
        });
    }
}
