import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dashboards-admin',
    templateUrl: './dashboards-admin.component.html',
    styleUrls: ['./dashboards-admin.component.css']
})
export class DashboardsAdminComponent implements OnInit {

    public chart = 'EmployeeByStatus';
    private sections = ['EmployeeByStatus'
            , 'ReceiptsByStatus'
            , 'SignaturesStatus'
            , 'DaysStatus'
        ];
    private index = 0;

    constructor() {
    }

    ngOnInit() {
    }

    next() {
        this.index++;
        this.index = this.index % this.sections.length;
        this.chart = this.sections[this.index];
    }

    prev() {
        this.index--;
        if (this.index < 0)
        {
            this.index = this.sections.length - 1;
        }
        this.index = Math.abs(this.index % this.sections.length);
        this.chart = this.sections[this.index];
    }
}
