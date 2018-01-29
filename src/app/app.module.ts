//angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
//angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatSidenavModule, MatCardModule, MatListModule, MatIconModule, MatSelectModule, MatToolbarModule, MatMenuModule, MatSnackBarModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout'
//custom imports
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component'
import { AccountComponent } from './components/account/account.component'
import { EmployeesComponent } from './components/employee/employees/employees.component'
import { CompaniesComponent } from './components/company/companies/companies.component'
import { TimesheetComponent } from './components/timesheet/timesheet.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { NotFoundComponent } from './components/notfound/notfound.component'
import { CompanyEditComponent } from './components/company/companyEdit/companyEdit.component'
import { CompanyNewComponent } from './components/company/companyNew/companyNew.component'
import { EmployeesListComponent } from './components/employee/employeesList/employeesList.component'
import { EmployeeEditComponent } from './components/employee/employeeEdit/employeeEdit.component'
import { EmployeeNewComponent } from './components/employee/employeeNew/employeeNew.component'
import { AlertComponent } from './components/alert/alert.component'
import { CompanyUsersComponent } from './components/companyuser/companyUsers/companyUsers.component'
import { CompanyUsersListComponent } from './components/companyuser/companyUsersList/companyUsersList.component'
import { CompanyUsersEditComponent } from './components/companyuser/companyUsersEdit/companyUsersEdit.component'
import { CompanyUsersNewComponent } from './components/companyuser/companyUsersNew/companyUsersNew.component'
import { LoginAlertDialog } from './components/login/login.component'
import { RefusedDocumentAlertDialog } from './components/documentList/documentList.component'
import { GlobalAdminNavbarComponent } from './components/navbars/globalAdmin/global-admin.navbar.component'
import { DocumentListComponent } from './components/documentList/documentList.component'
import { CompanyAdminNavbarComponent } from './components/navbars/companyAdmin/company-admin.navbar.component'
import { UserNavbarComponent } from './components/navbars/user/user.navbar.component'
import { InputFile } from './components/fileupload.component' 

import { FileUploadModule } from 'ng2-file-upload'

import { UserService } from './services/user.service'
import { AuthService } from './services/auth.service'
import { UploadService } from './services/upload.service'
import { DocumentService } from './services/documents.service'
import { CAdminAuthGuard, GAdminAuthGuard, UserAuthGuard } from './services/authguard.service'

import { ListFilterPipe } from './pipes/list-filter.pipe'

import { AppRoutingModule } from './app.routing'

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    CompaniesComponent,
    TimesheetComponent,
    DashboardComponent,
    DocumentListComponent,
    NotFoundComponent,
    CompanyEditComponent,
    CompanyNewComponent,
    EmployeesListComponent,
    EmployeeEditComponent,
    EmployeeNewComponent,
    LoginComponent,
    AlertComponent,
    CompanyUsersComponent,
    CompanyUsersListComponent,
    CompanyUsersEditComponent,
    CompanyUsersNewComponent,
    LoginAlertDialog,
    RefusedDocumentAlertDialog,
    ListFilterPipe,
    GlobalAdminNavbarComponent,
    CompanyAdminNavbarComponent,
    UserNavbarComponent,
    AccountComponent,
    InputFile
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatMenuModule,
    AppRoutingModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FileUploadModule,
    LayoutModule
  ],
  providers: [ UserService, AuthService, CAdminAuthGuard, GAdminAuthGuard, UserAuthGuard, UploadService, DocumentService ],
  bootstrap: [AppComponent],
  entryComponents: [LoginAlertDialog, RefusedDocumentAlertDialog ]
})
export class AppModule { }
