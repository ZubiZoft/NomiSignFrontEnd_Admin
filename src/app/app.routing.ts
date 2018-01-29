import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './components/account/account.component'
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
import { CompanyUsersComponent } from './components/companyuser/companyUsers/companyUsers.component'
import { CompanyUsersListComponent } from './components/companyuser/companyUsersList/companyUsersList.component'
import { DocumentListComponent } from './components/documentList/documentList.component'
import { CompanyUsersEditComponent } from './components/companyuser/companyUsersEdit/companyUsersEdit.component'
import { CompanyUsersNewComponent } from './components/companyuser/companyUsersNew/companyUsersNew.component'
import { CAdminAuthGuard, GAdminAuthGuard, UserAuthGuard } from './services/authguard.service'

const routes: Routes = [
    { path: 'account/:uid', component: AccountComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: 'account/:uid', redirectTo: '/account/:uid', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeesComponent, canActivate: [UserAuthGuard] },
  { path: 'companies', component: CompaniesComponent, canActivate: [GAdminAuthGuard] },
  // { path: 'timesheet', component: TimesheetComponent, canActivate: [UAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [GAdminAuthGuard] },
  { path: 'companyEdit/:cid', component: CompanyEditComponent, canActivate: [CAdminAuthGuard] },
  { path: 'companyNew', component: CompanyNewComponent, canActivate: [GAdminAuthGuard] },
  { path: 'employeesList/:cid', component: EmployeesListComponent, canActivate: [UserAuthGuard] },
  { path: 'employeeEdit/:cid/:eid', component: EmployeeEditComponent, canActivate: [UserAuthGuard] },
  { path: 'employeeNew/:cid', component: EmployeeNewComponent, canActivate: [UserAuthGuard] },
  { path: 'companyusers', component: CompanyUsersComponent, canActivate: [GAdminAuthGuard] }, //change
  { path: 'companyusers/:cid', component: CompanyUsersListComponent, canActivate: [CAdminAuthGuard] },
  { path: 'companyuser/:cid/:cuid', component: CompanyUsersEditComponent, canActivate: [CAdminAuthGuard] },
  { path: 'companyuserNew/:cid', component: CompanyUsersNewComponent, canActivate: [CAdminAuthGuard] }, //change
  { path: 'documentUnapprovedList/:sts/:cid', component: DocumentListComponent, canActivate: [UserAuthGuard] },
  { path: 'documentRejectList/:sts/:cid', component: DocumentListComponent, canActivate: [UserAuthGuard] },
  { path: '**', component: NotFoundComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }