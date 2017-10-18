//angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
//rxjs imports
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/finally'
//custom imports
import { CompanyUsersService } from '../../../services/companyUser.service'
import { CompanyUserModel } from '../../../models/companyUser.model'
//angular material imports
import { MdSnackBar } from '@angular/material'

@Component({
  selector: 'ng-company-users-new',
  templateUrl: './companyUsersNew.component.html',
  styleUrls: ['./companyUsersNew.component.css'],
  providers: [ CompanyUsersService ]
})
export class CompanyUsersNewComponent implements OnInit {
  companyUser: CompanyUserModel;
  companyId: string;
  employeeID: string;

  constructor(private route: ActivatedRoute, private companyUserService: CompanyUsersService, public snackbar: MdSnackBar) { 
      this.companyUser = new CompanyUserModel()
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.companyId = params['cid'];
    })
  }

  saveNewCompanyUser(){
    this.companyUser.CompanyId = +this.companyId
     this.route.paramMap
     .switchMap((params: ParamMap) => this.companyUserService.saveNewCompanyUser(this.companyUser).finally(() => this.snackbar.open("sucessfully updated", "",{duration: 5000}) ))
     .subscribe(data => this.companyUser = data,
                error => this.snackbar.open(error, "",{duration: 5000}))
  }
}