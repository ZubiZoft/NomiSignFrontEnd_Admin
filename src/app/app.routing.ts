import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { CAuthGuard } from './services/route-guards/authguard-cAdmin.service'
import { GAuthGuard } from './services/route-guards/authguard-GAdmin.service'
import { UAuthGuard } from './services/route-guards/authguard-user.service'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeesComponent, canActivate: [UAuthGuard] },
  { path: 'companies', component: CompaniesComponent, canActivate: [GAuthGuard] },
  // { path: 'timesheet', component: TimesheetComponent, canActivate: [UAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [GAuthGuard] },
  { path: 'companyEdit/:id', component: CompanyEditComponent, canActivate: [CAuthGuard] },
  { path: 'companyNew', component: CompanyNewComponent, canActivate: [GAuthGuard] },
  { path: 'employeesList/:id', component: EmployeesListComponent, canActivate: [UAuthGuard] },
  { path: 'employeeEdit/:cid/:eid', component: EmployeeEditComponent, canActivate: [UAuthGuard] },
  { path: 'employeeNew/:cid', component: EmployeeNewComponent, canActivate: [CAuthGuard] },
  { path: 'companyusers', component: CompanyUsersComponent, canActivate: [GAuthGuard] },
  { path: 'companyusers/:cid', component: CompanyUsersListComponent, canActivate: [CAuthGuard] },
  { path: 'companyuser/:cid/:cuid', component: CompanyUsersEditComponent, canActivate: [CAuthGuard] },
  { path: 'companyuserNew/:cid', component: CompanyUsersNewComponent, canActivate: [GAuthGuard] },
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