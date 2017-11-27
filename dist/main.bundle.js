webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".toolbar{\r\n    background-color: #2cbbc3;\r\n    padding: 5px\r\n}\r\n\r\n.sidenav{\r\n  float:left;\r\n    padding: 5px;\r\n    height: 100vh;\r\n    min-width:210px;\r\n    width:11%;\r\n    background-color: #eeeeee;\r\n    border-right: 1px solid grey;\r\n}\r\n\r\na {\r\n    padding: 5px 10px;\r\n    text-decoration: none;\r\n    margin-top: 10px;\r\n    display: inline-block;\r\n  }\r\n  a:visited, a:link {\r\n    color: #607D8B;\r\n  }\r\n  a:hover {\r\n    color: #039be5;\r\n    background-color: #CFD8DC;\r\n  }\r\n  a.active {\r\n    color: #039be5;\r\n  }\r\n  \r\n  .content {\r\n      width: 75%;\r\n      margin: 0 auto;\r\n  }\r\n\r\n\r\n  .mat-form-field{\r\n    width:400px\r\n  }\r\n\r\n.example-sidenav-fab-container md-sidenav {\r\n  max-width: 200px;\r\n}\r\n\r\n.example-sidenav-fab-container .mat-sidenav-content,\r\n.example-sidenav-fab-container md-sidenav {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  overflow: visible;\r\n}\r\n\r\n.example-scrolling-content {\r\n  overflow: auto;\r\n}\r\n\r\n.example-fab {\r\n  position: absolute;\r\n  right: 20px;\r\n  bottom: 10px;\r\n}\r\n\r\n\r\n.example-container {\r\n  width: 500px;\r\n  height: 300px;\r\n  border: 1px solid rgba(0, 0, 0, 0.5);\r\n}\r\n\r\n.example-sidenav-content {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  height: 100%;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n}\r\n\r\n.example-sidenav {\r\n  padding: 20px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <div class=\"mobileHeaderTitle centerText\" *ngIf=\"user\">\r\n    <img style=\"max-height:60px; position:absolute;left:12%\" src=\"../assets/images/Nomi_Sign-12-1-1.png\" class=\"mobileHeaderLogo\"/>\r\n    <h1 style=\"line-height:50px\" class=\"mobileHeaderText\"> Admin Page</h1>\r\n  </div>\r\n  <div *ngIf=\"user\">\r\n    <global-admin-navbar *ngIf=\"user.UserType === 3\"></global-admin-navbar>\r\n    <company-admin-navbar *ngIf=\"user.UserType === 2\"></company-admin-navbar>\r\n    <user-navbar *ngIf=\"user.UserType === 1\"></user-navbar>\r\n  </div>\r\n  <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_settings_service__ = __webpack_require__("../../../../../src/app/services/settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports




var AppComponent = (function () {
    function AppComponent(router, settingsService, userService) {
        var _this = this;
        this.router = router;
        this.settingsService = settingsService;
        this.userService = userService;
        this.url = this.router.url;
        settingsService.getSystemSettings().subscribe(function (data) { return _this.appName = data[0].ProductName; });
        this.getCurrentUser();
        userService.userUpdated.subscribe(function (value) {
            _this.getCurrentUser();
        });
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.getCurrentUser = function () {
        var user = this.userService.getUser();
        if (user) {
            this.user = user;
        }
        else {
            this.user = null;
        }
    };
    AppComponent.prototype.setTitle = function (title) {
        this.title = title;
    };
    AppComponent.prototype.logout = function () {
        this.userService.clearUser();
        this.user = null;
        this.router.navigate(['/login']);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_3__services_settings_service__["a" /* SettingsService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_settings_service__["a" /* SettingsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__ = __webpack_require__("../../../../../src/app/components/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_account_account_component__ = __webpack_require__("../../../../../src/app/components/account/account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_employee_employees_employees_component__ = __webpack_require__("../../../../../src/app/components/employee/employees/employees.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_company_companies_companies_component__ = __webpack_require__("../../../../../src/app/components/company/companies/companies.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_timesheet_timesheet_component__ = __webpack_require__("../../../../../src/app/components/timesheet/timesheet.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/components/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_notfound_notfound_component__ = __webpack_require__("../../../../../src/app/components/notfound/notfound.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_company_companyEdit_companyEdit_component__ = __webpack_require__("../../../../../src/app/components/company/companyEdit/companyEdit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_company_companyNew_companyNew_component__ = __webpack_require__("../../../../../src/app/components/company/companyNew/companyNew.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_employee_employeesList_employeesList_component__ = __webpack_require__("../../../../../src/app/components/employee/employeesList/employeesList.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_employee_employeeEdit_employeeEdit_component__ = __webpack_require__("../../../../../src/app/components/employee/employeeEdit/employeeEdit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_employee_employeeNew_employeeNew_component__ = __webpack_require__("../../../../../src/app/components/employee/employeeNew/employeeNew.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_alert_alert_component__ = __webpack_require__("../../../../../src/app/components/alert/alert.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_companyuser_companyUsers_companyUsers_component__ = __webpack_require__("../../../../../src/app/components/companyuser/companyUsers/companyUsers.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_companyuser_companyUsersList_companyUsersList_component__ = __webpack_require__("../../../../../src/app/components/companyuser/companyUsersList/companyUsersList.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_companyuser_companyUsersEdit_companyUsersEdit_component__ = __webpack_require__("../../../../../src/app/components/companyuser/companyUsersEdit/companyUsersEdit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_companyuser_companyUsersNew_companyUsersNew_component__ = __webpack_require__("../../../../../src/app/components/companyuser/companyUsersNew/companyUsersNew.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_documentList_documentList_component__ = __webpack_require__("../../../../../src/app/components/documentList/documentList.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_navbars_globalAdmin_global_admin_navbar_component__ = __webpack_require__("../../../../../src/app/components/navbars/globalAdmin/global-admin.navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_navbars_companyAdmin_company_admin_navbar_component__ = __webpack_require__("../../../../../src/app/components/navbars/companyAdmin/company-admin.navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_navbars_user_user_navbar_component__ = __webpack_require__("../../../../../src/app/components/navbars/user/user.navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_fileupload_component__ = __webpack_require__("../../../../../src/app/components/fileupload.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__services_upload_service__ = __webpack_require__("../../../../../src/app/services/upload.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__services_documents_service__ = __webpack_require__("../../../../../src/app/services/documents.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__services_authguard_service__ = __webpack_require__("../../../../../src/app/services/authguard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pipes_list_filter_pipe__ = __webpack_require__("../../../../../src/app/pipes/list-filter.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__app_routing__ = __webpack_require__("../../../../../src/app/app.routing.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//angular imports




//angular material


//custom imports
































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_employee_employees_employees_component__["a" /* EmployeesComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_company_companies_companies_component__["a" /* CompaniesComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_timesheet_timesheet_component__["a" /* TimesheetComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_24__components_documentList_documentList_component__["a" /* DocumentListComponent */],
            __WEBPACK_IMPORTED_MODULE_13__components_notfound_notfound_component__["a" /* NotFoundComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_company_companyEdit_companyEdit_component__["a" /* CompanyEditComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_company_companyNew_companyNew_component__["a" /* CompanyNewComponent */],
            __WEBPACK_IMPORTED_MODULE_16__components_employee_employeesList_employeesList_component__["a" /* EmployeesListComponent */],
            __WEBPACK_IMPORTED_MODULE_17__components_employee_employeeEdit_employeeEdit_component__["a" /* EmployeeEditComponent */],
            __WEBPACK_IMPORTED_MODULE_18__components_employee_employeeNew_employeeNew_component__["a" /* EmployeeNewComponent */],
            __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__["b" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_19__components_alert_alert_component__["a" /* AlertComponent */],
            __WEBPACK_IMPORTED_MODULE_20__components_companyuser_companyUsers_companyUsers_component__["a" /* CompanyUsersComponent */],
            __WEBPACK_IMPORTED_MODULE_21__components_companyuser_companyUsersList_companyUsersList_component__["a" /* CompanyUsersListComponent */],
            __WEBPACK_IMPORTED_MODULE_22__components_companyuser_companyUsersEdit_companyUsersEdit_component__["a" /* CompanyUsersEditComponent */],
            __WEBPACK_IMPORTED_MODULE_23__components_companyuser_companyUsersNew_companyUsersNew_component__["a" /* CompanyUsersNewComponent */],
            __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__["a" /* LoginAlertDialog */],
            __WEBPACK_IMPORTED_MODULE_24__components_documentList_documentList_component__["b" /* RefusedDocumentAlertDialog */],
            __WEBPACK_IMPORTED_MODULE_34__pipes_list_filter_pipe__["a" /* ListFilterPipe */],
            __WEBPACK_IMPORTED_MODULE_25__components_navbars_globalAdmin_global_admin_navbar_component__["a" /* GlobalAdminNavbarComponent */],
            __WEBPACK_IMPORTED_MODULE_26__components_navbars_companyAdmin_company_admin_navbar_component__["a" /* CompanyAdminNavbarComponent */],
            __WEBPACK_IMPORTED_MODULE_27__components_navbars_user_user_navbar_component__["a" /* UserNavbarComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_account_account_component__["a" /* AccountComponent */],
            __WEBPACK_IMPORTED_MODULE_28__components_fileupload_component__["a" /* InputFile */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MatCardModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MatCheckboxModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["i" /* MatInputModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["i" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["n" /* MatSidenavModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["j" /* MatListModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["h" /* MatIconModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["m" /* MatSelectModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["p" /* MatSnackBarModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["k" /* MatMenuModule */],
            __WEBPACK_IMPORTED_MODULE_35__app_routing__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["f" /* MatDialogModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["l" /* MatProgressSpinnerModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_29__services_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_30__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_33__services_authguard_service__["a" /* CAdminAuthGuard */], __WEBPACK_IMPORTED_MODULE_33__services_authguard_service__["b" /* GAdminAuthGuard */], __WEBPACK_IMPORTED_MODULE_33__services_authguard_service__["c" /* UserAuthGuard */], __WEBPACK_IMPORTED_MODULE_31__services_upload_service__["a" /* UploadService */], __WEBPACK_IMPORTED_MODULE_32__services_documents_service__["a" /* DocumentService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_7__components_login_login_component__["a" /* LoginAlertDialog */], __WEBPACK_IMPORTED_MODULE_24__components_documentList_documentList_component__["b" /* RefusedDocumentAlertDialog */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_account_account_component__ = __webpack_require__("../../../../../src/app/components/account/account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__ = __webpack_require__("../../../../../src/app/components/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_employee_employees_employees_component__ = __webpack_require__("../../../../../src/app/components/employee/employees/employees.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_company_companies_companies_component__ = __webpack_require__("../../../../../src/app/components/company/companies/companies.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/components/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_notfound_notfound_component__ = __webpack_require__("../../../../../src/app/components/notfound/notfound.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_company_companyEdit_companyEdit_component__ = __webpack_require__("../../../../../src/app/components/company/companyEdit/companyEdit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_company_companyNew_companyNew_component__ = __webpack_require__("../../../../../src/app/components/company/companyNew/companyNew.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_employee_employeesList_employeesList_component__ = __webpack_require__("../../../../../src/app/components/employee/employeesList/employeesList.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_employee_employeeEdit_employeeEdit_component__ = __webpack_require__("../../../../../src/app/components/employee/employeeEdit/employeeEdit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_employee_employeeNew_employeeNew_component__ = __webpack_require__("../../../../../src/app/components/employee/employeeNew/employeeNew.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_companyuser_companyUsers_companyUsers_component__ = __webpack_require__("../../../../../src/app/components/companyuser/companyUsers/companyUsers.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_companyuser_companyUsersList_companyUsersList_component__ = __webpack_require__("../../../../../src/app/components/companyuser/companyUsersList/companyUsersList.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_documentList_documentList_component__ = __webpack_require__("../../../../../src/app/components/documentList/documentList.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_companyuser_companyUsersEdit_companyUsersEdit_component__ = __webpack_require__("../../../../../src/app/components/companyuser/companyUsersEdit/companyUsersEdit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_companyuser_companyUsersNew_companyUsersNew_component__ = __webpack_require__("../../../../../src/app/components/companyuser/companyUsersNew/companyUsersNew.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_authguard_service__ = __webpack_require__("../../../../../src/app/services/authguard.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var routes = [
    { path: 'account/:eid', component: __WEBPACK_IMPORTED_MODULE_2__components_account_account_component__["a" /* AccountComponent */] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    //{ path: 'account/:uid', redirectTo: '/account/:uid', pathMatch: 'full' },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__["b" /* LoginComponent */] },
    { path: 'employees', component: __WEBPACK_IMPORTED_MODULE_4__components_employee_employees_employees_component__["a" /* EmployeesComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__services_authguard_service__["c" /* UserAuthGuard */]] },
    { path: 'companies', component: __WEBPACK_IMPORTED_MODULE_5__components_company_companies_companies_component__["a" /* CompaniesComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__services_authguard_service__["b" /* GAdminAuthGuard */]] },
    // { path: 'timesheet', component: TimesheetComponent, canActivate: [UAuthGuard] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_6__components_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__services_authguard_service__["b" /* GAdminAuthGuard */]] },
    { path: 'companyEdit/:cid', component: __WEBPACK_IMPORTED_MODULE_8__components_company_companyEdit_companyEdit_component__["a" /* CompanyEditComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__services_authguard_service__["a" /* CAdminAuthGuard */]] },
    { path: 'companyNew', component: __WEBPACK_IMPORTED_MODULE_9__components_company_companyNew_companyNew_component__["a" /* CompanyNewComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__services_authguard_service__["b" /* GAdminAuthGuard */]] },
    { path: 'employeesList/:cid', component: __WEBPACK_IMPORTED_MODULE_10__components_employee_employeesList_employeesList_component__["a" /* EmployeesListComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__services_authguard_service__["c" /* UserAuthGuard */]] },
    { path: 'employeeEdit/:cid/:eid', component: __WEBPACK_IMPORTED_MODULE_11__components_employee_employeeEdit_employeeEdit_component__["a" /* EmployeeEditComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__services_authguard_service__["c" /* UserAuthGuard */]] },
    { path: 'employeeNew/:cid', component: __WEBPACK_IMPORTED_MODULE_12__components_employee_employeeNew_employeeNew_component__["a" /* EmployeeNewComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__services_authguard_service__["c" /* UserAuthGuard */]] },
    { path: 'companyusers', component: __WEBPACK_IMPORTED_MODULE_13__components_companyuser_companyUsers_companyUsers_component__["a" /* CompanyUsersComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__services_authguard_service__["b" /* GAdminAuthGuard */]] },
    { path: 'companyusers/:cid', component: __WEBPACK_IMPORTED_MODULE_14__components_companyuser_companyUsersList_companyUsersList_component__["a" /* CompanyUsersListComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__services_authguard_service__["a" /* CAdminAuthGuard */]] },
    { path: 'companyuser/:cid/:cuid', component: __WEBPACK_IMPORTED_MODULE_16__components_companyuser_companyUsersEdit_companyUsersEdit_component__["a" /* CompanyUsersEditComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__services_authguard_service__["a" /* CAdminAuthGuard */]] },
    { path: 'companyuserNew/:cid', component: __WEBPACK_IMPORTED_MODULE_17__components_companyuser_companyUsersNew_companyUsersNew_component__["a" /* CompanyUsersNewComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__services_authguard_service__["a" /* CAdminAuthGuard */]] },
    { path: 'documentUnapprovedList/:sts/:cid', component: __WEBPACK_IMPORTED_MODULE_15__components_documentList_documentList_component__["a" /* DocumentListComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__services_authguard_service__["c" /* UserAuthGuard */]] },
    { path: 'documentRejectList/:sts/:cid', component: __WEBPACK_IMPORTED_MODULE_15__components_documentList_documentList_component__["a" /* DocumentListComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__services_authguard_service__["c" /* UserAuthGuard */]] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_7__components_notfound_notfound_component__["a" /* NotFoundComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ "../../../../../src/app/components/account/account.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/account/account.component.html":
/***/ (function(module, exports) {

module.exports = "Account Info"

/***/ }),

/***/ "../../../../../src/app/components/account/account.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AccountComponent = (function () {
    function AccountComponent() {
    }
    //systemSettings
    //isPromiseDone: boolean = false
    AccountComponent.prototype.ngOnInit = function () {
    };
    return AccountComponent;
}());
AccountComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-account',
        template: __webpack_require__("../../../../../src/app/components/account/account.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/account/account.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AccountComponent);

//# sourceMappingURL=account.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/alert/alert.component.html":
/***/ (function(module, exports) {

module.exports = "test"

/***/ }),

/***/ "../../../../../src/app/components/alert/alert.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AlertComponent = (function () {
    function AlertComponent() {
    }
    return AlertComponent;
}());
AlertComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-alert',
        template: __webpack_require__("../../../../../src/app/components/alert/alert.component.html"),
    })
], AlertComponent);

