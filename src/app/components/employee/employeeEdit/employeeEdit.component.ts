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
import { UploadService } from '../../../services/upload.service'
import { FileModel } from '../../../models/file.model'
import { CompanyService } from '../../../services/company.service'
import { UserService } from '../../../services/user.service'
//angular material imports
import { MatSnackBar } from '@angular/material'

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
  isPromiseDone: boolean = false;
  files: any[];

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, public snackbar: MatSnackBar, private uploadService: UploadService,
      private companyService: CompanyService, private userService: UserService, private _location: Location) {
      //this.userStatus = userService.getUserType();

      // get company Id
      route.params.subscribe((params: Params) => {
          this.companyId = params['cid'];
      });
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.employeeService.getEmployeeById(params.get('cid'), params.get('eid')))
      .subscribe(data => {
        this.employee = data;
        this.isPromiseDone = true;
      });
  }

  updateEmployee() {
    //this.route.paramMap
    //    .switchMap((params: ParamMap) => this.employeeService.updateEmployeeDetails(params.get('eid'), this.employee).finally(() => { this.snackbar.open("sucessfully updated", "", { duration: 5000 });}))
    //    .subscribe(data => { this.employee = data; if (!this.files) { this._location.back(); } },
    //  error => this.snackbar.open(error, "", { duration: 5000 }))

      if (this.files && this.files.length > 0) {
          this.companyService.getCompanyById(this.employee.CompanyId).subscribe(data => {
              this.uploadService.openBatch(data.CompanyRFC).subscribe(data => {
                  let batchId = data.BatchId;
                  for (let file of this.files)
                  {
                      this.uploadFile(file, batchId);
                  };
                  this.uploadService.closeBatch(batchId).subscribe(data => {
                      console.log('closed'); this._location.back();
                      //success from closed batch
                  })
              })
          })

      }
      else {
          alert('No Files Selected');
      }
  }

  onFileSelect(event) {
    this.files = event;
  }

  uploadFile(file, batchId): any {
    let uploadFile = new FileModel()
    uploadFile.EmployeeCURP = this.employee.CURP;
    //uploadFile.CompanyId = this.companyId;
    uploadFile.FileName = file.name;
    var reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      uploadFile.Content = reader.result.split(',')[1] //removes data:image...   
      this.uploadService.addFile(uploadFile, batchId).subscribe(data => data) //success from file uploads
    }
  }
}