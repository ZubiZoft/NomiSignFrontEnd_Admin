import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user.service'

@Injectable()
export class GAuthGuard {

  constructor( private userService : UserService, private router : Router ) {
  }

  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
    if (this.userService.isLoggedIn()){
       if (this.userService.getUserStatus() === 6){
         return true;
       }
       console.log(this.userService.getUserStatus())
    } 
    this.router.navigate(['/login']);
    return false;
  }
}