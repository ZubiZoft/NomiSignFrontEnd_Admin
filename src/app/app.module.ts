import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule, MatCheckboxModule, MatInputModule, MatSidenavModule, MatCardModule, MatListModule, MatIconModule,
    MatSelectModule, MatToolbarModule, MatMenuModule, MatSnackBarModule, MatDatepickerModule,
    MatDialogModule, MatProgressSpinnerModule, MatNativeDateModule
} from '@angular/material';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {AccountComponent} from './components/account/account.component';
import {EmployeesComponent} from './components/employee/employees/employees.component';
import {CompaniesComponent} from './components/company/companies/companies.component';
import {TimesheetComponent} from './components/timesheet/timesheet.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NotFoundComponent} from './components/notfound/notfound.component';
import {CompanyEditComponent, PurchaseHistoryDialog} from './components/company/companyEdit/companyEdit.component';
import {CompanyNewComponent} from './components/company/companyNew/companyNew.component';
import {EmployeesListComponent} from './components/employee/employeesList/employeesList.component';
import {
    EditEmployeeAlertDialog, EmployeeEditComponent
} from './components/employee/employeeEdit/employeeEdit.component';
import {EmployeeNewComponent} from './components/employee/employeeNew/employeeNew.component';
import {AlertComponent} from './components/alert/alert.component';
import {CompanyUsersComponent} from './components/companyuser/companyUsers/companyUsers.component';
import {CompanyUsersListComponent} from './components/companyuser/companyUsersList/companyUsersList.component';
import {CompanyUsersEditComponent} from './components/companyuser/companyUsersEdit/companyUsersEdit.component';
import {CompanyUsersNewComponent} from './components/companyuser/companyUsersNew/companyUsersNew.component';
import {LoginAlertDialog, ForgotPasswordDialog} from './components/login/login.component';
import {UploadedAlertDialog} from './components/company/companyEdit/companyEdit.component';
import {RefusedDocumentAlertDialog} from './components/documentList/documentList.component';
import {GlobalAdminNavbarComponent} from './components/navbars/globalAdmin/global-admin.navbar.component';
import {DocumentListComponent} from './components/documentList/documentList.component';
import {CompanyAdminNavbarComponent} from './components/navbars/companyAdmin/company-admin.navbar.component';
import {UserNavbarComponent} from './components/navbars/user/user.navbar.component';
import {InputFile} from './components/fileupload.component';
import {VerifyNotAlertDialog} from './components/receipts/receiptsFilters/unsigned-receipts/unsigned-receipts.component';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {UploadService} from './services/upload.service';
import {DocumentService} from './services/documents.service';
import {EmployeeService} from './services/employee.service';
import {CAdminAuthGuard, GAdminAuthGuard, UserAuthGuard} from './services/authguard.service';
import {ListFilterPipe} from './pipes/list-filter.pipe';
import {SortByPipe} from './pipes/sort-by.pipe';
import {AppRoutingModule} from './app.routing';
import {NewEmployeesComponent} from './components/employee/employeeFilters/new-employees/new-employees.component';
import {UnsignedReceiptsComponent} from './components/receipts/receiptsFilters/unsigned-receipts/unsigned-receipts.component';
import {
    ChangeStatusAlertDialog,
    DeniedReceiptsComponent
} from './components/receipts/receiptsFilters/denied-receipts/denied-receipts.component';
import {SearchEmployeesComponent} from './components/employee/employeeFilters/search-employees/search-employees.component';
import {SearchReceiptsComponent} from './components/receipts/receiptsFilters/search-receipts/search-receipts.component';
import {InactiveEmployeesComponent} from './components/employee/employeeFilters/inactive-employees/inactive-employees.component';
import {CustomBrowserXhr} from './services/custom-browser-xhr';
import {DownloadComponent} from './components/download-component';
import {DownloadDocReportComponent} from './components/download-doc-report';
import {DownloadReportComponent} from './components/download-report';
import {DocumentViewerComponent, Nom151DialogComponent} from './components/document-viewer/document-viewer.component';
import {SafeUrlPipe} from './pipes/safe-url.pipe';
import {SessionTimeoutDialogComponent} from './components/session-timeout-dialog/session-timeout-dialog.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {CompanyUsersService} from './services/companyUser.service';
import {CompanyService} from './services/company.service';
import {ValidatorComponent} from './components/validator/validator.component';
import {GlobalSearchComponent} from './components/global-search/global-search.component';
import {DashboardsAdminComponent} from './components/dashboards-admin/dashboards-admin.component';
import {EmployeesByStatusDashboard} from './components/dashboards-admin/EmployeesByStatusDashboard';
import {ReceiptsByStatusDashboard} from './components/dashboards-admin/ReceiptsByStatusDashboard';
import {SignaturesStatusDashboard} from './components/dashboards-admin/SignaturesStatusDashboard';
import {DaysStatusDashboard} from './components/dashboards-admin/DaysStatusDashboard';
import {RejectedEmployeesByPeriod} from './components/dashboards-admin/RejectedEmployeesByPeriod';
import {DashboardsService} from './services/dashboards.service';
import { EmployeeBarComponent } from './components/employee/employee-bar/employee-bar.component';
import { UnregisteredComponent } from './components/employee/employeeFilters/unregistered/unregistered.component';
import { RegisteredComponent } from './components/employee/employeeFilters/registered/registered.component';
import { CompanyListReceiptsComponent } from './components/receipts/company-list-receipts/company-list-receipts.component';
import { ReceiptsBarComponent } from './components/receipts/receipts-bar/receipts-bar.component';

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
        ForgotPasswordDialog,
        UploadedAlertDialog,
        EditEmployeeAlertDialog,
        RefusedDocumentAlertDialog,
        VerifyNotAlertDialog,
        GlobalAdminNavbarComponent,
        CompanyAdminNavbarComponent,
        UserNavbarComponent,
        AccountComponent,
        InputFile,
        NewEmployeesComponent,
        UnsignedReceiptsComponent,
        DeniedReceiptsComponent,
        SearchEmployeesComponent,
        SearchReceiptsComponent,
        InactiveEmployeesComponent,
        DownloadComponent,
        DownloadDocReportComponent,
        DownloadReportComponent,
        SortByPipe,
        ListFilterPipe,
        ChangeStatusAlertDialog,
        PurchaseHistoryDialog,
        DocumentViewerComponent,
        SafeUrlPipe,
        SessionTimeoutDialogComponent,
        ChangePasswordComponent,
        ValidatorComponent,
        GlobalSearchComponent,
        Nom151DialogComponent,
        DashboardsAdminComponent,
        EmployeesByStatusDashboard,
        ReceiptsByStatusDashboard,
        SignaturesStatusDashboard,
        DaysStatusDashboard,
        RejectedEmployeesByPeriod,
        EmployeeBarComponent,
        UnregisteredComponent,
        RegisteredComponent,
        CompanyListReceiptsComponent,
        ReceiptsBarComponent
    ],
    imports: [
        MatNativeDateModule,
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
        MatDatepickerModule,
        MatNativeDateModule,
        CommonModule
    ],
    providers: [UserService, AuthService, CAdminAuthGuard, GAdminAuthGuard, UserAuthGuard, UploadService, DocumentService,
        CustomBrowserXhr, EmployeeService, CompanyUsersService, CompanyService, DashboardsService],
    bootstrap: [AppComponent],
    entryComponents: [LoginAlertDialog, RefusedDocumentAlertDialog, UploadedAlertDialog, EditEmployeeAlertDialog, VerifyNotAlertDialog,
        ChangeStatusAlertDialog, SessionTimeoutDialogComponent, PurchaseHistoryDialog, Nom151DialogComponent, ForgotPasswordDialog]
})
export class AppModule {
}
