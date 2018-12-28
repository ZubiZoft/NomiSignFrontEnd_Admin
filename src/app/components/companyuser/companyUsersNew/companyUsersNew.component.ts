import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, AbstractControl, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import {UserType} from '../../../models/usertype.models';
import {UserService} from '../../../services/user.service';
import {CompanyUsersService} from '../../../services/companyUser.service';
import {CompanyUserModel} from '../../../models/companyUser.model';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SessionTimeoutDialogComponent} from '../../session-timeout-dialog/session-timeout-dialog.component';
import {LoginAlertDialog} from '../../login/login.component';

@Component({
    selector: 'ng-company-users-new',
    templateUrl: './companyUsersNew.component.html',
    styleUrls: ['./companyUsersNew.component.css'],
    providers: [CompanyUsersService]
})
export class CompanyUsersNewComponent implements OnInit {
    companyUser: CompanyUserModel;
    companyId: string;
    usertype: UserType;
    selected: string;
    form: FormGroup;

    constructor(private route: ActivatedRoute, private companyUserService: CompanyUsersService, public snackbar: MatSnackBar,
                private _location: Location, public dialog: MatDialog, private userService: UserService, private router: Router,
                private formBuilder: FormBuilder) {
        this.companyUser = new CompanyUserModel();
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
    }

    saveNewCompanyUser() {
        this.companyUser.CompanyId = +this.companyId;
        let user = this.userService.getUser();
        this.companyUser.CreatedByUserId = user.UserId;
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
            .switchMap((params: ParamMap) => this.companyUserService.saveNewCompanyUser(this.companyUser))
            .subscribe(
                data => {
                    this.companyUser = data;
                    this._location.back();
                },
                error => {
                    if (error.status === 405) {
                        this.dialog.closeAll();
                        let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                            width: '75%'
                        });
                    } else if (error.status === 409) {
                        let dialogRef = this.dialog.open(LoginAlertDialog, {
                            width: '75%',
                            data: {'message': 'Ya existe un usuario con el correo ' + this.companyUser.EmailAddress}
                        });
                    } else {
                        this.userService.clearUser();
                        this.router.navigate(['/login']);
                    }
                },
                () => this.snackbar.open('Cargados Exitosamente', '', {duration: 5000})
            );
    }
}
