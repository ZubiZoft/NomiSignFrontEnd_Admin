import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {SessionTimeoutDialogComponent} from '../../session-timeout-dialog/session-timeout-dialog.component';
import {CompanyUsersService} from '../../../services/companyUser.service';
import {UserService} from '../../../services/user.service';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'ng-company-users-list',
    templateUrl: './companyUsersList.component.html',
    styleUrls: ['./companyUsersList.component.css'],
    providers: [CompanyUsersService]
})
export class CompanyUsersListComponent implements OnInit {
    companyId: string;
    companyUsers: any[];
    isPromiseDone = false;

    constructor(private route: ActivatedRoute, private employeeService: CompanyUsersService, public dialog: MatDialog,
                private userService: UserService, private router: Router) {
        route.params.subscribe((params: Params) => {
            this.companyId = params['cid'];
        });
    }

    ngOnInit(): void {
        let user = this.userService.getUser();

        this.route.paramMap
            .switchMap((params: ParamMap) => this.employeeService.getCompanyUsersByCompany(params.get('cid'), user.UserType))
            .subscribe(data => {
                this.companyUsers = data;
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

    updateEmployee() {
        //  this.route.paramMap
        //  .switchMap((params: ParamMap) => this.employeeService.updateCompanyDetails(params.get('id'), this.company))
        //  .subscribe(data => this.company = data);
    }
}
