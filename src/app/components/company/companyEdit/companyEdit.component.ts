//angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
//rxjs imports
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/finally'
//custom imports
import { CompanyService } from '../../../services/company.service'
import { CompanyModel } from '../../../models/company.model'
import { States } from '../../../models/states.models'
//angular material imports
import { MdSnackBar } from '@angular/material'

@Component({
  selector: 'ng-company',
  templateUrl: './companyEdit.component.html',
  styleUrls: ['./companyEdit.component.css'],
  providers: [ CompanyService ]
})
export class CompanyEditComponent implements OnInit {
  company: CompanyModel;
  id: string;
  states : States

  constructor(private route: ActivatedRoute, private companyService: CompanyService, public snackbar: MdSnackBar) { 
      this.states = new States();
  }

  ngOnInit(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.companyService.getCompanyById(params.get('id')))
    .subscribe(data => this.company = data);
  }

  updateCompany(){
    console.log("updating company")
     this.route.paramMap
     .switchMap((params: ParamMap) => this.companyService.updateCompanyDetails(params.get('id'), this.company).finally(()=> this.snackbar.open("Updated successfully", "", {duration: 5000})))
     .subscribe(
       data => this.company = data,
       error => this.snackbar.open(error, "", {duration: 5000}),
       
    );
  }
}