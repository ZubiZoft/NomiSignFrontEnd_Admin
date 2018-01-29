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
import { FileUploader } from 'ng2-file-upload'
//angular material imports
import { MatSnackBar } from '@angular/material'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

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
  uploader: FileUploader = new FileUploader({ });
  hasBaseDropZoneOver: boolean = false;
  smallScreen : boolean = false
  isFileUploading: boolean = false;

  constructor(private route: ActivatedRoute, private companyService: CompanyService, public snackbar: MatSnackBar,
             private uploadService: UploadService, private breakpointObserver: BreakpointObserver) { 
      this.states = new States();

    const layoutChanges = breakpointObserver.observe([
      '(max-width: 780px)',
    ]);
    
    layoutChanges.subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  ngOnInit(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.companyService.getCompanyById(params.get('cid')))
    .subscribe(data => {
      this.company = data
      this.isPromiseDone = true
    });
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  addCompanyDocument() {
    this.isFileUploading = true;
    
      if (this.files && this.files.length > 0) {
          for (let file of this.files) {
              this.uploadFile(file, this.company.CompanyId);
          };
      }
      else {
          alert("No file selected");
      }
     this.snackbar.open("Uploaded Successfully", "", {duration: 5000})
     this.isFileUploading = false;
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
      console.log(event)
      if (this.uploader.queue.length > 1){
        this.uploader.queue.splice(0,1)
      }
      this.files = event;
      this.company.NewEmployeeDocument = this.files[0].name;
  }


  updateCompany(){    
     this.route.paramMap
     .switchMap((params: ParamMap) => this.companyService.updateCompanyDetails(params.get('cid'), this.company))
     .subscribe(
       data =>  { this.company = data; this.snackbar.open("Updated Successfully", "", {duration: 5000}) },
       error => this.snackbar.open(error, "", {duration: 5000}),       
    );
  }
}