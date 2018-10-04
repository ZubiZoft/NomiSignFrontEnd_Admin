import {Component, OnInit} from '@angular/core';
import {DashboardsService} from './../../services/dashboards.service';
import {SessionTimeoutDialogComponent} from '../session-timeout-dialog/session-timeout-dialog.component';
import {MatDialog} from '@angular/material';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

declare var google: any;

@Component({
    selector: 'employees-by-status',
    template: `
        <div class="row justify-content-md-center" *ngIf="loader">
            <div class="col-md-auto">
                <mat-spinner></mat-spinner>
            </div>
        </div>
        <div class="row justify-content-md-center">
            <div class="col">
                <div id="chart_divEvolution" style="width: 100%; height: 450px;"></div>
                <p class="text-right font-weight-bold" style="font-size: 14px;" *ngIf="!loader">Total de Empleados: {{total}}</p>
            </div>
        </div>
    `
})
export class EmployeesByStatusDashboard implements OnInit {
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
        if (!EmployeesByStatusDashboard.googleLoaded) {
            EmployeesByStatusDashboard.googleLoaded = true;
            google.charts.load('current', {packages: ['corechart', 'bar']});
        }
        this.dashboardService.getEmployeesbyStatusCAdmin().subscribe(
            data => {
                this.loader = false;
                google.charts.setOnLoadCallback(() => this.drawGraph(data.NewEmployees, data.UnregisterEmployees,
                    data.RegisterEmployees, data.InactiveEmloyees));
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

    drawGraph(newEmp, unregistedEmp, registedEmp, inactiveEmp) {
        this.total = newEmp + unregistedEmp + registedEmp + inactiveEmp;

        this.data = this.createDataTable([
            ['Estatus', 'No. de Empleados', {role: 'style'}],
            ['Nuevos', newEmp, '#80ADD7'],
            ['No Registrados', unregistedEmp, '#2CBBC3'],
            ['Registrados', registedEmp, '#B7C46E'],
            ['Inactivos', inactiveEmp, '#C46C54']
        ]);

        this.view = new google.visualization.DataView(this.data);
        this.view.setColumns([0, 1, {
            calc: 'stringify',
            sourceColumn: 1,
            type: 'string',
            role: 'annotation'
        }, 2]);

        this.options = {
            title: 'No. de Empleados por Estatus',
            titlePosition: 'In',
            titleTextStyle: {
                fontSize: 20
            },
            hAxis: {
                title: 'No. de Empleados',
                minValue: 0,
                format: 'decimal'
            },
            vAxis: {
                title: 'Estatus'
            },
            legend: {position: 'none'}
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
