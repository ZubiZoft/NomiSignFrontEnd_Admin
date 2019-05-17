import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-employee-bar',
    templateUrl: './employee-bar.component.html',
    styleUrls: ['./employee-bar.component.css']
})
export class EmployeeBarComponent implements OnInit {

    @Input()
    public companyId: number;

    public newF = false;
    public unregisteredF = false;
    public registeredF = false;
    public inactiveF = false;
    public searchF = false;

    constructor(private router: Router) {
    }

    ngOnInit() {
        if (this.router.url.includes('new')) {
            this.newF = true;
            sessionStorage.removeItem('receiptSearch');
            sessionStorage.removeItem('employeeSearch');
        } else if (this.router.url.includes('unregistered')) {
            this.unregisteredF = true;
            sessionStorage.removeItem('receiptSearch');
            sessionStorage.removeItem('employeeSearch');
        } else if (this.router.url.includes('registered')) {
            this.registeredF = true;
            sessionStorage.removeItem('receiptSearch');
            sessionStorage.removeItem('employeeSearch');
        } else if (this.router.url.includes('inactive')) {
            this.inactiveF = true;
            sessionStorage.removeItem('receiptSearch');
            sessionStorage.removeItem('employeeSearch');
        } else if (this.router.url.includes('search')) {
            this.searchF = true;
        }
    }
}
