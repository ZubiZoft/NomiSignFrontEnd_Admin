//angular imports
import { Component } from '@angular/core';
//custom imports
import { CompanyModel } from '../../../models/company.model'
import { CompanyService } from '../../../services/company.service'

@Component({
  selector: 'ng-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers: [ CompanyService ]
})
export class CompaniesComponent {
  companies: CompanyModel[];
  isPromiseDone: boolean = false

  constructor(companyService : CompanyService) { 
    companyService.getCompanies().subscribe(data => {
      this.companies = data
      this.isPromiseDone = true;
    })

    //companyService.getCompanies().subscribe(data => this.companies = data)
  }
}
