//angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
//angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MdSidenavModule, MdCardModule, MdListModule, MdIconModule, MdSelectModule, MdToolbarModule, MdMenuModule, MdSnackBarModule, MdDialogModule } from '@angular/material';
//custom imports
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component'
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
import { GlobalAdminNavbarComponent } from './components/navbars/globalAdmin/global-admin.navbar.component'
import { CompanyAdminNavbarComponent } from './components/navbars/companyAdmin/company-admin.navbar.component'
import { UserNavbarComponent } from './components/navbars/user/user.navbar.component'

import { UserService } from './services/user.service'
import { AuthService } from './services/auth.service'
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
    ListFilterPipe,
    GlobalAdminNavbarComponent,
    CompanyAdminNavbarComponent,
    UserNavbarComponent
  ],
  imports: [
    BrowserModule,
    MdCardModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdSidenavModule,
    MdListModule,
    MdIconModule,
    MdSelectModule,
    MdToolbarModule,
    MdSnackBarModule,
    MdMenuModule,
    AppRoutingModule,
    MdDialogModule,
  ],
  providers: [ UserService, AuthService, CAdminAuthGuard, GAdminAuthGuard, UserAuthGuard ],
  bootstrap: [AppComponent],
  entryComponents: [ LoginAlertDialog ]
})
export class AppModule { }
