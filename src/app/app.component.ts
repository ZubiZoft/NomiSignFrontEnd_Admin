import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';
import {SettingsService} from './services/settings.service';
import {SessionTimeoutDialogComponent} from './components/session-timeout-dialog/session-timeout-dialog.component';
import {MatDialog} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [SettingsService]
})
export class AppComponent implements OnInit {
    title: string;
    url = this.router.url;
    appName: string;
    user: any;
    logoImage: any;

    constructor(private router: Router, private settingsService: SettingsService, private userService: UserService,
                public dialog: MatDialog, public _sanitizer: DomSanitizer) {
        settingsService.getSystemSettings().subscribe(data => this.appName = data[0].ProductName);
        this.getCurrentUser();
        if (this.user != null) {
            this.settingsService.getCompanyLogo(this.user.CompanyId).subscribe(
                data => {
                    this.logoImage = data;
                }, error => {
                    if (error.status === 405) {
                        this.dialog.closeAll();
                        let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                            width: '75%'
                        });
                    }
                }
            );
        }
        userService.userUpdated.subscribe(value => {
            this.getCurrentUser();
        });
    }

    ngOnInit() {
    }

    getCurrentUser() {
        let user = this.userService.getUser();
        if (user) {
            this.user = user;
        } else {
            this.user = null;
        }
    }

    setTitle(title) {
        this.title = title;
    }


    logout() {
        this.userService.clearUser();
        this.user = null;
        this.router.navigate(['/login']);
    }

}
