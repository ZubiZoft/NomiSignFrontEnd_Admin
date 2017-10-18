//angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { UserService } from './services/user.service'
import { SettingsService } from './services/settings.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SettingsService ]
})
export class AppComponent implements OnInit {
  title :string;
  url = this.router.url
  username : string
  appName: string

  constructor(private router: Router, private settingsService: SettingsService, private userService: UserService) {
    settingsService.getSystemSettings().subscribe(data => this.appName = data[0].ProductName)
    this.getCurrentUser()
    userService.userUpdated.subscribe(value => {
      this.getCurrentUser()
    })
    
  }

  ngOnInit(){

  }

  getCurrentUser(){
    let user = this.userService.getUser()
    if (user){
      this.username = user.EmailAddress;
    }     
  }

  setTitle(title) {
    this.title = title
  }


  logout(){
    this.setTitle('Log In')
    this.userService.clearUser();
    this.router.navigate(['/login'])
  }

}
