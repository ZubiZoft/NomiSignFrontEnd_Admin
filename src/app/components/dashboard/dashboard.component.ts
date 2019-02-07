import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {LoginAlertDialog} from '../login/login.component';
import {SessionTimeoutDialogComponent} from '../session-timeout-dialog/session-timeout-dialog.component';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'ng-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    systemSettings;
    isPromiseDone = false;
    env: boolean = environment.production;

    constructor(private settingsService: SettingsService, public snackBar: MatSnackBar, public dialog: MatDialog,
                private userService: UserService, private router: Router) {
        settingsService.getSystemSettings().subscribe(data => {
            this.systemSettings = data[0];
            this.isPromiseDone = true;
        });
    }

    ngOnInit(): void {
    }

    updateSettings() {
        this.settingsService.updateSystemSettings(this.systemSettings).subscribe(
            data => this.systemSettings = data,
            error => this.snackBar.open(error, '', {duration: 5000}),
            () => this.snackBar.open('Cargados Exitosamente', '', {duration: 5000})
        );
    }

    clearDemo() {
        this.settingsService.clearDemo().subscribe(data => {
            let dialogRef = this.dialog.open(LoginAlertDialog, {
                width: '50%',
                data: {'message': '¡El demo ha sido reiniciado satisfactoriamente!'}
            });
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
        });
    }
}
