import {Component, OnInit} from '@angular/core';
import {DashboardsService} from './../../services/dashboards.service';
import {SessionTimeoutDialogComponent} from '../session-timeout-dialog/session-timeout-dialog.component';
import {MatDialog} from '@angular/material';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

declare var google: any;

@Component({
    selector: 'receipts-by-status',
    template: `
        <div class="row justify-content-md-center" [hidden]="!loader">
            <div class="col-md-auto">
                <mat-spinner></mat-spinner>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div id="chart_divEvolution" style="width: 100%; height: 450px;"></div>
                <p class="text-right font-weight-bold" style="font-size: 14px;" [hidden]="loader">Total de Recibos: {{total}}</p>
            </div>
        </div>
    `
})
export class ReceiptsByStatusDashboard implements OnInit {
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
        if (!ReceiptsByStatusDashboard.googleLoaded) {
            ReceiptsByStatusDashboard.googleLoaded = true;
            google.charts.load('current', {packages: ['corechart', 'bar']});
        }
        this.dashboardService.getReceiptsbyStatusCAdmin().subscribe(
            data => {
                this.loader = false;
                google.charts.setOnLoadCallback(() => this.drawGraph(data.UnsignedReceipts, data.SignedReceipts,
                    data.RejectedReceipts));
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

    drawGraph(unsigned, signed, rejected) {
        this.total = unsigned + signed + rejected;

        this.data = this.createDataTable([
            ['Estatus', 'Receipts (#)'],
            ['Sin Firmar (' + unsigned + ')', unsigned],
            ['Firmados (' + signed + ')', signed],
            ['Rechazados (' + rejected + ')', rejected]
        ]);

        this.view = new google.visualization.DataView(this.data);

        this.options = {
            title: 'No. de Recibos por Estatus',
            titlePosition: 'In',
            titleTextStyle: {
                fontSize: 20
            },
            colors: ['#80ADD7', '#2CBBC3', '#B7C46E'],
            pieSliceText: 'percentage',
            tooltip: {
                text: 'percentage',
                showColorCode: true
            }
        };

        this.chart = this.createPieChart(document.getElementById('chart_divEvolution'));
        this.chart.draw(this.view, this.options);
    }

    createPieChart(element: any): any {
        return new google.visualization.PieChart(element);
    }

    createDataTable(array: any[]): any {
        return google.visualization.arrayToDataTable(array);
    }
}
