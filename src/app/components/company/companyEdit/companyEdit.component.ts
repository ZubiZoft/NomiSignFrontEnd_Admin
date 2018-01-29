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
import { UploadService } from '../../../services/upload.service'
import { FileModel } from '../../../models/file.model'
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
  files: any[];

  constructor(private route: ActivatedRoute, private companyService: CompanyService, public snackbar: MatSnackBar, private uploadService: UploadService) { 
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

  addCompanyDocument() {
      if (this.files && this.files.length > 0) {
          for (let file of this.files) {
              this.uploadFile(file, this.company.CompanyId);
          };
      }
      else {
          alert("No file selected");
      }

      return false;
  }

  uploadFile(file, companyId): any {
      let uploadFile = new FileModel();
      uploadFile.FileName = file.name;
      var reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = (e) => {
          uploadFile.PDFContent = reader.result.split(',')[1] //removes data:image...   
          this.uploadService.addcompanyfile(uploadFile, companyId).subscribe(data => data) //success from file uploads
      }
  }

  onFileSelect(event) {
      this.files = event;
      this.company.NewEmployeeDocument = this.files[0].name;
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