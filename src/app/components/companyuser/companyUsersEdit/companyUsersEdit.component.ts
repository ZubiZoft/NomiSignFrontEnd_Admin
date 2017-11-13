//angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
//rxjs imports
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/finally'
//custom imports
import { UserStatus } from '../../../models/userstatus.models'
import { CompanyUsersService } from '../../../services/companyUser.service'
import { CompanyUserModel } from '../../../models/companyUser.model'
//angular material imports
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'ng-company-users-edit',
  templateUrl: './companyUsersEdit.component.html',
  styleUrls: ['./companyUsersEdit.component.css'],
  providers: [ CompanyUsersService ]
})
export class CompanyUsersEditComponent implements OnInit {
  companyUser: CompanyUserModel;
  companyId: string;
  employeeID: string;
  userstatus: UserStatus;
  isPromiseDone: boolean = false;

  constructor(private route: ActivatedRoute, private companyUserService: CompanyUsersService, public snackbar: MatSnackBar) { 
      this.userstatus = new UserStatus();
  }

  ngOnInit(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.companyUserService.getCompanyUserById(params.get('cid'), params.get('cuid')))
    .subscribe(data => {
      this.companyUser = data
      this.isPromiseDone = true;
    });
  }

  updateCompanyUser(){
     this.route.paramMap
     .switchMap((params: ParamMap) => this.companyUserService.updateCompanyUserDetails(params.get('cuid'), this.companyUser).finally(() => this.snackbar.open("sucessfully updated", "",{duration: 5000}) ))
     .subscribe(data => this.companyUser = data,
                error => this.snackbar.open(error, "",{duration: 5000}))
  }
}