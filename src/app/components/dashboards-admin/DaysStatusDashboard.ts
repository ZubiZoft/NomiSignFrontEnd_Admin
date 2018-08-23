import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {DashboardsService} from './../../services/dashboards.service';
import {SessionTimeoutDialogComponent} from '../session-timeout-dialog/session-timeout-dialog.component';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog} from '@angular/material';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {DateAdapter} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

declare var google: any;

@Component({
    selector: 'days-status',
    template: `
        <div class="row justify-content-md-center" [hidden]="!loader">
            <div class="col-md-auto">
                <mat-spinner></mat-spinner>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div id="chart_divEvolution" style="width: 100%; height: 450px;"></div>
                <p class="text-right font-weight-bold" style="font-size: 14px;" [hidden]="loader">Día Inicial: {{date | date:'shortDate':'':'mx'}}</p>
            </div>
        </div>
    `,
    providers: [{
        provide: LOCALE_ID, useValue: 'es-MX'
    }, {
        provide: MAT_DATE_LOCALE, useValue: 'es-MX'
    }, {
        provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]
    }, {
        provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS
    }]
})
export class DaysStatusDashboard implements OnInit {
    private static googleLoaded: any;
    private options;
    private data;
    private chart;
    private view;
    private date: Date;
    private loader = true;

    constructor(private dashboardService: DashboardsService, public dialog: MatDialog,
                private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        if (!DaysStatusDashboard.googleLoaded) {
            DaysStatusDashboard.googleLoaded = true;
            google.charts.load('current', {packages: ['corechart', 'bar']});
        }
        this.dashboardService.getDaysStatusCAdmin().subscribe(
            data => {
                this.loader = false;
                google.charts.setOnLoadCallback(() => this.drawGraph(data.InitialDate, data.PassDays, data.LeftDays));
            }, error => {
                if (error.status === 405) {
                    this.dialog.closeAll();
                    let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                        width: '75%'
                    });
                } else {
                    this.userService.clearUser();
                    this.router.navigate(['/login']);
                }
            }
        );
    }

    drawGraph(initalDate, daysToNow, leftDays) {
        this.date = initalDate;

        this.data = this.createDataTable([
            ['Balance', 'Días Transcurridos', 'Días Restantes', {role: 'annotation'}],
            ['Días', daysToNow, leftDays, '']
        ]);

        this.view = new google.visualization.DataView(this.data);

        this.view.setColumns([0, 1, {
            calc: 'stringify',
            sourceColumn: 1,
            type: 'string',
            role: 'annotation'
        }, 2, {
            calc: 'stringify',
            sourceColumn: 2,
            type: 'string',
            role: 'annotation'
        }]);

        this.options = {
            title: 'Días para Expirar',
            titlePosition: 'In',
            titleTextStyle: {
                fontSize: 20
            },
            isStacked: true,
            haxis: {
                minValue: 0
            },
            series: {
                0: {color: '#80ADD7'},
                1: {color: '#2CBBC3'},
                2: {color: '#B7C46E'}
            }
        };

        this.chart = this.createBarChart(document.getElementById('chart_divEvolution'));
        this.chart.draw(this.view, this.options);
    }

    createBarChart(element: any): any {
        return new google.visualization.BarChart(element);
    }

    createDataTable(array: any[]): any {
        return google.visualization.arrayToDataTable(array);
    }
}
