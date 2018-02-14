import {Component} from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'ng-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    systemSettings;
    isPromiseDone = false;

    constructor(private settingsService: SettingsService, public snackBar: MatSnackBar) {
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
}