//# sourceMappingURL=alert.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/company/companies/companies.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "body {\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/company/companies/companies.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-spinner style=\"margin:0 auto;\" *ngIf=\"!isPromiseDone\"></mat-spinner>\r\n<div style=\"max-height: 100vh; overflow-y: auto\" *ngIf=\"companies\">\r\n  <button mat-button routerLink=\"/companyNew\" class=\"leftFloat\">\r\n    <mat-icon mat-list-icon>add</mat-icon>\r\n    <mat-icon mat-list-icon>business</mat-icon>\r\n  </button>\r\n\r\n\r\n  <h1 i18n=\"CompaniesHeader\" class=\"centerText\">Companies</h1>\r\n  <div style=\"margin-top:10px;  line-height:1.25;\" class=\"centerText\">\r\n    <mat-icon style=\"vertical-align:middle\">search</mat-icon>\r\n    <input #search placeholder=\"Search\" (keyup)=\"0\" class=\"inputSearchBox\"/>\r\n  </div>\r\n  <mat-list class=\"centeredList\">\r\n\r\n    <mat-list-item *ngFor=\"let company of (companies | listfilter: search.value)\" style=\"border-bottom: 1px solid grey; cursor: pointer\"\r\n      [routerLink]=\"['/companyEdit', company.CompanyId]\" routerLinkActive=\"active\">\r\n      <mat-icon mat-list-icon>business</mat-icon>\r\n      <h4 mat-line>{{company.CompanyName}}</h4>\r\n      <p mat-line>{{ company.CompanyRFC }} </p>\r\n\r\n    </mat-list-item>\r\n    \r\n  </mat-list>\r\n  <br/>\r\n  <br/>  <br/>  <br/>  <br/>\r\n  <br/>  <br/>  <br/>  <br/>\r\n  <br/>  <br/>  <br/>\r\n</div>\r\n<div class=\"centerText\" *ngIf=\"!companies && isPromiseDone\" i18n=\"message | message letting the user know there are no companies@@NoCompaniesMessage\"> \r\n    There are no companies to view\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/company/companies/companies.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompaniesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_company_service__ = __webpack_require__("../../../../../src/app/services/company.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports


var CompaniesComponent = (function () {
    function CompaniesComponent(companyService) {
        var _this = this;
        this.isPromiseDone = false;
        companyService.getCompanies().subscribe(function (data) {
            _this.companies = data;
            _this.isPromiseDone = true;
        });
        //companyService.getCompanies().subscribe(data => this.companies = data)
    }
    return CompaniesComponent;
}());
CompaniesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-companies',
        template: __webpack_require__("../../../../../src/app/components/company/companies/companies.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/company/companies/companies.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__services_company_service__["a" /* CompanyService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_company_service__["a" /* CompanyService */]) === "function" && _a || Object])
], CompaniesComponent);

var _a;
//# sourceMappingURL=companies.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/company/companyEdit/companyEdit.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n  \r\n  .example-full-width {\r\n    display:flow-root;\r\n  }\r\n\r\n  /* ignore parent width */\r\n  .mat-form-field{\r\n        width:auto;\r\n        padding:10px 25px 10px 25px;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/company/companyEdit/companyEdit.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-spinner style=\"margin:0 auto;\" *ngIf=\"!isPromiseDone\"></mat-spinner>\r\n<div style=\"max-height: 100vh; overflow-y: auto\" class=\"centeredList\">\r\n    <form class=\"example-form\" *ngIf=\"company\">\r\n        <mat-form-field class=\"example-full-width\">\r\n            <input matInput placeholder=\"Company ID\" disabled value=\"{{company.CompanyId}}\" i18n-placeholder=\"input field | input field which displays the companies id@@CompanyIdInput\">\r\n        </mat-form-field>\r\n        <mat-form-field class=\"example-full-width\">\r\n            <input matInput placeholder=\"Company Name\" value=\"{{company.CompanyName}}\" [(ngModel)]=\"company.CompanyName\" name=\"companyName\"\r\n                i18n-placeholder=\"@@CompanyNameInput\">\r\n        </mat-form-field>\r\n        <mat-form-field class=\"example-full-width\">\r\n            <input matInput placeholder=\"Address\" value=\"{{company.Address1}}\" [(ngModel)]=\"company.Address1\" name=\"companyAddress1\" i18n-placeholder=\"@@CompanyAdressInput\">\r\n        </mat-form-field>\r\n        <mat-form-field class=\"example-full-width\" style=\"margin-top:-40px\">\r\n            <input matInput value=\"{{company.Address2}}\" [(ngModel)]=\"company.Address2\" name=\"companyAddress2\" i18n-placeholder=\"@@CompanyAdressInput\">\r\n        </mat-form-field>\r\n        <table class=\"example-full-width\" cellspacing=\"0\">\r\n            <tr>\r\n                <td>\r\n                    <mat-form-field class=\"example-full-width\">\r\n                        <input matInput placeholder=\"City\" value=\"{{company.City}}\" [(ngModel)]=\"company.City\" name=\"companyCity\" i18n-placeholder=\"@@CompanyCityInput\">\r\n                    </mat-form-field>\r\n                </td>\r\n                <td>\r\n                    <mat-select placeholder=\"State\" [(ngModel)]=\"company.State\" name=companyState style=\"padding: 10px 15px 14px 15px\" i18n-placeholder=\"@@CompanyStateInput\">\r\n                        <mat-option *ngFor=\"let state of states.codes\" [value]=\"state\">\r\n                            {{ state }}\r\n                        </mat-option>\r\n                    </mat-select>\r\n\r\n                    <!-- <input matInput placeholder=\"State\" value=\"{{company.State}}\"> -->\r\n                    <!-- <md-form-field class=\"example-full-width\"></md-form-field></td> -->\r\n            </tr>\r\n        </table>\r\n        <mat-form-field class=\"example-full-width\">\r\n            <input matInput placeholder=\"Zip Code\" value=\"{{company.PostalCode}}\" [(ngModel)]=\"company.PostalCode\" name=\"companyPostCode\"\r\n                i18n-placeholder=\"@@CompanyPostalCode\">\r\n        </mat-form-field>\r\n        <mat-form-field class=\"example-full-width\">\r\n            <input matInput placeholder=\"RFC\" value=\"{{company.CompanyRFC}}\" [(ngModel)]=\"company.CompanyRFC\" name=\"companyRfc\" i18n-placeholder=\"@@CompanyRFCInput\">\r\n        </mat-form-field>\r\n    </form>\r\n\r\n    <button mat-raised-button color=\"primary\" (click)=updateCompany() i18n=\"@@UpdateButton\"> Update </button>\r\n    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/company/companyEdit/companyEdit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally__ = __webpack_require__("../../../../rxjs/add/operator/finally.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_company_service__ = __webpack_require__("../../../../../src/app/services/company.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_states_models__ = __webpack_require__("../../../../../src/app/models/states.models.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports


//rxjs imports


//custom imports


//angular material imports

var CompanyEditComponent = (function () {
    function CompanyEditComponent(route, companyService, snackbar) {
        this.route = route;
        this.companyService = companyService;
        this.snackbar = snackbar;
        this.isPromiseDone = false;
        this.states = new __WEBPACK_IMPORTED_MODULE_5__models_states_models__["a" /* States */]();
    }
    CompanyEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.companyService.getCompanyById(params.get('cid')); })
            .subscribe(function (data) {
            _this.company = data;
            _this.isPromiseDone = true;
        });
    };
    CompanyEditComponent.prototype.updateCompany = function () {
        var _this = this;
        console.log("updating company");
        this.route.paramMap
            .switchMap(function (params) { return _this.companyService.updateCompanyDetails(params.get('cid'), _this.company).finally(function () { return _this.snackbar.open("Updated successfully", "", { duration: 5000 }); }); })
            .subscribe(function (data) { return _this.company = data; }, function (error) { return _this.snackbar.open(error, "", { duration: 5000 }); });
    };
    return CompanyEditComponent;
}());
CompanyEditComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-company',
        template: __webpack_require__("../../../../../src/app/components/company/companyEdit/companyEdit.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/company/companyEdit/companyEdit.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_4__services_company_service__["a" /* CompanyService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_company_service__["a" /* CompanyService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__angular_material__["o" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_material__["o" /* MatSnackBar */]) === "function" && _c || Object])
], CompanyEditComponent);

var _a, _b, _c;
//# sourceMappingURL=companyEdit.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/company/companyNew/companyNew.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n  \r\n  .example-full-width {\r\n    display:flow-root;\r\n  }\r\n\r\n  /* ignore parent width */\r\n  .mat-form-field{\r\n        width:auto;\r\n        padding:10px 25px 10px 25px;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/company/companyNew/companyNew.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"max-height: 100vh; overflow-y: auto\" class=\"centeredList\">\r\n    <form class=\"example-form\">\r\n        <mat-form-field class=\"example-full-width\">\r\n            <input matInput placeholder=\"Company Name\" [(ngModel)]=\"company.CompanyName\" name=companyName i18n-placeholder=\"input field | input field which contains the company's name@@CompanyNameInput\">\r\n        </mat-form-field>\r\n        <mat-form-field class=\"example-full-width\">\r\n            <input matInput placeholder=\"Address\" [(ngModel)]=\"company.Address1\" name=companyAddress1 i18n-placeholder=\"input field | input field which contains the company's address@@CompanyAdressInput\">\r\n        </mat-form-field>\r\n        <mat-form-field class=\"example-full-width\" style=\"margin-top:-40px\">\r\n            <input matInput [(ngModel)]=\"company.Address2\" name=companyAddress2 i18n-placeholder=\"input field | input field which contains the company's address@@CompanyAdressInput\">\r\n        </mat-form-field>\r\n\r\n        <table class=\"example-full-width\" cellspacing=\"0\">\r\n            <tr>\r\n                <td>\r\n                    <mat-form-field class=\"example-full-width\">\r\n                        <input matInput placeholder=\"City\" [(ngModel)]=\"company.City\" name=companyCity i18n-placeholder=\"input field | input field which contains the companys' city@@CompanyCityInput\">\r\n                    </mat-form-field>\r\n                </td>\r\n                <td>\r\n                    <mat-select placeholder=\"State\" [(ngModel)]=\"company.State\" name=companyState style=\"padding: 10px 15px 14px 15px\" i18n-placeholder=\"input field | input field which contains the companys's state@@CompanyStateInput\">\r\n                        <mat-option *ngFor=\"let state of states.codes\" [value]=\"state\">\r\n                            {{ state }} \r\n                        </mat-option>\r\n                    </mat-select>\r\n                    <!--  {{company.State}} -->\r\n                    <!-- <input matInput placeholder=\"State\" value=\"{{company.State}}\"> -->\r\n                    <!-- <md-form-field class=\"example-full-width\"></md-form-field></td> -->\r\n            </tr>\r\n        </table>\r\n        <mat-form-field class=\"example-full-width\">\r\n            <input matInput placeholder=\"Zip Code\" [(ngModel)]=\"company.PostalCode\" name=companyZipCode i18n-placeholder=\"input field | input field which contains the company's zip code@@CompanyPostalCode\">\r\n        </mat-form-field>\r\n        <mat-form-field class=\"example-full-width\">\r\n            <input matInput placeholder=\"RFC\" [(ngModel)]=\"company.CompanyRFC\" name=companyRFC i18n-placeholder=\"input field | input field which contains the company's RFC code@@CompanyRFCInput\">\r\n        </mat-form-field>\r\n    </form>\r\n\r\n    <button mat-raised-button color=\"primary\" (click)=saveCompany() i18n=\"action | button which will save the company info@@SaveButton\"> Save </button>\r\n    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/company/companyNew/companyNew.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_company_model__ = __webpack_require__("../../../../../src/app/models/company.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_company_service__ = __webpack_require__("../../../../../src/app/services/company.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_states_models__ = __webpack_require__("../../../../../src/app/models/states.models.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports

