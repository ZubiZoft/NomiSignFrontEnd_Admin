import { Component } from '@angular/core';

import { AlertComponent } from '../alert/alert.component'

import { SettingsService } from '../../services/settings.service'

//angular material imports
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'ng-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  systemSettings
  isPromiseDone: boolean = false

  constructor(private settingsService: SettingsService,  public snackBar: MatSnackBar) {
    settingsService.getSystemSettings().subscribe(data => {
      this.systemSettings = data[0]
      this.isPromiseDone = true;
    })
   }

   updateSettings(){
     this.settingsService.updateSystemSettings(this.systemSettings).subscribe(
       data => this.systemSettings = data,
      error => this.snackBar.open(error, "", {duration: 5000}),
      () => this.snackBar.open("Updated Successfully", "", {duration: 5000})
      )
    }
}
