import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {EmployeeModel} from '../../../../models/employee.model';
import {EmployeeService} from '../../../../services/employee.service';
import {MatDialog} from '@angular/material';
import {UserService} from '../../../../services/user.service';
import {SessionTimeoutDialogComponent} from '../../../session-timeout-dialog/session-timeout-dialog.component';
import {CompanyModel} from '../../../../models/company.model';
import {LetterPaginationElem} from '../../../../models/LetterPaginationElem';
import {CompanyService} from '../../../../services/company.service';

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
    letters: LetterPaginationElem[];
    selectedLetter: LetterPaginationElem;
    company: CompanyModel;

    constructor(private employeeService: EmployeeService, private route: ActivatedRoute, public dialog: MatDialog,
                private userService: UserService, private router: Router, private companyService: CompanyService) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.companyId = params['cid'];
        });

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

        this.letters = [];
        this.letters.push(new LetterPaginationElem('A'));
        this.letters.push(new LetterPaginationElem('B'));
        this.letters.push(new LetterPaginationElem('C'));
        this.letters.push(new LetterPaginationElem('D'));
        this.letters.push(new LetterPaginationElem('E'));
        this.letters.push(new LetterPaginationElem('F'));
        this.letters.push(new LetterPaginationElem('G'));
        this.letters.push(new LetterPaginationElem('H'));
        this.letters.push(new LetterPaginationElem('I'));
        this.letters.push(new LetterPaginationElem('J'));
        this.letters.push(new LetterPaginationElem('K'));
        this.letters.push(new LetterPaginationElem('L'));
        this.letters.push(new LetterPaginationElem('M'));
        this.letters.push(new LetterPaginationElem('N'));
        this.letters.push(new LetterPaginationElem('Ñ'));
        this.letters.push(new LetterPaginationElem('O'));
        this.letters.push(new LetterPaginationElem('P'));
        this.letters.push(new LetterPaginationElem('Q'));
        this.letters.push(new LetterPaginationElem('R'));
        this.letters.push(new LetterPaginationElem('S'));
        this.letters.push(new LetterPaginationElem('T'));
        this.letters.push(new LetterPaginationElem('U'));
        this.letters.push(new LetterPaginationElem('V'));
        this.letters.push(new LetterPaginationElem('W'));
        this.letters.push(new LetterPaginationElem('X'));
        this.letters.push(new LetterPaginationElem('Y'));
        this.letters.push(new LetterPaginationElem('Z'));
        this.letters.push(new LetterPaginationElem('Todos'));
        this.selectedLetter = new LetterPaginationElem('');
    }

    loadTable() {
        if (this.selectedLetter.value === 'Todos') {
            this.route.paramMap
                .switchMap((params: ParamMap) => this.employeeService.getEmployeesByCompany(params.get('cid')))
                .subscribe(data => {
                    this.employees = data;
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
        } else {
            this.route.paramMap
                .switchMap((params: ParamMap) => this.employeeService.getEmployeesByCompanyNl(params.get('cid'), this.selectedLetter.value))
                .subscribe(data => {
                    this.employees = data;
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

    onClickSmallTags(l: LetterPaginationElem) {
        for (const lx of this.letters) {
            lx.color = '#999';
        }
        l.color = '#2cbbc3';
        this.selectedLetter = l;
        this.loadTable();
    }

    sortedBy(event) {
        this.sortAsc = this.sortKey === event ? !this.sortAsc : false;
        this.sortKey = event;
    }
}