//angular imports
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
//rxjs imports
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
//custom imports
import {UserType} from '../../../models/usertype.models';
import {UserService} from '../../../services/user.service';
import {CompanyUsersService} from '../../../services/companyUser.service';
import {CompanyUserModel} from '../../../models/companyUser.model';
//angular material imports
import {MatDialog, MatSnackBar} from '@angular/material';
import {SessionTimeoutDialogComponent} from '../../session-timeout-dialog/session-timeout-dialog.component';

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
    employeeID: string;

    constructor(private route: ActivatedRoute, private companyUserService: CompanyUsersService, public snackbar: MatSnackBar,
                private _location: Location, public dialog: MatDialog, private userService: UserService, private router: Router) {
        this.companyUser = new CompanyUserModel();
        this.usertype = new UserType();
    }

    ngOnInit(): void {
        let user = this.userService.getUser();
        if (user.UserType != 3) {
            this.usertype.codes = this.usertype.codes.filter(obj => obj !== 'GlobalAdmin');
        }
        this.route.params.subscribe((params: Params) => {
            this.companyId = params['cid'];
        });
    }

    saveNewCompanyUser() {
        this.companyUser.CompanyId = +this.companyId;
        let user = this.userService.getUser();
        this.companyUser.CreatedByUserId = user.UserId;
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
                    } else {
                        this.userService.clearUser();
                        this.router.navigate(['/login']);
                    }
                },
                () => this.snackbar.open('Cargados Exitosamente', '', {duration: 5000})
            );
    }
}