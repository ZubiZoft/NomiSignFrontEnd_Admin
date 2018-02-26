import {Component} from '@angular/core';

import {CompanyService} from '../../../services/company.service';

import {EmployeeModel} from '../../../models/employee.model';
import {CompanyModel} from '../../../models/company.model';


@Component({
    selector: 'ng-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    providers: [CompanyService]
})

export class EmployeesComponent {

    employees: EmployeeModel[];
    companies: CompanyModel[];
    isPromiseDone: boolean = false;

    constructor(companyService: CompanyService) {
        companyService.getCompanies().subscribe(data => {
            this.companies = data;
            this.isPromiseDone = true;
        });
    }

}