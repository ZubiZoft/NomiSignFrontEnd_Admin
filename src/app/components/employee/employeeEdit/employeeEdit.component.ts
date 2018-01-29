//angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
//rxjs imports
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/finally'
//custom imports
import { EmployeeService } from '../../../services/employee.service'
import { EmployeeModel } from '../../../models/employee.model'
import { OpenBatchModel } from '../../../models/openbatch.model'
import { UploadService } from '../../../services/upload.service'
import { FileModel } from '../../../models/file.model'
import { CompanyModel } from '../../../models/company.model'
import { CompanyService } from '../../../services/company.service'
import { UserService } from '../../../services/user.service'
import { FileUploader } from 'ng2-file-upload'
//angular material imports
import { MatSnackBar } from '@angular/material'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

import {Output, EventEmitter, ViewChild, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'ng-employee-edit',
  templateUrl: './employeeEdit.component.html',
  styleUrls: ['./employeeEdit.component.css'],
  providers: [EmployeeService, CompanyService]
})
export class EmployeeEditComponent implements OnInit {
  //userStatus: any;
  employee: EmployeeModel;
  companyId: string;
  employeeID: string;
  allowEmployeeEdit: boolean = false;
  cellNumberVerificationStatus: string;
  openbatch: OpenBatchModel;
  company: CompanyModel;
  isPromiseDone: boolean = false;
  files: any[];
  uploader: FileUploader = new FileUploader({ });
  hasBaseDropZoneOver: boolean = false;
  smallScreen: boolean = false;
  isFileUploading: boolean = false;

  @ViewChild('inputFile') nativeInputFile: ElementRef;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, public snackbar: MatSnackBar, private uploadService: UploadService,
      private companyService: CompanyService, private userService: UserService, private _location: Location, private breakpointObserver: BreakpointObserver) {
      //this.userStatus = userService.getUserType();

      const layoutChanges = breakpointObserver.observe([
        '(max-width: 780px)',
      ]);
      
      layoutChanges.subscribe(result => {
        this.smallScreen = result.matches;
      });
      // get company Id
      route.params.subscribe((params: Params) => {
          this.companyId = params['cid'];
      });
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  selectFile() {
    this.nativeInputFile.nativeElement.click();
}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.employeeService.getEmployeeById(params.get('cid'), params.get('eid')))
      .subscribe(data => {
          this.employee = data;
          if (this.employee.EmployeeStatus == 1) this.allowEmployeeEdit = true;
        this.isPromiseDone = true;
          });

      // Need ApiKey from Company
    this.route.paramMap
        .switchMap((params: ParamMap) => this.companyService.getCompanyById(params.get('cid')))
        .subscribe(data => {
            this.company = data;
            this.openbatch = new OpenBatchModel();
            this.openbatch.CompanyRfc = this.company.CompanyRFC;
            this.openbatch.ApiKey = this.company.ApiKey;
            this.openbatch.FileCount = 1;
            this.isPromiseDone = true;
        });
  }

  verifyNewEmployeeCellNumber() {

      console.log("verify employee cell")
      this.route.paramMap
          .switchMap((params: ParamMap) =>
              this.employeeService.verifyNewEmployeeCellNumber(this.employee).finally(() =>
              { return false; }))
          .subscribe(data => { this.cellNumberVerificationStatus = data; return false; },
          error => this.cellNumberVerificationStatus = error
          );

  }

  updateEmployeeFiles() {
      if (this.files && this.files.length > 0) {
          this.uploadEmployeeFiles();
      }
      else {
          alert('No Files Selected');
      }
  }

  updateEmployee() {
    this.isFileUploading = true;
      // only update if employee is editable
      if (this.allowEmployeeEdit && this.cellNumberVerificationStatus == "Success") {
          this.employee.EmployeeStatus = 5; // allows for 1 time update of employees created by bulk editor
          this.route.paramMap
              .switchMap((params: ParamMap) => this.employeeService.updateEmployeeDetails(params.get('eid'), this.employee).finally(() => { this.snackbar.open("sucessfully updated", "", { duration: 5000 }); }))
              .subscribe(data => { this.employee = data; if (!this.files) { this._location.back(); } },
              error => this.snackbar.open(error, "", { duration: 5000 }))

      if (this.uploader && this.uploader.queue.length > 0) {
              this.uploadEmployeeFiles();
          }
      }
      else
      {
          alert("Cell Phone has not been verified");
      } 
  }

  uploadEmployeeFiles() {
      
          this.companyService.getCompanyById(this.employee.CompanyId).subscribe(data => {
              this.uploadService.openBatch(this.companyId, this.openbatch).subscribe(data => {
                  let batchId = data.BatchId;
                  for (let fileIem of this.uploader.queue)
                      this.uploadFile(fileItem.file.rawFile, batchId);
                  };
                  this.uploadService.closeBatch(batchId).subscribe(data => {
                      this._location.back();
                      //success from closed batch
                  })
              })
          })
      this.isFileUploading = false;
  }

  onFileSelect(event) {
    this.files = event;
  }

  uploadFile(file, batchId): any {
    let uploadFile = new FileModel()
    uploadFile.EmployeeCURP = this.employee.CRUP;
    //uploadFile.CompanyId = this.companyId;
    uploadFile.FileName = file.name;
    var reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      uploadFile.PDFContent = reader.result.split(',')[1] //removes data:image...   
      this.uploadService.addFile(uploadFile, batchId).subscribe(data => data) //success from file uploads
    }
  }
}