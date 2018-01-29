//angular imports
import { Component } from '@angular/core';
//custom imports
import { CompanyModel } from '../../../models/company.model'
import { CompanyService } from '../../../services/company.service'
import { States } from '../../../models/states.models'
//angular material imports
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'ng-newcompany',
  templateUrl: './companyNew.component.html',
  styleUrls: ['./companyNew.component.css'],
  providers: [ CompanyService ]
})
export class CompanyNewComponent {
  company: CompanyModel;
  id: string;
  states : States

  constructor(private companyService : CompanyService, public snackbar: MatSnackBar) { 
      this.states = new States();
      this.company = new CompanyModel()
  }
    saveCompany(){
       this.companyService.saveNewCompany(this.company).subscribe(data => this.company = data,
                                                                  error => this.snackbar.open(error, "",{duration: 5000}),
                                                                  () => this.snackbar.open("Updated Successfully", "", {duration: 5000}));
    }
}