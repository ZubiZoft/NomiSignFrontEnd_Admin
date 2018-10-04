import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {DashboardsService} from './../../services/dashboards.service';
import {SessionTimeoutDialogComponent} from '../session-timeout-dialog/session-timeout-dialog.component';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog} from '@angular/material';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {DateAdapter} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {CounterRejectedbyperiodModel} from '../../models/counter.rejectedbyperiod.model';
import {DatePipe} from '@angular/common';

declare var google: any;

@Component({
    selector: 'rejected-by-period',
    template: `
        <div class="row justify-content-md-center" [hidden]="!loader">
            <div class="col-md-auto">
                <mat-spinner></mat-spinner>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div id="chart_divEvolution" style="width: 100%; height: 450px;"></div>
                <p class="text-right font-weight-bold" style="font-size: 14px;" *ngIf="!loader">Total de Recibos Rechazados: {{total}}</p>
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
    }, DatePipe]
})
export class RejectedEmployeesByPeriod implements OnInit {
    private static googleLoaded: any;
    private options;
    private data;
    private chart;
    private view;
    private loader = true;
    private total = 0;

    constructor(private dashboardService: DashboardsService, public dialog: MatDialog,
                private userService: UserService, private router: Router, private locale: DatePipe) {
    }

    ngOnInit() {
        if (!RejectedEmployeesByPeriod.googleLoaded) {
            RejectedEmployeesByPeriod.googleLoaded = true;
            google.charts.load('current', {packages: ['corechart', 'bar']});
        }
        this.dashboardService.getReceiptsRejectedByPeriod().subscribe(
            data => {
                this.loader = false;
                google.charts.setOnLoadCallback(() => this.drawGraph(data));
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

    drawGraph(counter: CounterRejectedbyperiodModel[]) {
        let valuesArr = [];

        valuesArr.push(['Período', 'Recibos Rechazados', {role: 'style'}]);

        const colors = ['#80ADD7', '#2CBBC3', '#B7C46E', '#C46C54'];

        for (const a of counter) {
            valuesArr.push([this.locale.transform(a.PayPeriod, 'dd/MM/yyyy'), a.Count, colors[this.total % colors.length]]);
            this.total++;
        }

        if (counter.length < 1) {
            valuesArr.push(['Período Actual', 0, colors[this.total % colors.length]]);
        }

        this.data = this.createDataTable(valuesArr);

        this.view = new google.visualization.DataView(this.data);

        this.view.setColumns([0, 1, {
            calc: 'stringify',
            sourceColumn: 1,
            type: 'string',
            role: 'annotation'
        }, 2]);

        this.options = {
            title: 'Recibos Rechazados por Período',
            bar: { groupWidth: '95%' },
            legend: { position: 'none' },
            hAxis: { format: 'decimal' }
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
