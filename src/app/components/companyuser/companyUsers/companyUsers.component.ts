import { Component } from '@angular/core';

import { CompanyService } from '../../../services/company.service'

import { CompanyModel } from '../../../models/company.model'


@Component({
  selector: 'ng-company-users',
  templateUrl: './companyUsers.component.html',
  styleUrls: ['./companyUsers.component.css'],
  providers: [ CompanyService ]
})

export class CompanyUsersComponent {

  companies: CompanyModel[];
  
    constructor(companyService : CompanyService) { 
      companyService.getCompanies().subscribe(data => this.companies = data)
    }

}