//custom imports



//angular material imports

var CompanyNewComponent = (function () {
    function CompanyNewComponent(companyService, snackbar) {
        this.companyService = companyService;
        this.snackbar = snackbar;
        this.states = new __WEBPACK_IMPORTED_MODULE_3__models_states_models__["a" /* States */]();
        this.company = new __WEBPACK_IMPORTED_MODULE_1__models_company_model__["a" /* CompanyModel */]();
    }
    CompanyNewComponent.prototype.saveCompany = function () {
        var _this = this;
        this.companyService.saveNewCompany(this.company).subscribe(function (data) { return _this.company = data; }, function (error) { return _this.snackbar.open(error, "", { duration: 5000 }); }, function () { return _this.snackbar.open("Successfully updated", "", { duration: 5000 }); });
    };
    return CompanyNewComponent;
}());
CompanyNewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-newcompany',
        template: __webpack_require__("../../../../../src/app/components/company/companyNew/companyNew.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/company/companyNew/companyNew.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_2__services_company_service__["a" /* CompanyService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_company_service__["a" /* CompanyService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["o" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["o" /* MatSnackBar */]) === "function" && _b || Object])
], CompanyNewComponent);

var _a, _b;
//# sourceMappingURL=companyNew.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/companyuser/companyUsers/companyUsers.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "body {\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/companyuser/companyUsers/companyUsers.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-spinner style=\"margin:0 auto;\" *ngIf=\"!isPromiseDone\"></mat-spinner>\r\n\r\n<div style=\"max-height: 80vh; overflow-y: auto\" *ngIf=\"companies\">\r\n  \r\n <h1 i18n=\"message | telling user to select a company from the list to view the employees@@PickCompanyViewEmployeesMsg\" class=\"centerText\">Select Company to View Company Users</h1>\r\n <div style=\"margin-top:10px;  line-height:1.25;\" class=\"centerText\">\r\n       <mat-icon style=\"vertical-align:middle\">search</mat-icon>\r\n        <input #search placeholder=\"Search\" (keyup)=\"0\" class=\"inputSearchBox\"/>\r\n  </div>\r\n  <mat-list class=\"centeredList\">\r\n    <mat-list-item *ngFor=\"let company of (companies | listfilter: search.value)\" style=\"border-bottom: 1px solid grey;  cursor: pointer\" [routerLink]=\"['/companyusers', company.CompanyId]\"\r\n      routerLinkActive=\"active\">\r\n      <mat-icon mat-list-icon>business</mat-icon>\r\n      <h4 mat-line>{{company.CompanyName}}</h4>\r\n      <p mat-line> Date to go here </p>\r\n\r\n    </mat-list-item>\r\n  </mat-list>\r\n  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>\r\n</div>\r\n<div class=\"centerText\" *ngIf=\"!companies && isPromiseDone\" i18n=\"@@NoCompaniesMessage\"> \r\n    There are no companies to view\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/companyuser/companyUsers/companyUsers.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyUsersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_company_service__ = __webpack_require__("../../../../../src/app/services/company.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CompanyUsersComponent = (function () {
    function CompanyUsersComponent(companyService) {
        var _this = this;
        this.isPromiseDone = false;
        companyService.getCompanies().subscribe(function (data) {
            _this.companies = data;
            _this.isPromiseDone = true;
        });
    }
    return CompanyUsersComponent;
}());
CompanyUsersComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-company-users',
        template: __webpack_require__("../../../../../src/app/components/companyuser/companyUsers/companyUsers.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/companyuser/companyUsers/companyUsers.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__services_company_service__["a" /* CompanyService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_company_service__["a" /* CompanyService */]) === "function" && _a || Object])
], CompanyUsersComponent);

var _a;
//# sourceMappingURL=companyUsers.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/companyuser/companyUsersEdit/companyUsersEdit.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n  \r\n  .example-full-width {\r\n    display:flow-root;\r\n  }\r\n\r\n  /* ignore parent width */\r\n  .mat-form-field{\r\n        width:auto;\r\n        padding:10px 25px 10px 25px;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/companyuser/companyUsersEdit/companyUsersEdit.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-spinner style=\"margin:0 auto;\" *ngIf=\"!isPromiseDone\"></mat-spinner>\r\n\r\n<div style=\"max-height: 75vh; overflow-y: auto\"  class=\"centeredList\">\r\n  <form class=\"example-form\" *ngIf=\"companyUser\">\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput required placeholder=\"Email Address\" value=\"{{companyUser.EmailAddress}}\" [(ngModel)]=\"companyUser.EmailAddress\" name=companyUserEmail\r\n        i18n-placeholder=\"form | field displaying the company user's email@@CompanyUserEmail\">\r\n    </mat-form-field>\r\n      <!--<mat-form-field class=\"example-full-width\">\r\n          <input matInput required placeholder=\"Password\" value=\"{{companyUser.PasswordHash}}\" [(ngModel)]=\"companyUser.PasswordHash\" name=companyPasswordHash\r\n                 i18n-placeholder=\"form | field displaying the company user's password@@CompanyUserPasswordHash\">\r\n      </mat-form-field>-->\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput placeholder=\"Display Name\" value=\"{{companyUser.DisplayName}}\" [(ngModel)]=\"companyUser.DisplayName\" name=companyUserDisplayName\r\n        i18n-placeholder=\"form | field displaying the company user's display name@@CompanyUserDisplayName\">\r\n    </mat-form-field>\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput placeholder=\"Phone Number\" value=\"{{companyUser.PhoneNumber}}\" [(ngModel)]=\"companyUser.PhoneNumber\" name=companyUserPhoneNumber\r\n        i18n-placeholder=\"form | field displaying the company user's phone number@@CompanyUserPhoneNumber\">\r\n    </mat-form-field>\r\n      <mat-form-field class=\"example-full-width\">\r\n          <mat-select  [(ngModel)]=\"companyUser.UserType\" title=\"User Type\" placeholder=\"User Type\" name=companyUserType i18n-placeholder=\"@@UserTypeInput\">\r\n              <mat-option *ngFor=\"let type of usertype.codes\" [value]=\"type\">\r\n                  {{ type }}\r\n              </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      <p align=\"right\"><b>Created By:</b>{{companyUser.CreatedByUserName}} - <b>Last Login:</b>{{companyUser.LastLogin}} - <b>Status:</b>{{companyUser.UserStatus}} </p>\r\n</form>\r\n\r\n  <button mat-raised-button color=\"primary\" (click)=updateCompanyUser() i18n=\"@@UpdateButton\"> Update </button>\r\n  <br/><br/>\r\n    \r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/companyuser/companyUsersEdit/companyUsersEdit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyUsersEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__ = __webpack_require__("../../../../rxjs/add/operator/finally.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_usertype_models__ = __webpack_require__("../../../../../src/app/models/usertype.models.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_companyUser_service__ = __webpack_require__("../../../../../src/app/services/companyUser.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports



//rxjs imports


//custom imports


//angular material imports

var CompanyUsersEditComponent = (function () {
    function CompanyUsersEditComponent(route, companyUserService, snackbar, _location) {
        this.route = route;
        this.companyUserService = companyUserService;
        this.snackbar = snackbar;
        this._location = _location;
        this.isPromiseDone = false;
        this.usertype = new __WEBPACK_IMPORTED_MODULE_5__models_usertype_models__["a" /* UserType */]();
    }
    CompanyUsersEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.companyUserService.getCompanyUserById(params.get('cid'), params.get('cuid')); })
            .subscribe(function (data) {
            _this.companyUser = data;
            _this.isPromiseDone = true;
        });
    };
    CompanyUsersEditComponent.prototype.updateCompanyUser = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.companyUserService.updateCompanyUserDetails(params.get('cuid'), _this.companyUser).finally(function () { return _this.snackbar.open("sucessfully updated", "", { duration: 5000 }); }); })
            .subscribe(function (data) { _this.companyUser = data; _this._location.back(); }, function (error) { return _this.snackbar.open(error, "", { duration: 5000 }); });
    };
    return CompanyUsersEditComponent;
}());
CompanyUsersEditComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-company-users-edit',
        template: __webpack_require__("../../../../../src/app/components/companyuser/companyUsersEdit/companyUsersEdit.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/companyuser/companyUsersEdit/companyUsersEdit.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_6__services_companyUser_service__["a" /* CompanyUsersService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__services_companyUser_service__["a" /* CompanyUsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_companyUser_service__["a" /* CompanyUsersService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__angular_material__["o" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_material__["o" /* MatSnackBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _d || Object])
], CompanyUsersEditComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=companyUsersEdit.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/companyuser/companyUsersList/companyUsersList.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n  .example-full-width {\r\n    display:flow-root;\r\n  }\r\n\r\n  /* ignore parent width */\r\n  .mat-form-field{\r\n        width:auto;\r\n        padding:10px 25px 10px 25px;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/companyuser/companyUsersList/companyUsersList.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-spinner style=\"margin:0 auto;\" *ngIf=\"!isPromiseDone\"></mat-spinner>\r\n\r\n<div style=\"max-height: 80vh; overflow-y: auto\" *ngIf=\"companyUsers\">\r\n  <button mat-button [routerLink]=\"['/companyuserNew', companyId]\" class=\"leftFloat\">\r\n  <mat-icon mat-list-icon >add</mat-icon><mat-icon mat-list-icon>account_circle</mat-icon> \r\n</button>\r\n<h1 i18n=\"header | header of the company users section@@CompanyUsersHeader\" class=\"centerText\">Users</h1>\r\n<div style=\"margin-top:10px\" class=\"centerText\">\r\n    <mat-icon style=\"vertical-align:middle\">search</mat-icon>\r\n    <input #search placeholder=\"Search\" (keyup)=\"0\" class=\"inputSearchBox \" />\r\n</div>\r\n\r\n  <mat-list class=\"centeredList\">\r\n    \r\n    <mat-list-item *ngFor=\"let user of (companyUsers | listfilter: search.value)\" style=\"border-bottom: 1px solid grey; cursor: pointer\" [routerLink]=\"['/companyuser', user.CompanyId ,user.UserId]\"\r\n      routerLinkActive=\"active\">\r\n      <mat-icon mat-list-icon><i class=\"material-icons\">account_circle</i></mat-icon>\r\n      <h4 mat-line>{{user.EmailAddress}}</h4>\r\n      <p mat-line> {{user.LastLogin | date}}</p>\r\n\r\n    </mat-list-item>\r\n  </mat-list>\r\n  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>\r\n</div>\r\n<div class=\"centerText\" *ngIf=\"!companyUsers && isPromiseDone\" i18n=\"message | message letting the user know there are no company users@@NoCompanyUsersMessage\"> \r\n    There are no users to view\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/companyuser/companyUsersList/companyUsersList.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyUsersListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_companyUser_service__ = __webpack_require__("../../../../../src/app/services/companyUser.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports


//rxjs imports

//custom imports

var CompanyUsersListComponent = (function () {
    function CompanyUsersListComponent(route, employeeService) {
        var _this = this;
        this.route = route;
        this.employeeService = employeeService;
        this.isPromiseDone = false;
        route.params.subscribe(function (params) {
            _this.companyId = params['cid'];
        });
    }
    CompanyUsersListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.employeeService.getCompanyUsersByCompany(params.get('cid')); })
            .subscribe(function (data) {
            _this.companyUsers = data;
            _this.isPromiseDone = true;
        });
    };
    CompanyUsersListComponent.prototype.updateEmployee = function () {
        //  this.route.paramMap
        //  .switchMap((params: ParamMap) => this.employeeService.updateCompanyDetails(params.get('id'), this.company))
        //  .subscribe(data => this.company = data);
    };
    return CompanyUsersListComponent;
}());
CompanyUsersListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-company-users-list',
        template: __webpack_require__("../../../../../src/app/components/companyuser/companyUsersList/companyUsersList.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/companyuser/companyUsersList/companyUsersList.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_3__services_companyUser_service__["a" /* CompanyUsersService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_companyUser_service__["a" /* CompanyUsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_companyUser_service__["a" /* CompanyUsersService */]) === "function" && _b || Object])
], CompanyUsersListComponent);

var _a, _b;
//# sourceMappingURL=companyUsersList.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/companyuser/companyUsersNew/companyUsersNew.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n  \r\n  .example-full-width {\r\n    display:flow-root;\r\n  }\r\n\r\n  /* ignore parent width */\r\n  .mat-form-field{\r\n        width:auto;\r\n        padding:10px 25px 10px 25px;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/companyuser/companyUsersNew/companyUsersNew.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"max-height: 70vh; overflow-y: auto\" class=\"centeredList\">\r\n  <form class=\"example-form\">\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput placeholder=\"Email Address\" value=\"{{companyUser.EmailAddress}}\" [(ngModel)]=\"companyUser.EmailAddress\" name=companyUserEmail\r\n        i18n-placeholder=\"form | field displaying the company user's email@@CompanyUserEmail\">\r\n    </mat-form-field>\r\n      <mat-form-field class=\"example-full-width\">\r\n          <input type=\"password\" matInput placeholder=\"Password\" value=\"{{companyUser.PasswordHash}}\" [(ngModel)]=\"companyUser.PasswordHash\" name=companyPasswordHash\r\n                 i18n-placeholder=\"form | field displaying the company user's password@@CompanyUserPasswordHash\">\r\n      </mat-form-field>\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput placeholder=\"Display Name\" value=\"{{companyUser.DisplayName}}\" [(ngModel)]=\"companyUser.DisplayName\" name=companyUserDisplayName\r\n        i18n-placeholder=\"form | field displaying the company user's display name@@CompanyUserDisplayName\">\r\n    </mat-form-field>\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput placeholder=\"Phone Number\" value=\"{{companyUser.PhoneNumber}}\" [(ngModel)]=\"companyUser.PhoneNumber\" name=companyUserPhoneNumber\r\n        i18n-placeholder=\"form | field displaying the company user's phone number@@CompanyUserPhoneNumber\">\r\n    </mat-form-field>\r\n      <mat-form-field class=\"example-full-width\">\r\n          <mat-select [(ngModel)]=\"companyUser.UserType\" title=\"User Type\" placeholder=\"User Type\" name=companyUserType i18n-placeholder=\"@@UserTypeInput\">\r\n              <mat-option *ngFor=\"let type of usertype.codes\" [value]=\"type\">\r\n                  {{ type }} \r\n              </mat-option>\r\n          </mat-select>\r\n      </mat-form-field>\r\n  </form>\r\n\r\n  <button mat-raised-button color=\"primary\" (click)=saveNewCompanyUser() i18n=\"@@UpdateButton\"> Save </button>\r\n  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/companyuser/companyUsersNew/companyUsersNew.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyUsersNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__ = __webpack_require__("../../../../rxjs/add/operator/finally.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_usertype_models__ = __webpack_require__("../../../../../src/app/models/usertype.models.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_companyUser_service__ = __webpack_require__("../../../../../src/app/services/companyUser.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_companyUser_model__ = __webpack_require__("../../../../../src/app/models/companyUser.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports



