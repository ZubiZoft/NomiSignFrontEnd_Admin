//angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { UserService } from '../../../services/user.service'
import { SettingsService } from '../../../services/settings.service'

@Component({
  selector: 'company-admin-navbar',
  templateUrl: './company-admin.navbar.component.html',
  styleUrls: ['./company-admin.navbar.component.css'],
  providers: [SettingsService ]
})
export class CompanyAdminNavbarComponent implements OnInit {
  title :string;
  url = this.router.url
  appName: string
  user : any

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
      this.user = user;
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
