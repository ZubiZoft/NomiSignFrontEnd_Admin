import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './components/account/account.component';
import {LoginComponent} from './components/login/login.component';
import {EmployeesComponent} from './components/employee/employees/employees.component';
import {CompaniesComponent} from './components/company/companies/companies.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NotFoundComponent} from './components/notfound/notfound.component';
import {CompanyEditComponent} from './components/company/companyEdit/companyEdit.component';
import {CompanyNewComponent} from './components/company/companyNew/companyNew.component';
import {RegisteredComponent} from './components/employee/employeeFilters/registered/registered.component';
import {UnregisteredComponent} from './components/employee/employeeFilters/unregistered/unregistered.component';
import {EmployeeEditComponent} from './components/employee/employeeEdit/employeeEdit.component';
import {CompanyUsersComponent} from './components/companyuser/companyUsers/companyUsers.component';
import {CompanyUsersListComponent} from './components/companyuser/companyUsersList/companyUsersList.component';
import {CompanyUsersEditComponent} from './components/companyuser/companyUsersEdit/companyUsersEdit.component';
import {CompanyUsersNewComponent} from './components/companyuser/companyUsersNew/companyUsersNew.component';
import {CAdminAuthGuard, GAdminAuthGuard, UserAuthGuard} from './services/authguard.service';
import {NewEmployeesComponent} from './components/employee/employeeFilters/new-employees/new-employees.component';
import {UnsignedReceiptsComponent} from './components/receipts/receiptsFilters/unsigned-receipts/unsigned-receipts.component';
import {DeniedReceiptsComponent} from './components/receipts/receiptsFilters/denied-receipts/denied-receipts.component';
import {SearchEmployeesComponent} from './components/employee/employeeFilters/search-employees/search-employees.component';
import {SearchReceiptsComponent} from './components/receipts/receiptsFilters/search-receipts/search-receipts.component';
import {InactiveEmployeesComponent} from './components/employee/employeeFilters/inactive-employees/inactive-employees.component';
import {DocumentViewerComponent} from './components/document-viewer/document-viewer.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {ValidatorComponent} from './components/validator/validator.component';
import {GlobalSearchComponent} from './components/global-search/global-search.component';
import {DashboardsAdminComponent} from './components/dashboards-admin/dashboards-admin.component';
import {CompanyListReceiptsComponent} from './components/receipts/company-list-receipts/company-list-receipts.component';

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'resetaccount/:uid', component: AccountComponent},
    {path: 'companies', component: CompaniesComponent, canActivate: [GAdminAuthGuard]},
    {path: 'validator', component: ValidatorComponent, canActivate: [UserAuthGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [GAdminAuthGuard]},
    {path: 'companyEdit/:cid', component: CompanyEditComponent, canActivate: [CAdminAuthGuard]},
    {path: 'companyNew', component: CompanyNewComponent, canActivate: [GAdminAuthGuard]},
    {path: 'changePassword', component: ChangePasswordComponent, canActivate: [UserAuthGuard]},
    {path: 'globalSearch', component: GlobalSearchComponent, canActivate: [UserAuthGuard]},
    {path: 'home/:cid', component: DashboardsAdminComponent, canActivate: [UserAuthGuard]},

    {path: 'employees', component: EmployeesComponent, canActivate: [GAdminAuthGuard]},
    {path: 'employees/:cid/new', component: NewEmployeesComponent, canActivate: [UserAuthGuard]},
    {path: 'employees/:cid/unregistered', component: UnregisteredComponent, canActivate: [UserAuthGuard]},
    {path: 'employees/:cid/registered', component: RegisteredComponent, canActivate: [UserAuthGuard]},
    {path: 'employees/:cid/inactive', component: InactiveEmployeesComponent, canActivate: [UserAuthGuard]},
    {path: 'employees/:cid/search', component: SearchEmployeesComponent, canActivate: [UserAuthGuard]},

    {path: 'receipts', component: CompanyListReceiptsComponent, canActivate: [GAdminAuthGuard]},
    {path: 'receipts/:cid/rejected', component: DeniedReceiptsComponent, canActivate: [UserAuthGuard]},
    {path: 'receipts/:cid/unsigned', component: UnsignedReceiptsComponent, canActivate: [UserAuthGuard]},
    {path: 'receipts/:cid/search', component: SearchReceiptsComponent, canActivate: [UserAuthGuard]},

    {path: 'document-viewer/:cid/:id', component: DocumentViewerComponent, canActivate: [UserAuthGuard]},

    {path: 'employeeEdit/:cid/:eid', component: EmployeeEditComponent, canActivate: [UserAuthGuard]},
    {path: 'companyusers', component: CompanyUsersComponent, canActivate: [GAdminAuthGuard]},
    {path: 'companyusers/:cid', component: CompanyUsersListComponent, canActivate: [CAdminAuthGuard]},
    {path: 'companyuser/:cid/:cuid', component: CompanyUsersEditComponent, canActivate: [CAdminAuthGuard]},
    {path: 'companyuserNew/:cid', component: CompanyUsersNewComponent, canActivate: [CAdminAuthGuard]},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