//rxjs imports


//custom imports




//angular material imports

var CompanyUsersNewComponent = (function () {
    function CompanyUsersNewComponent(route, companyUserService, snackbar, _location, userService) {
        this.route = route;
        this.companyUserService = companyUserService;
        this.snackbar = snackbar;
        this._location = _location;
        this.userService = userService;
        this.companyUser = new __WEBPACK_IMPORTED_MODULE_8__models_companyUser_model__["a" /* CompanyUserModel */]();
        this.usertype = new __WEBPACK_IMPORTED_MODULE_5__models_usertype_models__["a" /* UserType */]();
    }
    CompanyUsersNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.companyId = params['cid'];
        });
    };
    CompanyUsersNewComponent.prototype.saveNewCompanyUser = function () {
        var _this = this;
        this.companyUser.CompanyId = +this.companyId;
        var user = this.userService.getUser();
        this.companyUser.CreatedByUserId = user.UserId;
        this.route.paramMap
            .switchMap(function (params) { return _this.companyUserService.saveNewCompanyUser(_this.companyUser); })
            .subscribe(function (data) { _this.companyUser = data; _this._location.back(); }, function (error) { return _this.snackbar.open(error, "", { duration: 5000 }); }, function () { return _this.snackbar.open("Successfully Updated", "", { duration: 5000 }); });
    };
    return CompanyUsersNewComponent;
}());
CompanyUsersNewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-company-users-new',
        template: __webpack_require__("../../../../../src/app/components/companyuser/companyUsersNew/companyUsersNew.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/companyuser/companyUsersNew/companyUsersNew.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_7__services_companyUser_service__["a" /* CompanyUsersService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_7__services_companyUser_service__["a" /* CompanyUsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_companyUser_service__["a" /* CompanyUsersService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_9__angular_material__["o" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__angular_material__["o" /* MatSnackBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_user_service__["a" /* UserService */]) === "function" && _e || Object])
], CompanyUsersNewComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=companyUsersNew.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/dashboard/dashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n  \r\n  .example-full-width {\r\n    display:flow-root;\r\n  }\r\n\r\n  /* ignore parent width */\r\n  .mat-form-field{\r\n        width:auto;\r\n        padding:10px 25px 10px 25px;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-spinner style=\"margin:0 auto;\" *ngIf=\"!isPromiseDone\"></mat-spinner>\r\n<div style=\"max-height: 100vh; overflow-y: auto\" class=\"centeredList\">\r\n    <form class=\"example-form\" *ngIf=\"systemSettings\">\r\n        <mat-form-field class=\"example-full-width\">\r\n            <input matInput placeholder=\"Product Name\" value=\"{{systemSettings.ProductName}}\" [(ngModel)]=\"systemSettings.ProductName\"\r\n                name=\"systemName\" i18n-placeholder=\"input field | input field which contains the companys's product name@@CompanyProductNameInput\">\r\n        </mat-form-field>\r\n        <mat-form-field class=\"example-full-width\">\r\n            <input matInput placeholder=\"Product Icon\" value=\"{{systemSettings.ProductIcon}}\" [(ngModel)]=\"systemSettings.ProductIcon\"\r\n                name=\"systemIcon\" i18n-placeholder=\"input field | input field which contains the companys's product icon@@CompanyProductIconInput\">\r\n        </mat-form-field>\r\n        <mat-form-field class=\"example-full-width\">\r\n            <input matInput placeholder=\"Support Telephone Number\" value=\"{{systemSettings.SupportTelephoneNumber}}\" [(ngModel)]=\"systemSettings.SupportTelephoneNumber\"\r\n                name=\"systemNumber\" i18n-placeholder=\"input field | input field which contains the companys's telephone number@@CompanySupportTelephoneInput\">\r\n        </mat-form-field>\r\n        <mat-form-field class=\"example-full-width\">\r\n            <input matInput placeholder=\"Primary System File Path\" value=\"{{systemSettings.SystemFilePath1}}\" [(ngModel)]=\"systemSettings.SystemFilePath1\"\r\n                name=\"systemFilePath1\" i18n-placeholder=\"input field | input field which contains the companys's primary file path@@CompanyPrimaryFilePathInput\">\r\n        </mat-form-field>\r\n\r\n        <mat-form-field class=\"example-full-width\">\r\n            <input matInput placeholder=\"Backup System File Path\" value=\"{{systemSettings.SystemFilePath2}}\" [(ngModel)]=\"systemSettings.SystemFilePath2\"\r\n                name=\"systemFilePath2\" i18n-placeholder=\"input field | input field which contains the companys's backup file path@@CompanyFilePathBackupInput\">\r\n        </mat-form-field>\r\n    </form>\r\n\r\n    <button mat-raised-button color=\"primary\" (click)=updateSettings() i18n=\"@@UpdateButton\"> Update </button>\r\n    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_settings_service__ = __webpack_require__("../../../../../src/app/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//angular material imports

var DashboardComponent = (function () {
    function DashboardComponent(settingsService, snackBar) {
        var _this = this;
        this.settingsService = settingsService;
        this.snackBar = snackBar;
        this.isPromiseDone = false;
        settingsService.getSystemSettings().subscribe(function (data) {
            _this.systemSettings = data[0];
            _this.isPromiseDone = true;
        });
    }
    DashboardComponent.prototype.updateSettings = function () {
        var _this = this;
        this.settingsService.updateSystemSettings(this.systemSettings).subscribe(function (data) { return _this.systemSettings = data; }, function (error) { return _this.snackBar.open(error, "", { duration: 5000 }); }, function () { return _this.snackBar.open("Successfully Updated", "", { duration: 5000 }); });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-dashboard',
        template: __webpack_require__("../../../../../src/app/components/dashboard/dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/dashboard/dashboard.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_settings_service__["a" /* SettingsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["o" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["o" /* MatSnackBar */]) === "function" && _b || Object])
], DashboardComponent);

var _a, _b;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/documentList/document-alert.dialog.html":
/***/ (function(module, exports) {

module.exports = "<h2 class=\"centerText\" i18n=\"message | a message to let the user refused document details\">\r\n    Details for document ID {{ doc.DocumentId }}:\r\n    \r\n</h2>\r\n\r\n    <table>\r\n        <tr>\r\n            <td><b>Employee Name:</b></td>\r\n            <td> {{ doc.EmployeeName }} </td>\r\n        </tr>\r\n        <tr>\r\n            <td><b>Pay Period:</b></td>\r\n            <td> {{ doc.PayperiodDate }}</td>\r\n        </tr>\r\n        <tr>\r\n            <td><b>Upload Time:</b></td>\r\n            <td> {{ doc.UploadTime }}</td>\r\n        </tr>\r\n        <tr>\r\n            <td><b>Rejection Reason:</b></td>\r\n            <td> {{ doc.EmployeeConcern }}</td>\r\n        </tr>\r\n    </table>\r\n\r\n<hr/>\r\n<div>\r\n    <table width=\"100%\">\r\n        <tr>\r\n            <td>\r\n                <button style=\"float:left\" mat-button color=\"primary\" (click)=\"onNoClick()\"> Resubmit </button>\r\n            </td>\r\n            <td>\r\n                <button style=\"float:right\" mat-button color=\"primary\" (click)=\"onNoClick()\"> Close </button>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/documentList/documentList.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<h1 *ngIf=\"(signStatusSearch === '1')\" i18n=\"header | header of the employees section@@EmployeesHeader\" class=\"centerText\">Unsigned Documents</h1>\r\n<h1 *ngIf=\"(signStatusSearch === '3')\" i18n=\"header | header of the employees section@@EmployeesHeader\" class=\"centerText\">Refused Documents</h1>\r\n\r\n    <div style=\"margin-top:10px; line-height: 1.25\" class=\"centerText\">\r\n        <mat-icon style=\"vertical-align:middle\">search</mat-icon>\r\n        <input #search placeholder=\"Search\" (keyup)=\"0\" class=\"inputSearchBox\" />\r\n        <button *ngIf=\"(signStatusSearch === '1')\" mat-raised-button color=\"primary\" i18n=\"@@UpdateButton\"> Send Reminders </button>\r\n    </div>\r\n<div style=\"max-height: 100vh; overflow-y: auto\" *ngIf=\"documents\">    \r\n    <mat-list class=\"centeredList\">\r\n\r\n        <mat-list-item *ngFor=\"let document of (documents | listfilter: search.value)\" style=\"border-bottom: 1px solid grey; cursor: pointer\" (click)=\"showDialog(document)\" routerLinkActive=\"active\">\r\n            <mat-icon mat-list-icon><i class=\"material-icons\">account_circle</i></mat-icon>\r\n            <!--<h4 mat-line>{{document.SignStatus}}</h4>-->\r\n            <p mat-line>{{document.EmployeeName}}, PayPeriod: {{document.PayperiodDate}}, Date Uploaded: {{document.UploadTime}} </p>\r\n        </mat-list-item>\r\n    </mat-list>\r\n    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />\r\n    <div *ngIf=\"!documents && isPromiseDone\" i18n=\"message | message letting the user know there are no documents@@NoDocumentsMessage\">\r\n        There are no documents to view\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/documentList/documentList.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RefusedDocumentAlertDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally__ = __webpack_require__("../../../../rxjs/add/operator/finally.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_documents_service__ = __webpack_require__("../../../../../src/app/services/documents.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
//angular imports


//rxjs imports



//angular material imports

var DocumentListComponent = (function () {
    function DocumentListComponent(route, documentService, snackbar, dialog) {
        var _this = this;
        this.route = route;
        this.documentService = documentService;
        this.snackbar = snackbar;
        this.dialog = dialog;
        this.isPromiseDone = false;
        route.params.subscribe(function (params) {
            _this.signStatusSearch = params['sts'];
            _this.companyId = params['cid'];
        });
    }
    DocumentListComponent.prototype.showDialog = function (document) {
        var dialogRef = this.dialog.open(RefusedDocumentAlertDialog, {
            width: '50%',
            data: { 'document': document }
        });
    };
    DocumentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 1 == unsigned, 3 == rejected
        if (this.signStatusSearch === '1') {
            this.route.paramMap
                .switchMap(function (params) { return _this.documentService.getUnsignedDocumentsForCompany(_this.companyId); })
                .subscribe(function (data) {
                _this.documents = data;
                _this.isPromiseDone = true;
            });
        }
        else {
            this.route.paramMap
                .switchMap(function (params) { return _this.documentService.getRejectedDocumentsForCompany(_this.companyId); })
                .subscribe(function (data) {
                _this.documents = data;
                _this.isPromiseDone = true;
            });
        }
    };
    return DocumentListComponent;
}());
DocumentListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-documents-view',
        template: __webpack_require__("../../../../../src/app/components/documentList/documentList.component.html"),
        //styleUrls: ['./employeeEdit.component.css'],
        providers: [__WEBPACK_IMPORTED_MODULE_4__services_documents_service__["a" /* DocumentService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_documents_service__["a" /* DocumentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_documents_service__["a" /* DocumentService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__angular_material__["o" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_material__["o" /* MatSnackBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MatDialog */]) === "function" && _d || Object])
], DocumentListComponent);

var RefusedDocumentAlertDialog = (function () {
    function RefusedDocumentAlertDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    RefusedDocumentAlertDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    RefusedDocumentAlertDialog.prototype.ngOnInit = function () {
        this.doc = this.data['document'];
        //this.documentId = this.data['documentId'];
        //this.employeeName = this.data['employeeName'];
        //this.uploadTime = this.data['uploadTime'];
        //this.PayPeriod = this.data['payPeriod'];
        //this.reasonRefused = this.data['reasonRefused'];
    };
    return RefusedDocumentAlertDialog;
}());
RefusedDocumentAlertDialog = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'refused-alert-dialog',
        template: __webpack_require__("../../../../../src/app/components/documentList/document-alert.dialog.html"),
    }),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MAT_DIALOG_DATA */])),
    __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__angular_material__["g" /* MatDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_material__["g" /* MatDialogRef */]) === "function" && _e || Object, Object])
], RefusedDocumentAlertDialog);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=documentList.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/employee/employeeEdit/employeeEdit.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n  \r\n  .example-full-width {\r\n    display:flow-root;\r\n  }\r\n\r\n  /* ignore parent width */\r\n  .mat-form-field{\r\n        width:auto;\r\n        padding:10px 25px 10px 25px;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/employee/employeeEdit/employeeEdit.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-spinner style=\"margin:0 auto;\" *ngIf=\"!isPromiseDone\"></mat-spinner>\r\n\r\n<div style=\"max-height: 80vh; overflow-y: auto\" class=\"centeredList\" *ngIf=\"employee\">\r\n        <form class=\"example-form\">\r\n            <mat-form-field class=\"example-full-width\">\r\n                <input required matInput placeholder=\"Email Address\" value=\"{{employee.EmailAddress}}\" [(ngModel)]=\"employee.EmailAddress\" name=employeeEmailAddress\r\n                       i18n-placeholder=\"@@EmployeeEmailField\">\r\n            </mat-form-field>\r\n            <mat-form-field class=\"example-full-width\">\r\n                <input matInput placeholder=\"First Name\" value=\"{{employee.FirstName}}\" [(ngModel)]=\"employee.FirstName\" name=employeeFirst\r\n                       i18n-placeholder=\"@@EmployeeFirstNameField\">\r\n            </mat-form-field>\r\n            <mat-form-field class=\"example-full-width\">\r\n                <input matInput placeholder=\"1st Last Name\" value=\"{{employee.LastName1}}\" [(ngModel)]=\"employee.LastName1\" name=employeeLast1\r\n                       i18n-placeholder=\"@@EmployeeLastNameField\">\r\n            </mat-form-field>\r\n            <mat-form-field class=\"example-full-width\">\r\n                <input matInput placeholder=\"2nd Last Name\" value=\"{{employee.LastName2}}\" [(ngModel)]=\"employee.LastName2\" name=employeeLast2\r\n                       i18n-placeholder=\"@@EmployeeLastNameField\">\r\n            </mat-form-field>\r\n\r\n            <mat-form-field class=\"example-full-width\">\r\n                <input matInput placeholder=\"Cell Number\" value=\"{{employee.CellPhoneNumber}}\" [(ngModel)]=\"employee.CellPhoneNumber\" name=employeeCellPhoneNumber\r\n                       i18n-placeholder=\"@@EmployeeCellPhoneNumber\">\r\n            </mat-form-field>\r\n\r\n            <mat-form-field class=\"example-full-width\">\r\n                <input matInput placeholder=\"CURP\" value=\"{{employee.CURP}}\" [(ngModel)]=\"employee.CURP\" name=employeeCURP i18n-placeholder=\"@@EmployeeCURPField\">\r\n            </mat-form-field>\r\n            <mat-form-field class=\"example-full-width\">\r\n                <input matInput placeholder=\"RFC\" value=\"{{employee.RFC}}\" [(ngModel)]=\"employee.RFC\" name=employeeRFC i18n-placeholder=\"@@EmployeeRFCField\">\r\n            </mat-form-field>\r\n\r\n            <p align=\"right\"><b>Created By:</b>{{employee.CreatedByUserName}} - <b>Last Login:</b>{{employee.LastLogin}} </p>\r\n            <table>\r\n                <tr>\r\n                    <td>\r\n                        <input-file style=\"padding-bottom:15px\" (onFileSelect)=\"onFileSelect($event)\">\r\n                            <span class=\"nofiles\">Upload Employee File</span>\r\n                            <span class=\"selected\">Files selected</span>\r\n                        </input-file>\r\n                    </td>\r\n                    <td>\r\n                        <div *ngIf=\"files\">\r\n                            <div *ngFor=\"let file of files\">\r\n                                {{ file.name}}\r\n                            </div>\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr style=\"padding-top: 25px\">\r\n                    <td style=\"padding-top: 25px\" colspan=\"2\">\r\n                        <button mat-raised-button color=\"primary\" (click)=updateEmployee() i18n=\"@@UpdateButton\"> Update </button>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n        </form>\r\n\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/employee/employeeEdit/employeeEdit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__ = __webpack_require__("../../../../rxjs/add/operator/finally.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_employee_service__ = __webpack_require__("../../../../../src/app/services/employee.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_upload_service__ = __webpack_require__("../../../../../src/app/services/upload.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_file_model__ = __webpack_require__("../../../../../src/app/models/file.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_company_service__ = __webpack_require__("../../../../../src/app/services/company.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports



//rxjs imports


//custom imports





//angular material imports

var EmployeeEditComponent = (function () {
    function EmployeeEditComponent(route, employeeService, snackbar, uploadService, companyService, userService, _location) {
        //this.userStatus = userService.getUserType();
        var _this = this;
        this.route = route;
        this.employeeService = employeeService;
        this.snackbar = snackbar;
        this.uploadService = uploadService;
        this.companyService = companyService;
        this.userService = userService;
        this._location = _location;
        this.isPromiseDone = false;
        // get company Id
        route.params.subscribe(function (params) {
            _this.companyId = params['cid'];
        });
    }
    EmployeeEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.employeeService.getEmployeeById(params.get('cid'), params.get('eid')); })
            .subscribe(function (data) {
            _this.employee = data;
            _this.isPromiseDone = true;
        });
    };
    EmployeeEditComponent.prototype.updateEmployee = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.employeeService.updateEmployeeDetails(params.get('eid'), _this.employee).finally(function () { _this.snackbar.open("sucessfully updated", "", { duration: 5000 }); }); })
            .subscribe(function (data) { _this.employee = data; if (!_this.files) {
            _this._location.back();
        } }, function (error) { return _this.snackbar.open(error, "", { duration: 5000 }); });
        if (this.files && this.files.length > 0) {
            this.companyService.getCompanyById(this.employee.CompanyId).subscribe(function (data) {
                _this.uploadService.openBatch(data.CompanyRFC).subscribe(function (data) {
                    var batchId = data.BatchId;
                    for (var _i = 0, _a = _this.files; _i < _a.length; _i++) {
                        var file = _a[_i];
                        _this.uploadFile(file, batchId);
                    }
                    ;
                    _this.uploadService.closeBatch(batchId).subscribe(function (data) {
                        console.log('closed');
                        _this._location.back();
                        //success from closed batch
                    });
                });
            });
        }
    };
    EmployeeEditComponent.prototype.onFileSelect = function (event) {
        this.files = event;
    };
    EmployeeEditComponent.prototype.uploadFile = function (file, batchId) {
        var _this = this;
        var uploadFile = new __WEBPACK_IMPORTED_MODULE_7__models_file_model__["a" /* FileModel */]();
        uploadFile.EmployeeCURP = this.employee.CURP;
        //uploadFile.CompanyId = this.companyId;
        uploadFile.FileName = file.name;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            uploadFile.Content = reader.result.split(',')[1]; //removes data:image...   
            _this.uploadService.addFile(uploadFile, batchId).subscribe(function (data) { return data; }); //success from file uploads
        };
    };
    return EmployeeEditComponent;
}());
EmployeeEditComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-employee-edit',
        template: __webpack_require__("../../../../../src/app/components/employee/employeeEdit/employeeEdit.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/employee/employeeEdit/employeeEdit.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_5__services_employee_service__["a" /* EmployeeService */], __WEBPACK_IMPORTED_MODULE_8__services_company_service__["a" /* CompanyService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__services_employee_service__["a" /* EmployeeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_employee_service__["a" /* EmployeeService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_10__angular_material__["o" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__angular_material__["o" /* MatSnackBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__services_upload_service__["a" /* UploadService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_upload_service__["a" /* UploadService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__services_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_company_service__["a" /* CompanyService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_9__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__services_user_service__["a" /* UserService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _g || Object])
], EmployeeEditComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=employeeEdit.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/employee/employeeNew/employeeNew.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n  \r\n  .example-full-width {\r\n    display:flow-root;\r\n  }\r\n\r\n  /* ignore parent width */\r\n  .mat-form-field{\r\n        width:auto;\r\n        padding:10px 25px 10px 25px;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/employee/employeeNew/employeeNew.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"max-height: 80vh; overflow-y: auto\" class=\"centeredList\"> \r\n  <form class=\"example-form\">\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput placeholder=\"Company ID\" disabled value=\"{{employee.CompanyId}}\" i18n-placeholder=\"input field | input field which contains the company's id@@CompanyIdField\">\r\n    </mat-form-field>\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput required placeholder=\"Email Address\" [(ngModel)]=\"employee.EmailAddress\" name=employeeEmail i18n-placeholder=\"input field | input field which contains the employee's email@@EmployeeEmailField\">\r\n    </mat-form-field>\r\n    <!--<mat-form-field class=\"example-full-width\">\r\n      <input required matInput placeholder=\"Password\" [(ngModel)]=\"employee.PasswordHash\" name=employeePassword i18n-placeholder=\"input field | input field which contains the employee's password@@EmployeePasswordField\">\r\n    </mat-form-field>-->\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput placeholder=\"First Name\" [(ngModel)]=\"employee.FirstName\" name=employeeFirst i18n-placeholder=\"input field | input field which contains the employee's first name@@EmployeeFirstNameField\">\r\n    </mat-form-field>\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput placeholder=\"1st Last Name\" [(ngModel)]=\"employee.LastName1\" name=employeeLast1 i18n-placeholder=\"input field | input field which contains the employee's last name@@EmployeeLastNameField\">\r\n    </mat-form-field>\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput placeholder=\"2nd Last Name\" [(ngModel)]=\"employee.LastName2\" name=employeeLast2 i18n-placeholder=\"input field | input field which contains the employee's last name@@EmployeeLastNameField\">\r\n    </mat-form-field>\r\n\r\n      <mat-form-field class=\"example-full-width\">\r\n          <input matInput placeholder=\"Cell Number\" value=\"{{employee.CellPhoneNumber}}\" [(ngModel)]=\"employee.CellPhoneNumber\" name=employeeCellPhoneNumber\r\n                 i18n-placeholder=\"@@EmployeeCellPhoneNumber\">\r\n      </mat-form-field>\r\n\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput placeholder=\"CURP\" [(ngModel)]=\"employee.CURP\" name=employeeCurp i18n-placeholder=\"input field | input field which contains the employee's curp value@@EmployeeCURPField\">\r\n    </mat-form-field>\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput placeholder=\"RFC\" [(ngModel)]=\"employee.RFC\" name=employeeRfc i18n-placeholder=\"input field | input field which contains the employee's rfc code@@EmployeeRFCField\">\r\n    </mat-form-field>\r\n  </form>\r\n\r\n  <button mat-raised-button color=\"primary\" (click)=saveEmployee() i18n=\"action | button which will update the employee's info when clicked@@UpdateButton\"> Save </button>\r\n  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/employee/employeeNew/employeeNew.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__ = __webpack_require__("../../../../rxjs/add/operator/finally.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_employee_service__ = __webpack_require__("../../../../../src/app/services/employee.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_user_model__ = __webpack_require__("../../../../../src/app/models/user.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports



//rxjs imports


//custom imports


//angular material imports

var EmployeeNewComponent = (function () {
    function EmployeeNewComponent(route, employeeService, snackbar, _location) {
        var _this = this;
        this.route = route;
        this.employeeService = employeeService;
        this.snackbar = snackbar;
        this._location = _location;
        this.employee = new __WEBPACK_IMPORTED_MODULE_6__models_user_model__["a" /* User */]();
        route.params.subscribe(function (params) {
            _this.employee.CompanyId = params['cid'];
        });
    }
    EmployeeNewComponent.prototype.ngOnInit = function () {
    };
    EmployeeNewComponent.prototype.saveEmployee = function () {
        var _this = this;
        this.employee.CreatedByUserId = 2; //TODO FIX THIS HARDCODE
        console.log("save employee");
        this.route.paramMap
            .switchMap(function (params) {
            return _this.employeeService.saveNewEmployee(_this.employee).finally(function () { _this.snackbar.open("Updated successfully", "", { duration: 5000 }); });
        })
            .subscribe(function (data) { _this.employee = data; _this._location.back(); }, function (error) { return _this.snackbar.open(error, "", { duration: 5000 }); });
    };
    return EmployeeNewComponent;
}());
EmployeeNewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-employee-new',
        template: __webpack_require__("../../../../../src/app/components/employee/employeeNew/employeeNew.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/employee/employeeNew/employeeNew.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_5__services_employee_service__["a" /* EmployeeService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__services_employee_service__["a" /* EmployeeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_employee_service__["a" /* EmployeeService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__angular_material__["o" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_material__["o" /* MatSnackBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common__["f" /* Location */]) === "function" && _d || Object])
], EmployeeNewComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=employeeNew.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/employee/employees/employees.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-spinner style=\"margin:0 auto\" *ngIf=\"!isPromiseDone\"></mat-spinner>\r\n\r\n<div style=\"max-height: 100vh; overflow-y: auto\" *ngIf=\"companies\">\r\n  <h1 i18n=\"message | telling user to select a company from the list to view the employees@@PickCompanyViewEmployeesMsg\" class=\"centerText\">\r\n    Select Company to View Employees\r\n  </h1>\r\n  <div style=\"margin-top:10px; line-height:1.25;\" class=\"centerText\">\r\n    <mat-icon style=\"vertical-align:middle\">search</mat-icon>\r\n    <input #search placeholder=\"Search\" (keyup)=\"0\" class=\"inputSearchBox\" />\r\n  </div>\r\n  <mat-list class=\"centeredList\">\r\n    <mat-list-item *ngFor=\"let company of (companies | listfilter: search.value)\" style=\"border-bottom: 1px solid grey; cursor: pointer\" [routerLink]=\"['/employeesList', company.CompanyId]\"\r\n      routerLinkActive=\"active\">\r\n      <mat-icon mat-list-icon>business</mat-icon>\r\n      <h4 mat-line>{{company.CompanyName}}</h4>\r\n      <p mat-line> Date to go here </p>\r\n\r\n    </mat-list-item>\r\n  </mat-list>\r\n  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>\r\n</div>\r\n<div class=\"centerText\" *ngIf=\"!companies && isPromiseDone\" i18n=\"@@NoCompaniesMessage\"> \r\n    There are no companies to view\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/employee/employees/employees.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_company_service__ = __webpack_require__("../../../../../src/app/services/company.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EmployeesComponent = (function () {
    function EmployeesComponent(companyService) {
        var _this = this;
        this.isPromiseDone = false;
        companyService.getCompanies().subscribe(function (data) {
            _this.companies = data;
            _this.isPromiseDone = true;
        });
    }
    return EmployeesComponent;
}());
EmployeesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-employees',
        template: __webpack_require__("../../../../../src/app/components/employee/employees/employees.component.html"),
        //styleUrls: ['./employees.component.css'],
        providers: [__WEBPACK_IMPORTED_MODULE_1__services_company_service__["a" /* CompanyService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_company_service__["a" /* CompanyService */]) === "function" && _a || Object])
], EmployeesComponent);

