import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { EmployeeService } from '../../../../services/employee.service';
import { EmployeeModel } from '../../../../models/employee.model';
import {MatDialog} from '@angular/material';
import {UserService} from '../../../../services/user.service';
import {SessionTimeoutDialogComponent} from '../../../session-timeout-dialog/session-timeout-dialog.component';
import {LetterPaginationElem} from '../../../../models/LetterPaginationElem';
import {CompanyModel} from '../../../../models/company.model';
import {UploadService} from '../../../../services/upload.service';
import {CompanyService} from '../../../../services/company.service';
import {UploadedAlertDialog} from '../../../company/companyEdit/companyEdit.component';
import {VerifyNotAlertDialog} from '../../../receipts/receiptsFilters/unsigned-receipts/unsigned-receipts.component';
import {CompanyEmployeeModel} from '../../../../models/company.employee.model';

@Component({
  selector: 'app-inactive-employees',
  templateUrl: './inactive-employees.component.html',
  styleUrls: ['./inactive-employees.component.css']
})
export class InactiveEmployeesComponent implements OnInit {

    companyId: string;
    employees: EmployeeModel[];
    isPromiseDone = false;
    sortAsc: boolean;
    sortKey: string;
    file: any;
    letters: LetterPaginationElem[];
    selectedLetter: LetterPaginationElem;
    company: CompanyModel;
    updateBtn = false;
    CompanyInfo: CompanyEmployeeModel;
    searchX = '';

    constructor(private employeeService: EmployeeService, private route: ActivatedRoute, public dialog: MatDialog,
                public userService: UserService, private router: Router, private uploadService: UploadService,
                private companyService: CompanyService) { }

    ngOnInit() {
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
        this.isPromiseDone = false;
        this.route.paramMap
            .switchMap((params: ParamMap) => this.employeeService.getInactiveEmployeesByCompany(params.get('cid'),
                this.selectedLetter.value))
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

    onFileSelect(event) {
        this.file = event;
        if (this.file) {
            let reader = new FileReader();
            reader.readAsDataURL(this.file[0]);
            reader.onload = (e) => {
                let res = reader.result.split(',')[1]; //removes data:image...
                this.uploadService.addEmployeeCSVFile(res, this.companyId).subscribe(
                    userData => {
                        let dialogRef = this.dialog.open(UploadedAlertDialog, {
                            width: '50%',
                            data: {'message': 'Tu documento CSV de correos y números celulares, fue cargado satisfactoriamente.'}
                        });
                        dialogRef.afterClosed().subscribe(() => {
                            this.ngOnInit();
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
                    }
                );
            };
        } else {
            let dialogRef = this.dialog.open(UploadedAlertDialog, {
                width: '50%',
                data: {'message': 'Hubo un error al cargar tu documento CSV de correos y números celulares.'}
            });
        }
        return false;
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
        this.employees.filter(item => {
            for (const key in item) {
                if (key === 'CheckedBox') {
                    continue;
                }
                let lowerKey = '' + item[key];
                if (lowerKey !== undefined && lowerKey.toString().toLowerCase().includes(this.searchX.toLowerCase())) {
                    item['CheckedBox'] = l;
                }
            }
        });
        this.updateBtn = l;
    }
}
