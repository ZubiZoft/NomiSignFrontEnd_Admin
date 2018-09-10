import { Component, OnInit } from '@angular/core';
import {EmployeeModel} from '../../../models/employee.model';
import {CompanyModel} from '../../../models/company.model';
import {CompanyService} from '../../../services/company.service';
import {MatDialog} from '@angular/material';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {SessionTimeoutDialogComponent} from '../../session-timeout-dialog/session-timeout-dialog.component';

@Component({
  selector: 'app-company-list-receipts',
  templateUrl: './company-list-receipts.component.html',
  styleUrls: ['./company-list-receipts.component.css']
})
export class CompanyListReceiptsComponent implements OnInit {

    employees: EmployeeModel[];
    companies: CompanyModel[];
    isPromiseDone = false;

    constructor(private companyService: CompanyService, public dialog: MatDialog, private userService: UserService,
                private router: Router) { }

    ngOnInit(): void {
        this.companyService.getCompanies().subscribe(data => {
            this.companies = data;
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
