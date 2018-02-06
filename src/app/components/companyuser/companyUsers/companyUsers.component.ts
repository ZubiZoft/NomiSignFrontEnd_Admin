import { Component } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { CompanyModel } from '../../../models/company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-company-users',
  templateUrl: './companyUsers.component.html',
  styleUrls: ['./companyUsers.component.css'],
  providers: [ CompanyService ]
})

export class CompanyUsersComponent {

  companies: CompanyModel[];
  isPromiseDone = false;

  constructor(companyService: CompanyService, public router: Router) {
    companyService.getCompanies().subscribe(data => {
      this.companies = data
      this.isPromiseDone = true;
    });
  }

  selectedCompany(value: any) {

    this.router.navigate(['/companyusers/' + value]);
  }

}