var _a;
//# sourceMappingURL=employees.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/employee/employeesList/employeesList.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "  .example-full-width {\r\n    display:flow-root;\r\n  }\r\n\r\n  /* ignore parent width */\r\n  .mat-form-field{\r\n        width:auto;\r\n        padding:10px 25px 10px 25px;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/employee/employeesList/employeesList.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-spinner style=\"margin:0 auto;\" *ngIf=\"!isPromiseDone\"></mat-spinner>\r\n\r\n<div  style=\"overflow-y: auto; max-height:80vh\" *ngIf=\"employees\">\r\n  <button mat-button [routerLink]=\"['/employeeNew', companyId]\" class=\"leftFloat\">\r\n  <mat-icon mat-list-icon>add</mat-icon><mat-icon mat-list-icon>account_circle</mat-icon> \r\n</button>\r\n<h1 i18n=\"header | header of the employees section@@EmployeesHeader\" class=\"centerText\">Employees</h1>\r\n<div style=\"margin-top:10px; line-height: 1.25\" class=\"centerText\">\r\n    <mat-icon style=\"vertical-align:middle\">search</mat-icon>\r\n    <input #search placeholder=\"Search\" (keyup)=\"0\" class=\"inputSearchBox\" />\r\n</div>\r\n\r\n  <mat-list class=\"centeredList\">\r\n    \r\n    <mat-list-item *ngFor=\"let employee of (employees | listfilter: search.value)\" style=\"border-bottom: 1px solid grey; cursor: pointer\" [routerLink]=\"['/employeeEdit', companyId ,employee.EmployeeId]\"\r\n      routerLinkActive=\"active\">\r\n      <mat-icon mat-list-icon><i class=\"material-icons\">account_circle</i></mat-icon>\r\n      <h4 mat-line>{{employee.EmailAddress}}</h4>\r\n      <p mat-line> {{employee.FirstName}} {{employee.LastName1}} {{employee.LastName2}} </p>\r\n\r\n    </mat-list-item>\r\n  </mat-list>\r\n  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>\r\n</div>\r\n<div *ngIf=\"!employees && isPromiseDone\" i18n=\"message | message letting the user know there are no employees@@NoEmployeesMessage\"> \r\n    There are no employees to view\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/employee/employeesList/employeesList.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeesListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_employee_service__ = __webpack_require__("../../../../../src/app/services/employee.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports


