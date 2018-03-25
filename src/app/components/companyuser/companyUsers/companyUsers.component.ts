import { Component } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { CompanyModel } from '../../../models/company.model';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material';
import {UserService} from '../../../services/user.service';
import {SessionTimeoutDialogComponent} from '../../session-timeout-dialog/session-timeout-dialog.component';

@Component({
  selector: 'ng-company-users',
  templateUrl: './companyUsers.component.html',
  styleUrls: ['./companyUsers.component.css'],
  providers: [ CompanyService ]
})

export class CompanyUsersComponent {

  companies: CompanyModel[];
  isPromiseDone = false;

  constructor(companyService: CompanyService, public dialog: MatDialog, private userService: UserService, private router: Router) {
    companyService.getCompanies().subscribe(data => {
      this.companies = data
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

  selectedCompany(value: any) {

    this.router.navigate(['/companyusers/' + value]);
  }

}
