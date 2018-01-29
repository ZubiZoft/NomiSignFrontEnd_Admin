//angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { UserService } from './services/user.service'
import { SettingsService } from './services/settings.service'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SettingsService ]
})
export class AppComponent implements OnInit {
  title :string;
  url = this.router.url
  appName: string
  user : any
  smallScreen: boolean = false;

  constructor(private router: Router, private settingsService: SettingsService, private userService: UserService, private breakpointObserver: BreakpointObserver) {
    settingsService.getSystemSettings().subscribe(data => this.appName = data[0].ProductName)
    this.getCurrentUser()
    userService.userUpdated.subscribe(value => {
      this.getCurrentUser()
    })
    
    const layoutChanges = breakpointObserver.observe([
      '(max-width: 780px)',
    ]);
    
    layoutChanges.subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  ngOnInit(){

  }

  getCurrentUser(){
    let user = this.userService.getUser()
    if (user){
      this.user = user;
    }  
    else{
      this.user = null
    }
  }

  setTitle(title) {
    this.title = title
  }


  logout(){
    this.userService.clearUser();
    this.user = null;
    this.router.navigate(['/login'])
  }

}