//rxjs imports

//custom imports

var EmployeesListComponent = (function () {
    function EmployeesListComponent(route, employeeService) {
        var _this = this;
        this.route = route;
        this.employeeService = employeeService;
        this.isPromiseDone = false;
        route.params.subscribe(function (params) {
            _this.companyId = params['cid'];
        });
    }
    EmployeesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.employeeService.getEmployeesByCompany(params.get('cid')); })
            .subscribe(function (data) {
            _this.employees = data;
            _this.isPromiseDone = true;
        });
    };
    EmployeesListComponent.prototype.updateEmployee = function () {
        //  this.route.paramMap
        //  .switchMap((params: ParamMap) => this.employeeService.updateCompanyDetails(params.get('id'), this.company))
        //  .subscribe(data => this.company = data);
    };
    return EmployeesListComponent;
}());
EmployeesListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-employees',
        template: __webpack_require__("../../../../../src/app/components/employee/employeesList/employeesList.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/employee/employeesList/employeesList.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_3__services_employee_service__["a" /* EmployeeService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_employee_service__["a" /* EmployeeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_employee_service__["a" /* EmployeeService */]) === "function" && _b || Object])
], EmployeesListComponent);

var _a, _b;
//# sourceMappingURL=employeesList.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/fileupload.component.html":
/***/ (function(module, exports) {

module.exports = "<span>\r\n    <input [accept]=\"accept\" type=\"file\" (change)=\"onNativeInputFileSelect($event)\" #inputFile hidden multiple=\"multiple\" />\r\n    <button type=\"button\" md-raised-button (click)=\"selectFile()\">\r\n        <mat-icon>file_upload</mat-icon>\r\n        <ng-content *ngIf=\"!fileCount\" select=\".nofiles\"></ng-content>\r\n        <span *ngIf=\"fileCount\">\r\n            <span>{{fileCount}}</span>\r\n            <ng-content select=\".selected\"></ng-content>\r\n        </span>\r\n    </button>\r\n</span>"

/***/ }),

/***/ "../../../../../src/app/components/fileupload.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InputFile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InputFile = (function () {
    function InputFile() {
        this.onFileSelect = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    Object.defineProperty(InputFile.prototype, "fileCount", {
        get: function () { return this._files && this._files.length || 0; },
        enumerable: true,
        configurable: true
    });
    InputFile.prototype.onNativeInputFileSelect = function ($event) {
        this._files = $event.srcElement.files;
        this.onFileSelect.emit(this._files);
    };
    InputFile.prototype.selectFile = function () {
        this.nativeInputFile.nativeElement.click();
    };
    return InputFile;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", String)
], InputFile.prototype, "accept", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]) === "function" && _a || Object)
], InputFile.prototype, "onFileSelect", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewChild */])('inputFile'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _b || Object)
], InputFile.prototype, "nativeInputFile", void 0);
InputFile = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        'selector': 'input-file',
        template: __webpack_require__("../../../../../src/app/components/fileupload.component.html")
    })
], InputFile);

var _a, _b;
//# sourceMappingURL=fileupload.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/login/login-alert.dialog.html":
/***/ (function(module, exports) {

module.exports = "<h2 class=\"centerText\" i18n=\"message | a message to let the user know the login failed\">\r\n    The email and/or password provided could not be authenticated successfully.\r\n</h2>\r\n<hr/>\r\n<div>\r\n    <button style=\"float:right\" md-button color=\"primary\" (click)=\"onNoClick()\"> Close </button>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".example-form {\r\n    min-width: 150px;\r\n    width: 100%;\r\n  }\r\n  \r\n  .example-full-width {\r\n    width: 50%;\r\n  }\r\n\r\n  @media (max-device-width: 720px) {\r\n    .loginLogoMobile {\r\n       float: unset !important;\r\n      \r\n    }\r\n    .loginTitleMobile {\r\n      width:90% !important;\r\n      margin: 5%;\r\n      margin-left:0 !important;\r\n      -webkit-transform:translateY(0) !important;\r\n              transform:translateY(0) !important;\r\n    }\r\n\r\n    .loginFormMobile {\r\n      float: unset !important;\r\n      width: 85%!important;\r\n      margin: 5px;\r\n     \r\n    }\r\n\r\n    .loginFormFieldsMobile {\r\n      width: 30% !important;\r\n    }\r\n\r\n    .loginContainerMobile {\r\n      top: 10% !important;\r\n    }\r\n      \r\n   }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"overflow-y: auto; position:absolute;top:25%;width:100%\" class=\"loginContainerMobile\">\r\n  <div style=\"width:60%; margin-left:35px; transform: translateY(200%)\" class=\"loginTitleMobile centerText\">\r\n    <h1> Admin Page</h1>\r\n    <img style=\"width:90%;\" src=\"../../assets/images/Nomi_Sign-12-1-1.png\" class=\"loginLogoMobile leftFloat\"/>\r\n  </div>\r\n  <div>\r\n    <mat-card style=\"margin-right:50px; width: 34%; text-align: center; float:right\" class=\"loginFormMobile\">\r\n      <h1 class=\"centerText\">\r\n        <h2 i18n=\"header | header for where the user will enter their login credentials @@LoginFormHeader\">Login</h2>\r\n      </h1>\r\n\r\n      <mat-card-content>\r\n        <form name=\"loginForm\" class=\"example-form\">\r\n          <div> \r\n          <span i18n=\"header | asking for the user's email@@PasswordLoginForm\" style=\"display:inline-block; width:12%;text-align:left\" class=\"loginFormFieldsMobile\">Email &nbsp;</span>\r\n          <mat-form-field class=\"example-full-width\">\r\n            <input type=\"text\" matInput [formControl]=\"usernameFormControl\" [(ngModel)]=userName>\r\n            <mat-error *ngIf=\"usernameFormControl.hasError('required')\" i18n=\"message | letting the user know that they need to enter their username@@UsernameRequiredMessage\">\r\n              Username is <strong>required</strong>\r\n            </mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div>\r\n          <span i18n=\"header | asking for the user's password@@PasswordLoginForm\" style=\"display:inline-block; width:12%; text-align:left\" class=\"loginFormFieldsMobile\">Password &nbsp;</span>\r\n          <mat-form-field class=\"example-full-width\">\r\n            <input type=\"password\" matInput [formControl]=\"passwordFormControl\" [(ngModel)]=\"password\">\r\n            <mat-error *ngIf=\"passwordFormControl.hasError('required')\" i18n=\"message | letting the user know that they need to enter their password@@PasswordRequiredMessage\">\r\n              Password is <strong>required</strong>\r\n            </mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        </form>\r\n      </mat-card-content>\r\n      <button md-raised-button color=\"primary\" style=\"width:85%\" (click)=login() i18n=\"action | user will click this to login to thet website@@LoginButtonAction\"> Login </button>\r\n    </mat-card>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LoginComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginAlertDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginComponent = (function () {
    function LoginComponent(authService, router, userService, dialog) {
        this.authService = authService;
        this.router = router;
        this.userService = userService;
        this.dialog = dialog;
        this.user = {
            EmailAddress: '',
            PasswordHash: ''
        };
        this.usernameFormControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required
        ]);
        this.passwordFormControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required
        ]);
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.reroute = function (activeUser) {
        this.userService.setUser(activeUser);
        this.router.navigate(['/layout']);
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.user.EmailAddress = this.userName;
        this.user.PasswordHash = this.password;
        this.authService.loginUser(this.user).subscribe(function (userData) { return _this.userService.setUser(userData); }, function (error) {
            var dialogRef = _this.dialog.open(LoginAlertDialog, {
                width: '50%',
                data: {}
            });
        }, function () {
            var user = _this.userService.getUser();
            switch (user.UserType) {
                case 3: {
                    _this.router.navigate(['/dashboard']);
                    break;
                }
                case 2: {
                    _this.router.navigate(['/companyEdit', user.CompanyId]);
                    break;
                }
                case 1: {
                    _this.router.navigate(['/employeesList', user.CompanyId]);
                    break;
                }
                default: {
                    _this.router.navigate(['/login']);
                    break;
                }
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/components/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/login/login.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MatDialog */]) === "function" && _d || Object])
], LoginComponent);

var LoginAlertDialog = (function () {
    function LoginAlertDialog(dialogRef) {
        this.dialogRef = dialogRef;
    }
    LoginAlertDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    return LoginAlertDialog;
}());
LoginAlertDialog = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'login-alert-dialog',
        template: __webpack_require__("../../../../../src/app/components/login/login-alert.dialog.html"),
    }),
    __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__angular_material__["g" /* MatDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_material__["g" /* MatDialogRef */]) === "function" && _e || Object])
], LoginAlertDialog);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/navbars/companyAdmin/company-admin.navbar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".toolbar{\r\n    background-color: #2cbbc3;\r\n    padding: 5px\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/navbars/companyAdmin/company-admin.navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"toolbar\">\r\n    <!-- mobile menu -->\r\n    <span style=\"display:none\" class=\"displayContentMobile\">\r\n        <button md-button [matMenuTriggerFor]=\"mobileMenu\">\r\n            <mat-icon>menu</mat-icon>\r\n        </button>\r\n\r\n        <mat-menu #mobileMenu=\"matMenu\">\r\n            <button mat-menu-item [matMenuTriggerFor]=\"companyMenu\" i18n=\"@@GoCompaniesPageMenuHeader\"> Companies </button>\r\n            <button mat-menu-item [matMenuTriggerFor]=\"companyuserMenu\" i18n=\"@@GoCompanyUsersPageMenuHeader\"> Users </button>\r\n            <button mat-menu-item [matMenuTriggerFor]=\"employeeMenu\" i18n=\"@@GoEmployeesPageMenuHeader\"> Employees </button>\r\n            <button mat-menu-item [matMenuTriggerFor]=\"companyDocumentMenu\" i18n=\"@@GoCompanyDocumentMenuHeader\"> Documents </button>\r\n        </mat-menu>\r\n        <span style=\"float:right\" *ngIf=\"user\">\r\n            <button mat-button [matMenuTriggerFor]=\"menu\">\r\n                <mat-icon>person</mat-icon>{{user.EmailAddress}}\r\n                <mat-icon>arrow_drop_down</mat-icon>\r\n            </button>\r\n            <mat-menu #menu=\"matMenu\">\r\n                <button mat-menu-item (click)=\"logout()\">\r\n                    <mat-icon>exit_to_app</mat-icon>\r\n                    <span i18n=\"action | user will click this to log out of the website@@LogoutAction\">Logout</span>\r\n                </button>\r\n            </mat-menu>\r\n        </span>\r\n    </span>\r\n    <!--desktop menu -->\r\n    <div style=\"margin-left:12%\">\r\n        <span class=\"hideContentMobile\">\r\n            <button mat-button [matMenuTriggerFor]=\"companyMenu\">\r\n                <span i18n=\"menu header | User will click this to navigate to the companies page@@GoCompaniesPageMenuHeader\">\r\n                    Companies\r\n                </span>\r\n                <mat-icon>arrow_drop_down</mat-icon>\r\n            </button>\r\n\r\n            <mat-menu #companyMenu=\"matMenu\">\r\n                <button mat-menu-item [routerLink]=\"['/companyEdit', user.CompanyId]\" routerLinkActive=\"active\">\r\n                    <span i18n=\"menu header | User will click this to view their company's details@@CompanyToolbarHeader\">\r\n                        Company\r\n                    </span>\r\n                </button>\r\n            </mat-menu>\r\n\r\n            <button mat-button [matMenuTriggerFor]=\"companyuserMenu\">\r\n                <span i18n=\"menu header | User will click this to go to the company user's page@@GoCompanyUsersPageMenuHeader\">\r\n                    Users\r\n                </span>\r\n                <mat-icon>arrow_drop_down</mat-icon>\r\n            </button>\r\n            <mat-menu #companyuserMenu=\"matMenu\">\r\n                <button mat-menu-item [routerLink]=\"['/companyusers', user.CompanyId]\" routerLinkActive=\"active\">\r\n                    <span i18n=\"@@GoCompanyUsersPageMenuHeader\">\r\n                        Users\r\n                    </span>\r\n                </button>\r\n            </mat-menu>\r\n\r\n            <button mat-button [matMenuTriggerFor]=\"employeeMenu\">\r\n                <span i18n=\"menu header | User will click this to go to the employees page@@GoEmployeesPageMenuHeader\">\r\n                    Employees\r\n                </span>\r\n                <mat-icon>arrow_drop_down</mat-icon>\r\n            </button>\r\n            <mat-menu #employeeMenu=\"matMenu\">\r\n                <button mat-menu-item [routerLink]=\"['/employeesList', user.CompanyId]\" routerLinkActive=\"active\">\r\n                    <span i18n=\"@@GoEmployeesPageMenuHeader\">\r\n                        Employees\r\n                    </span>\r\n                </button>\r\n                <button mat-menu-item [routerLink]=\"['/employeeNew', user.CompanyId]\" routerLinkActive=\"active\">\r\n                    <span i18n=\"menu header | User will click this to create a new employee@@NewEmployeesPageMenuHeader\">\r\n                        New Employee\r\n                    </span>\r\n                </button>\r\n            </mat-menu>\r\n\r\n            <button mat-button [matMenuTriggerFor]=\"companyDocumentMenu\">\r\n            <span i18n=\"menu header | User will click this to go to the documents page@@GoDocumentPageMenuHeader\">\r\n                Documents\r\n            </span>\r\n            <mat-icon>arrow_drop_down</mat-icon>\r\n            </button>\r\n            <mat-menu #companyDocumentMenu=\"matMenu\">\r\n                <button mat-menu-item [routerLink]=\"['/documentRejectList/3/', user.CompanyId]\" routerLinkActive=\"active\">\r\n                    <span i18n=\"@@GoCompanyUsersPageMenuHeader\">\r\n                        Refused\r\n                    </span>\r\n                </button>\r\n                <button mat-menu-item [routerLink]=\"['/documentUnapprovedList/1/', user.CompanyId]\" routerLinkActive=\"active\">\r\n                    <span i18n=\"@@GoCompanyUsersPageMenuHeader\">\r\n                        Unsigned\r\n                    </span>\r\n                </button>\r\n            </mat-menu>\r\n\r\n            <span style=\"float:right\" *ngIf=\"user\">\r\n                <button mat-button [matMenuTriggerFor]=\"menu\">\r\n                    <mat-icon>person</mat-icon>{{user.EmailAddress}}\r\n                    <mat-icon>arrow_drop_down</mat-icon>\r\n                </button>\r\n                <mat-menu #menu=\"matMenu\">\r\n                    <button mat-menu-item (click)=\"logout()\">\r\n                        <mat-icon>exit_to_app</mat-icon>\r\n                        <span i18n=\"action | user will click this to log out of the website@@LogoutAction\">Logout</span>\r\n                    </button>\r\n                </mat-menu>\r\n            </span>\r\n        </span>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/navbars/companyAdmin/company-admin.navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyAdminNavbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_settings_service__ = __webpack_require__("../../../../../src/app/services/settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports




