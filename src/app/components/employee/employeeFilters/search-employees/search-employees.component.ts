import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {EmployeeModel} from '../../../../models/employee.model';
import {EmployeeService} from '../../../../services/employee.service';
import {MatDialog} from '@angular/material';
import {UserService} from '../../../../services/user.service';
import {SessionTimeoutDialogComponent} from '../../../session-timeout-dialog/session-timeout-dialog.component';
import {CompanyModel} from '../../../../models/company.model';
import {CompanyService} from '../../../../services/company.service';
import {EmployeeSearch} from '../../../../models/employee.search';
import {VerifyNotAlertDialog} from '../../../receipts/receiptsFilters/unsigned-receipts/unsigned-receipts.component';
import {CompanyEmployeeModel} from '../../../../models/company.employee.model';

@Component({
    selector: 'app-search-employees',
    templateUrl: './search-employees.component.html',
    styleUrls: ['./search-employees.component.css']
})
export class SearchEmployeesComponent implements OnInit {

    companyId: string;
    employees: EmployeeModel[];
    isPromiseDone = false;
    sortAsc: boolean;
    sortKey: string;
    company: CompanyModel;
    search: EmployeeSearch;
    updateBtn = false;
    responseClassG: boolean;
    responseClassR: boolean;
    CompanyInfo: CompanyEmployeeModel;

    constructor(private employeeService: EmployeeService, private route: ActivatedRoute, public dialog: MatDialog,
                public userService: UserService, private router: Router, private companyService: CompanyService) {
    }

    ngOnInit() {
        if (this.userService.getUser().UserType !== 3) {
            this.responseClassG = false;
            this.responseClassR = true;
        } else {
            this.responseClassR = false;
            this.responseClassG = true;
        }

        this.route.params.subscribe((params: Params) => {
            this.companyId = params['cid'];
        });
        this.employees = [];

        this.route.paramMap
            .switchMap((params: ParamMap) => this.companyService.getCompanyById(params.get('cid')))
            .subscribe(data => {
                this.company = data;
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

        this.search = new EmployeeSearch();
    }

    loadTable() {
        this.isPromiseDone = false;
        this.route.paramMap
            .switchMap((params: ParamMap) => this.employeeService.advanceSearch(params.get('cid'), this.search))
            .subscribe(data => {
                this.CompanyInfo = data;
                this.employees = this.CompanyInfo.Employees;
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

    sortedBy(event) {
        this.sortAsc = this.sortKey === event ? !this.sortAsc : false;
        this.sortKey = event;
        console.log(this.sortKey);
    }

    resetSelectedAccounts() {
        this.isPromiseDone = false;
        var selectedEmps: number[] = [];
        for (const e of this.employees) {
            if (e.CheckedBox) {
                selectedEmps.push(e.EmployeeId);
            }
        }
        this.route.paramMap
            .switchMap((params: ParamMap) => this.employeeService.resetAccounts(selectedEmps))
            .subscribe(data => {
                this.isPromiseDone = true;
                this.dialog.closeAll();
                let dialogRef = this.dialog.open(VerifyNotAlertDialog, {
                    width: '75%',
                    data: {'message': '¡Se ha enviado una notificación a los empleados seleccionados!'}
                });
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

    selectedCheckBox() {
        for (const d of this.employees) {
            if (d.CheckedBox) {
                this.updateBtn = true;
                return;
            }
        }
        this.updateBtn = false;
    }

    selectAllDocuments() {
        if (this.employees.length <= 0) {
            return;
        }
        var l = true;
        if (this.employees[0].CheckedBox) {
            l = false;
        }
        for (const d of this.employees) {
            d.CheckedBox = l;
        }
        this.updateBtn = l;
    }
}
