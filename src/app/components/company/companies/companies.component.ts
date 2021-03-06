import { Component } from '@angular/core';
import { CompanyModel } from '../../../models/company.model'
import { CompanyService } from '../../../services/company.service'
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {SessionTimeoutDialogComponent} from '../../session-timeout-dialog/session-timeout-dialog.component';

@Component({
  selector: 'ng-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers: [ CompanyService ]
})
export class CompaniesComponent {
  companies: CompanyModel[];
  isPromiseDone: boolean = false

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
}