var CompanyAdminNavbarComponent = (function () {
    function CompanyAdminNavbarComponent(router, settingsService, userService) {
        var _this = this;
        this.router = router;
        this.settingsService = settingsService;
        this.userService = userService;
        this.url = this.router.url;
        settingsService.getSystemSettings().subscribe(function (data) { return _this.appName = data[0].ProductName; });
        this.getCurrentUser();
        userService.userUpdated.subscribe(function (value) {
            _this.getCurrentUser();
        });
    }
    CompanyAdminNavbarComponent.prototype.ngOnInit = function () {
    };
    CompanyAdminNavbarComponent.prototype.getCurrentUser = function () {
        var user = this.userService.getUser();
        if (user) {
            this.user = user;
        }
    };
    CompanyAdminNavbarComponent.prototype.setTitle = function (title) {
        this.title = title;
    };
    CompanyAdminNavbarComponent.prototype.logout = function () {
        this.userService.clearUser();
        this.user = null;
        this.router.navigate(['/login']);
    };
    return CompanyAdminNavbarComponent;
}());
CompanyAdminNavbarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'company-admin-navbar',
        template: __webpack_require__("../../../../../src/app/components/navbars/companyAdmin/company-admin.navbar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/navbars/companyAdmin/company-admin.navbar.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_3__services_settings_service__["a" /* SettingsService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_settings_service__["a" /* SettingsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === "function" && _c || Object])
], CompanyAdminNavbarComponent);

var _a, _b, _c;
//# sourceMappingURL=company-admin.navbar.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/navbars/globalAdmin/global-admin.navbar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".toolbar{\r\n    background-color: #2cbbc3;\r\n    padding: 5px\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/navbars/globalAdmin/global-admin.navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"toolbar\">\r\n    <!-- mobile menu -->\r\n    <span style=\"display:none\" class=\"displayContentMobile\">\r\n        <button mat-button [matMenuTriggerFor]=\"mobileMenu\">\r\n            <mat-icon>menu</mat-icon>\r\n        </button>\r\n\r\n        <mat-menu #mobileMenu=\"matMenu\">\r\n            <button mat-menu-item routerLink=\"/dashboard\" routerLinkActive=\"active\" i18n=\"@@GoHomePageMenuHeader\"> Home </button>\r\n            <button mat-menu-item [matMenuTriggerFor]=\"companyMenu\" i18n=\"@@GoCompaniesPageMenuHeader\"> Companies </button>\r\n            <button mat-menu-item [matMenuTriggerFor]=\"companyuserMenu\" i18n=\"@@GoCompanyUsersPageMenuHeader\"> Users </button>\r\n            <button mat-menu-item [matMenuTriggerFor]=\"employeeMenu\" i18n=\"@@GoEmployeesPageMenuHeader\"> Employees </button>\r\n            \r\n        </mat-menu>\r\n        <span style=\"float:right\" *ngIf=\"user\">\r\n            <button mat-button [matMenuTriggerFor]=\"menu\">\r\n                <mat-icon>person</mat-icon>{{user.EmailAddress}}\r\n                <mat-icon>arrow_drop_down</mat-icon>\r\n            </button>\r\n            <mat-menu #menu=\"matMenu\">\r\n                <button mat-menu-item (click)=\"logout()\">\r\n                    <mat-icon>exit_to_app</mat-icon>\r\n                    <span i18n=\"action | user will click this to log out of the website@@LogoutAction\">Logout</span>\r\n                </button>\r\n            </mat-menu>\r\n        </span>\r\n    </span>\r\n    <!-- desktop menu -->\r\n    <div style=\"margin-left:12%\">\r\n        <span class=\"hideContentMobile\">\r\n            <span>\r\n                <button mat-button routerLink=\"/dashboard\" routerLinkActive=\"active\">\r\n                    <span i18n=\"menu header | User will click this to navigate to the home page@@GoHomePageMenuHeader\">\r\n                        Home\r\n                    </span>\r\n                </button>\r\n            </span>\r\n\r\n            <button mat-button [matMenuTriggerFor]=\"companyMenu\">\r\n                <span i18n=\"menu header | User will click this to navigate to the companies page@@GoCompaniesPageMenuHeader\">\r\n                    Companies\r\n                </span>\r\n                <mat-icon>arrow_drop_down</mat-icon>\r\n            </button>\r\n\r\n            <mat-menu #companyMenu=\"matMenu\">\r\n                <button mat-menu-item routerLink=\"/companies\" routerLinkActive=\"active\">\r\n                    <span i18n=\"@GoCompaniesPageMenuHeader\">\r\n                        Companies\r\n                    </span>\r\n                </button>\r\n                <button mat-menu-item routerLink=\"/companyNew\" routerLinkActive=\"active\">\r\n                    <span i18n=\"menu header | User will click this to create a new company@@NewCompanyPageHeader\">\r\n                        New Company\r\n                    </span>\r\n                </button>\r\n            </mat-menu>\r\n\r\n            <button mat-button [matMenuTriggerFor]=\"companyuserMenu\">\r\n                <span i18n=\"menu header | User will click this to go to the company user's page@@GoCompanyUsersPageMenuHeader\">\r\n                    Users\r\n                </span>\r\n                <mat-icon>arrow_drop_down</mat-icon>\r\n            </button>\r\n            <mat-menu #companyuserMenu=\"matMenu\">\r\n                <button mat-menu-item routerLink=\"/companyusers\" routerLinkActive=\"active\">\r\n                    <span i18n=\"@@GoCompanyUsersPageMenuHeader\">\r\n                        Users\r\n                    </span>\r\n                </button>\r\n            </mat-menu>\r\n\r\n            <button mat-button [matMenuTriggerFor]=\"employeeMenu\">\r\n                <span i18n=\"menu header | User will click this to go to the employees page@@GoEmployeesPageMenuHeader\">\r\n                    Employees\r\n                </span>\r\n                <mat-icon>arrow_drop_down</mat-icon>\r\n            </button>\r\n            <mat-menu #employeeMenu=\"matMenu\">\r\n                <button mat-menu-item routerLink=\"/employees\" routerLinkActive=\"active\">\r\n                    <span i18n=\"@@GoEmployeesPageMenuHeader\">\r\n                        Employees\r\n                    </span>\r\n                </button>\r\n            </mat-menu>\r\n\r\n            <span style=\"float:right\" *ngIf=\"user\">\r\n                <button mat-button [matMenuTriggerFor]=\"menu\">\r\n                    <mat-icon>person</mat-icon>{{user.EmailAddress}}\r\n                    <mat-icon>arrow_drop_down</mat-icon>\r\n                </button>\r\n                <mat-menu #menu=\"matMenu\">\r\n                    <button mat-menu-item (click)=\"logout()\">\r\n                        <mat-icon>exit_to_app</mat-icon>\r\n                        <span i18n=\"action | user will click this to log out of the website@@LogoutAction\">Logout</span>\r\n                    </button>\r\n                </mat-menu>\r\n            </span>\r\n        </span>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/navbars/globalAdmin/global-admin.navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalAdminNavbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_settings_service__ = __webpack_require__("../../../../../src/app/services/settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports




var GlobalAdminNavbarComponent = (function () {
    function GlobalAdminNavbarComponent(router, settingsService, userService) {
        var _this = this;
        this.router = router;
        this.settingsService = settingsService;
        this.userService = userService;
        this.url = this.router.url;
        settingsService.getSystemSettings().subscribe(function (data) { return _this.appName = data[0].ProductName; });
        this.getCurrentUser();
        userService.userUpdated.subscribe(function (value) {
            _this.getCurrentUser();
        });
    }
    GlobalAdminNavbarComponent.prototype.ngOnInit = function () {
    };
    GlobalAdminNavbarComponent.prototype.getCurrentUser = function () {
        var user = this.userService.getUser();
        if (user) {
            this.user = user;
        }
    };
    GlobalAdminNavbarComponent.prototype.setTitle = function (title) {
        this.title = title;
    };
    GlobalAdminNavbarComponent.prototype.logout = function () {
        this.userService.clearUser();
        this.user = null;
        this.router.navigate(['/login']);
    };
    return GlobalAdminNavbarComponent;
}());
GlobalAdminNavbarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'global-admin-navbar',
        template: __webpack_require__("../../../../../src/app/components/navbars/globalAdmin/global-admin.navbar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/navbars/globalAdmin/global-admin.navbar.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_3__services_settings_service__["a" /* SettingsService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_settings_service__["a" /* SettingsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === "function" && _c || Object])
], GlobalAdminNavbarComponent);

var _a, _b, _c;
//# sourceMappingURL=global-admin.navbar.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/navbars/user/user.navbar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".toolbar{\r\n    background-color: #2cbbc3;\r\n    padding: 5px\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/navbars/user/user.navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"toolbar\">\r\n    <!--mobile menu -->\r\n<span style=\"display:none\" class=\"displayContentMobile\">\r\n    <button mat-button [matMenuTriggerFor]=\"employeeMenu\">\r\n        <mat-icon>menu</mat-icon>\r\n    </button>\r\n\r\n    <span style=\"float:right\" *ngIf=\"user\">\r\n        <button mat-button [matMenuTriggerFor]=\"menu\">\r\n            <mat-icon>person</mat-icon>{{user.EmailAddress}}\r\n            <mat-icon>arrow_drop_down</mat-icon>\r\n        </button>\r\n        <mat-menu #menu=\"matMenu\">\r\n            <button mat-menu-item (click)=\"logout()\">\r\n                <mat-icon>exit_to_app</mat-icon>\r\n                <span i18n=\"action | user will click this to log out of the website@@LogoutAction\">Logout</span>\r\n            </button>\r\n        </mat-menu>\r\n    </span>\r\n</span>\r\n\r\n<!--desktop menu -->\r\n    <div style=\"margin-left:12%\">\r\n        <span class=\"hideContentMobile\">\r\n\r\n            <button mat-button [matMenuTriggerFor]=\"employeeMenu\">\r\n                <span i18n=\"menu header | User will click this to go to the employees page@@GoEmployeesPageMenuHeader\">\r\n                    Employees\r\n                </span>\r\n                <mat-icon>arrow_drop_down</mat-icon>\r\n            </button>\r\n            <mat-menu #employeeMenu=\"matMenu\">\r\n                <button mat-menu-item [routerLink]=\"['/employeesList', user.CompanyId]\" routerLinkActive=\"active\">\r\n                    <span i18n=\"@@GoEmployeesPageMenuHeader\">\r\n                        Employees\r\n                    </span>\r\n                </button>\r\n                <button mat-menu-item [routerLink]=\"['/employeeNew', user.CompanyId]\" routerLinkActive=\"active\">\r\n                    <span i18n=\"menu header | User will click this to create a new employee@@NewEmployeesPageMenuHeader\">\r\n                        New Employee\r\n                    </span>\r\n                </button>\r\n            </mat-menu>\r\n            <mat-menu #companyDocumentMenu=\"matMenu\">\r\n                <button mat-menu-item [routerLink]=\"['/companyusers', user.CompanyId]\" routerLinkActive=\"active\">\r\n                    <span i18n=\"@@GoCompanyUsersPageMenuHeader\">\r\n                        Documents\r\n                    </span>\r\n                </button>\r\n            </mat-menu>\r\n\r\n            <span style=\"float:right\" *ngIf=\"user\">\r\n                <button mat-button [matMenuTriggerFor]=\"menu\">\r\n                    <mat-icon>person</mat-icon>{{user.EmailAddress}}\r\n                    <mat-icon>arrow_drop_down</mat-icon>\r\n                </button>\r\n                <mat-menu #menu=\"matMenu\">\r\n                    <button mat-menu-item (click)=\"logout()\">\r\n                        <mat-icon>exit_to_app</mat-icon>\r\n                        <span i18n=\"action | user will click this to log out of the website@@LogoutAction\">Logout</span>\r\n                    </button>\r\n                </mat-menu>\r\n            </span>\r\n        </span>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/navbars/user/user.navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserNavbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_settings_service__ = __webpack_require__("../../../../../src/app/services/settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports




