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
import { MatSnackBar } from '@angular/material'

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
  isPromiseDone: boolean = false;
  constructor(private route: ActivatedRoute, private companyService: CompanyService, public snackbar: MatSnackBar) { 
      this.states = new States();
  }

  ngOnInit(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.companyService.getCompanyById(params.get('cid')))
    .subscribe(data => {
      this.company = data
      this.isPromiseDone = true
    });
  }

  updateCompany(){
    console.log("updating company")
     this.route.paramMap
     .switchMap((params: ParamMap) => this.companyService.updateCompanyDetails(params.get('cid'), this.company).finally(()=> this.snackbar.open("Updated successfully", "", {duration: 5000})))
     .subscribe(
       data =>  this.company = data,
       error => this.snackbar.open(error, "", {duration: 5000}),
       
    );
  }
}