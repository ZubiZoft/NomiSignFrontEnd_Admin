import {Component} from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {LoginAlertDialog} from '../login/login.component';

@Component({
    selector: 'ng-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    systemSettings;
    isPromiseDone = false;

    constructor(private settingsService: SettingsService, public snackBar: MatSnackBar, public dialog: MatDialog) {
        settingsService.getSystemSettings().subscribe(data => {
            this.systemSettings = data[0];
            this.isPromiseDone = true;
        });
    }

    updateSettings() {
        this.settingsService.updateSystemSettings(this.systemSettings).subscribe(
            data => this.systemSettings = data,
            error => this.snackBar.open(error, '', {duration: 5000}),
            () => this.snackBar.open('Successfully Updated', '', {duration: 5000})
        );
    }

    clearDemo() {
        this.settingsService.clearDemo().subscribe(data => {
            let dialogRef = this.dialog.open(LoginAlertDialog, {
                width: '50%',
                data: {'message': '¡El demo ha sido reiniciado satisfactoriamente!'}
            });
        });
    }
}