var UserNavbarComponent = (function () {
    function UserNavbarComponent(router, settingsService, userService) {
        var _this = this;
        this.router = router;
        this.settingsService = settingsService;
        this.userService = userService;
        this.url = this.router.url;
        settingsService.getSystemSettings().subscribe(function (data) { return _this.appName = data[0].ProductName; });
        this.getCurrentUser();
        userService.userUpdated.subscribe(function (value) {
            _this.getCurrentUser();
        });
    }
    UserNavbarComponent.prototype.ngOnInit = function () {
    };
    UserNavbarComponent.prototype.getCurrentUser = function () {
        var user = this.userService.getUser();
        if (user) {
            this.user = user;
        }
    };
    UserNavbarComponent.prototype.setTitle = function (title) {
        this.title = title;
    };
    UserNavbarComponent.prototype.logout = function () {
        this.userService.clearUser();
        this.user = null;
        this.router.navigate(['/login']);
    };
    return UserNavbarComponent;
}());
UserNavbarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'user-navbar',
        template: __webpack_require__("../../../../../src/app/components/navbars/user/user.navbar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/navbars/user/user.navbar.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_3__services_settings_service__["a" /* SettingsService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_settings_service__["a" /* SettingsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === "function" && _c || Object])
], UserNavbarComponent);

var _a, _b, _c;
//# sourceMappingURL=user.navbar.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/notfound/notfound.component.html":
/***/ (function(module, exports) {

module.exports = "<div i18n=\"Message | Message letting the user know the page they navigated to does not exist@@PageNotFoundMessage\"> The page you requested was not found. </div>"

/***/ }),

/***/ "../../../../../src/app/components/notfound/notfound.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotFoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NotFoundComponent = (function () {
    function NotFoundComponent() {
    }
    return NotFoundComponent;
}());
NotFoundComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-notfound',
        template: __webpack_require__("../../../../../src/app/components/notfound/notfound.component.html"),
    })
], NotFoundComponent);

//# sourceMappingURL=notfound.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/timesheet/timesheet.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "body {\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/timesheet/timesheet.component.html":
/***/ (function(module, exports) {

module.exports = "This is the time sheet component"

/***/ }),

/***/ "../../../../../src/app/components/timesheet/timesheet.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimesheetComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TimesheetComponent = (function () {
    function TimesheetComponent() {
    }
    return TimesheetComponent;
}());
TimesheetComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'ng-timesheet',
        template: __webpack_require__("../../../../../src/app/components/timesheet/timesheet.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/timesheet/timesheet.component.css")]
    }),
    __metadata("design:paramtypes", [])
], TimesheetComponent);

//# sourceMappingURL=timesheet.component.js.map

/***/ }),

/***/ "../../../../../src/app/models/company.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyModel; });
var CompanyModel = (function () {
    function CompanyModel() {
    }
    return CompanyModel;
}());

//# sourceMappingURL=company.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/companyUser.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyUserModel; });
var CompanyUserModel = (function () {
    function CompanyUserModel() {
    }
    return CompanyUserModel;
}());

//# sourceMappingURL=companyUser.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/file.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileModel; });
var FileModel = (function () {
    function FileModel() {
    }
    return FileModel;
}());

//# sourceMappingURL=file.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/states.models.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return States; });
var States = (function () {
    function States() {
        this.codes = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS",
            "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
        ];
    }
    return States;
}());

//# sourceMappingURL=states.models.js.map

/***/ }),

/***/ "../../../../../src/app/models/user.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User() {
    }
    return User;
}());

//# sourceMappingURL=user.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/usertype.models.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserType; });
var UserType = (function () {
    function UserType() {
        this.codes = ["HumanResources", "CompanyAdmin", "GlobalAdmin"];
    }
    return UserType;
}());

//# sourceMappingURL=usertype.models.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/list-filter.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListFilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ListFilterPipe = (function () {
    function ListFilterPipe() {
    }
    ListFilterPipe.prototype.transform = function (items, criteria) {
        return items.filter(function (item) {
            for (var key in item) {
                var lowerKey = "" + item[key];
                if (lowerKey.toLowerCase().includes(criteria.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });
    };
    return ListFilterPipe;
}());
ListFilterPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Pipe */])({
        name: 'listfilter'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])()
], ListFilterPipe);

//# sourceMappingURL=list-filter.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports




var rootURL = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].serviceUrl;
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.loginUser = function (user) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ method: 'POST', headers: _headers });
        var url = rootURL + 'api/adminlogin';
        var body = JSON.stringify(user);
        return this.http.post(url, body, options).map(function (response) { return response.json(); });
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], AuthService);

var _a;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/authguard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CAdminAuthGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return UserAuthGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GAdminAuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CAdminAuthGuard = (function () {
    function CAdminAuthGuard(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    CAdminAuthGuard.prototype.canActivate = function (route, state) {
        if (this.userService.isLoggedIn()) {
            var user = this.userService.getUser();
            if (user.UserType === 3) {
                return true;
            }
            if (user.UserType === 2) {
                if (user.CompanyId === +route.params.cid) {
                    return true;
                }
            }
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
        this.router.navigate(['/notFound']);
        return false;
    };
    return CAdminAuthGuard;
}());
CAdminAuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], CAdminAuthGuard);

var UserAuthGuard = (function () {
    function UserAuthGuard(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    UserAuthGuard.prototype.canActivate = function (route, state) {
        if (this.userService.isLoggedIn()) {
            var user = this.userService.getUser();
            if (user.UserType === 3) {
                return true;
            }
            if (user.UserType === 1 || user.UserType === 2) {
                if (user.CompanyId === +route.params.cid) {
                    return true;
                }
            }
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
        this.router.navigate(['/notFound']);
        return false;
    };
    return UserAuthGuard;
}());
UserAuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _d || Object])
], UserAuthGuard);

var GAdminAuthGuard = (function () {
    function GAdminAuthGuard(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    GAdminAuthGuard.prototype.canActivate = function (route, state) {
        if (this.userService.isLoggedIn()) {
            if (this.userService.getUserType() === 3) {
                return true;
            }
            console.log(this.userService.getUserType());
        }
        this.router.navigate(['/login']);
        return false;
    };
    return GAdminAuthGuard;
}());
GAdminAuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _f || Object])
], GAdminAuthGuard);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=authguard.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/company.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//const rootURL: string = 'http://ogrean.com/nomisign/'
var rootURL = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].serviceUrl;
var CompanyService = (function () {
    function CompanyService(http) {
        this.http = http;
    }
    //GET
    CompanyService.prototype.getCompanies = function () {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({});
        return this.http.get(rootURL + 'api/companies', { headers: _headers }).map(function (response) { return response.json(); });
    };
    //GET/:id
    CompanyService.prototype.getCompanyById = function (companyId) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({});
        return this.http.get(rootURL + 'api/companies/' + companyId, { headers: _headers }).map(function (response) { return response.json(); });
    };
    //PUT
    CompanyService.prototype.updateCompanyDetails = function (companyId, companyDetails) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ method: 'PUT', headers: _headers });
        var body = JSON.stringify(companyDetails);
        var url = rootURL + 'api/companies/' + companyId;
        return this.http.put(url, body, options).map(function (response) { return response.json(); });
    };
    //POST
    CompanyService.prototype.saveNewCompany = function (companyDetails) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ method: 'POST', headers: _headers });
        var body = JSON.stringify(companyDetails);
        console.log(companyDetails);
        var url = rootURL + "api/companies";
        return this.http.post(url, body, options).map(function (response) { return response.json(); });
    };
    return CompanyService;
}());
CompanyService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], CompanyService);

var _a;
//# sourceMappingURL=company.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/companyUser.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyUsersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//const rootURL: string = 'http://ogrean.com/nomisign/'
var rootURL = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].serviceUrl;
var CompanyUsersService = (function () {
    function CompanyUsersService(http) {
        this.http = http;
    }
    //GET/:cid
    CompanyUsersService.prototype.getCompanyUsersByCompany = function (companyId) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({});
        return this.http.get(rootURL + 'api/companyusers/' + companyId, { headers: _headers }).map(function (response) { return response.json(); });
    };
    //GET/:cid/:eid
    CompanyUsersService.prototype.getCompanyUserById = function (companyId, companyUserId) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({});
        return this.http.get(rootURL + 'api/companyusers/' + companyId + '/' + companyUserId, { headers: _headers }).map(function (response) { return response.json(); });
    };
    //PUT
    CompanyUsersService.prototype.updateCompanyUserDetails = function (companyUserId, companyUser) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ method: 'PUT', headers: _headers });
        var body = JSON.stringify(companyUser);
        var url = rootURL + 'api/companyusers/' + companyUserId;
        return this.http.put(url, body, options).map(function (response) { return response.json(); });
    };
    //POST
    CompanyUsersService.prototype.saveNewCompanyUser = function (companyUser) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ method: 'POST', headers: _headers });
        var body = JSON.stringify(companyUser);
        console.log(companyUser);
        var url = rootURL + 'api/companyusers';
        return this.http.post(url, body, options).map(function (response) { return response.json(); });
    };
    return CompanyUsersService;
}());
CompanyUsersService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], CompanyUsersService);

var _a;
//# sourceMappingURL=companyUser.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/documents.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports




var rootURL = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].serviceUrl;
var DocumentService = (function () {
    function DocumentService(http) {
        this.http = http;
    }
    DocumentService.prototype.getRejectedDocumentsForCompany = function (companyId) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({});
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ method: 'GET', headers: _headers });
        var url = rootURL + 'api/documents/rejected/' + companyId;
        return this.http.get(url, options).map(function (response) { return response.json(); });
    };
    DocumentService.prototype.getUnsignedDocumentsForCompany = function (companyId) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({});
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ method: 'GET', headers: _headers });
        var url = rootURL + 'api/documents/unsigned/' + companyId;
        return this.http.get(url, options).map(function (response) { return response.json(); });
    };
    return DocumentService;
}());
DocumentService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], DocumentService);

var _a;
//# sourceMappingURL=documents.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/employee.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//const rootURL: string = 'http://ogrean.com/nomisign/'
var rootURL = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].serviceUrl;
var EmployeeService = (function () {
    function EmployeeService(http) {
        this.http = http;
    }
    //GET/:cid
    EmployeeService.prototype.getEmployeesByCompany = function (companyId) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({});
        return this.http.get(rootURL + 'api/employees/' + companyId, { headers: _headers }).map(function (response) { return response.json(); });
    };
    //GET/:cid/:eid
    EmployeeService.prototype.getEmployeeById = function (companyId, employeeId) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({});
        return this.http.get(rootURL + 'api/employees/' + companyId + '/' + employeeId, { headers: _headers }).map(function (response) { return response.json(); });
    };
    //PUT
    EmployeeService.prototype.updateEmployeeDetails = function (employeeId, employee) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ method: 'PUT', headers: _headers });
        var body = JSON.stringify(employee);
        var url = rootURL + 'api/employees/' + employeeId;
        return this.http.put(url, body, options).map(function (response) { return response.json(); });
    };
    //POST
    EmployeeService.prototype.saveNewEmployee = function (employee) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ method: 'POST', headers: _headers });
        var body = JSON.stringify(employee);
        console.log(employee);
        var url = rootURL + 'api/employees/';
        return this.http.post(url, body, options).map(function (response) { return response.json(); });
    };
    return EmployeeService;
}());
EmployeeService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], EmployeeService);

var _a;
//# sourceMappingURL=employee.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/settings.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports




var SettingsService = (function () {
    function SettingsService(http) {
        this.http = http;
        //private rootURL: string = 'http://ogrean.com/nomisign/'
        this.rootURL = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].serviceUrl;
    }
    //GET
    SettingsService.prototype.getSystemSettings = function () {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({});
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ method: 'GET', headers: _headers });
        var url = this.rootURL + 'api/systemsettings';
        return this.http.get(url, options).map(function (response) { return response.json(); });
    };
    //PUT
    SettingsService.prototype.updateSystemSettings = function (settings) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ method: 'PUT', headers: _headers });
        var url = this.rootURL + 'api/systemsettings';
        var body = JSON.stringify(settings);
        return this.http.put(url, settings, options).map(function (response) { return response.json(); });
    };
    return SettingsService;
}());
SettingsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], SettingsService);

var _a;
//# sourceMappingURL=settings.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/upload.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular imports




var UploadService = (function () {
    function UploadService(http) {
        this.http = http;
        //private rootURL: string = 'http://ogrean.com/nomisign/'
        this.rootURL = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].serviceUrl;
    }
    UploadService.prototype.openBatch = function (rfcCode) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ method: 'POST', headers: _headers });
        var url = this.rootURL + 'api/upload/openbatch/' + rfcCode;
        return this.http.post(url, {}, options).map(function (response) { return response.json(); });
    };
    UploadService.prototype.addFile = function (file, batchId) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ method: 'POST', headers: _headers });
        var url = this.rootURL + 'api/upload/addfile/' + batchId;
        var body = JSON.stringify(file);
        return this.http.post(url, body, options).map(function (response) { return response; }); //unexpected end of JSON
    };
    UploadService.prototype.closeBatch = function (batchId) {
        var _headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ method: 'POST', headers: _headers });
        var url = this.rootURL + 'api/upload/closebatch/' + batchId;
        return this.http.post(url, {}, options).map(function (response) { return response; }); //unexpected end of JSON
    };
    return UploadService;
}());
UploadService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], UploadService);

var _a;
//# sourceMappingURL=upload.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var UserService = (function () {
    function UserService() {
        this.userUpdated = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    UserService.prototype.setUser = function (user) {
        this._user = user;
        sessionStorage.setItem('user', JSON.stringify(user));
        this.userUpdated.emit(null);
    };
    UserService.prototype.getUser = function () {
        if (this._user == null) {
            return JSON.parse(sessionStorage.getItem('user'));
        }
        return this._user;
    };
    UserService.prototype.isLoggedIn = function () {
        if (this._user != null || sessionStorage.getItem('user') != null) {
            return true;
        }
        return false;
    };
    UserService.prototype.getUserType = function () {
        var currentUser = this.getUser();
        if (currentUser != null) {
            return currentUser.UserType;
        }
        return 0;
    };
    UserService.prototype.clearUser = function () {
        sessionStorage.clear();
        this._user = null;
        this.userUpdated.emit(null);
    };
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])()
], UserService);

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: true,
    serviceUrl: "http://18.216.139.244/nomiadmin/"
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map