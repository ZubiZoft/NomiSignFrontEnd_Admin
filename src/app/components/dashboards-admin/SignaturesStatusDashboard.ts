import {Component, OnInit} from '@angular/core';
import {DashboardsService} from './../../services/dashboards.service';
import {SessionTimeoutDialogComponent} from '../session-timeout-dialog/session-timeout-dialog.component';
import {MatDialog} from '@angular/material';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

declare var google: any;

@Component({
    selector: 'signatures-status',
    template: `
        <div class="row justify-content-md-center" [hidden]="!loader">
            <div class="col-md-auto">
                <mat-spinner></mat-spinner>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div id="chart_divEvolution" style="width: 100%; height: 450px;"></div>
                <p class="text-right font-weight-bold" style="font-size: 14px;" [hidden]="loader">Total de Firmas: {{total}}</p>
            </div>
        </div>
    `
})
export class SignaturesStatusDashboard implements OnInit {
    private static googleLoaded: any;
    private options;
    private data;
    private chart;
    private view;
    private total = 0;
    private loader = true;

    constructor(private dashboardService: DashboardsService, public dialog: MatDialog,
                private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        if (!SignaturesStatusDashboard.googleLoaded) {
            SignaturesStatusDashboard.googleLoaded = true;
            google.charts.load('current', {packages: ['corechart', 'bar']});
        }
        this.dashboardService.getSignaturesStatusCAdmin().subscribe(
            data => {
                this.loader = false;
                google.charts.setOnLoadCallback(() => this.drawGraph(data.TotalSignatures, data.AvailableSignatures,
                    data.TotalSMS, data.AvailableSMS));
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

    drawGraph(totalSignatures, leftSignatures, totalSMS, leftSMS) {
        this.total = totalSignatures;

        this.data = this.createDataTable([
            ['Balance', 'Restantes', 'Utilizadas', {role: 'annotation'}],
            ['Firmas', leftSignatures, totalSignatures - leftSignatures, ''],
            ['SMS', leftSMS, totalSMS - leftSMS, '']
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
            title: 'Estatus de Firmas',
            titlePosition: 'In',
            titleTextStyle: {
                fontSize: 20
            },
            isStacked: 'percent',
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
