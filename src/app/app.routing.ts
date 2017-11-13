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
  { path: '**', component: NotFoundComponent }
  

  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent, outlet: 'login'},
  // { path: 'layout', component: LayoutComponent, outlet: 'layout' },
  // { path: 'employees', component: EmployeesComponent, outlet: 'layout'  },
  // { path: 'companies', component: CompaniesComponent, outlet: 'layout'  },
  // { path: 'timesheet', component: TimesheetComponent, outlet: 'layout'  },
  // { path: 'dashboard', component: DashboardComponent, outlet: 'layout'  },
  // { path: 'companyEdit/:id', component: CompanyEditComponent, outlet: 'layout'  },
  // { path: 'companyNew', component: CompanyNewComponent, outlet: 'layout'  },
  // { path: 'employeesList/:id', component: EmployeesListComponent, outlet: 'layout'  },
  // { path: 'employeeEdit/:cid/:eid', component: EmployeeEditComponent, outlet: 'layout'  },
  // { path: 'employeeNew/:cid', component: EmployeeNewComponent, outlet: 'layout'  },
  // { path: '**', component: NotFoundComponent, outlet: 'layout'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }