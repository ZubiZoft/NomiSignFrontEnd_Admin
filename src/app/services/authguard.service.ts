import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service'

@Injectable()
export class CAdminAuthGuard {

  constructor( private userService : UserService, private router : Router ) {
  }

  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
    if (this.userService.isLoggedIn()){
      let user = this.userService.getUser();

      if (user.UserStatus === 6){
        return true;
      }

        if (user.UserStatus >= 5){
          if (user.CompanyId === +route.params.cid){
            return true;
          }
        }
    } else {
      this.router.navigate(['/login']);
      return false;
    } 
    this.router.navigate(['/notFound']);
    return false;
  }
}

@Injectable()
export class UserAuthGuard {

  constructor( private userService : UserService, private router : Router ) {
  }

  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
    if (this.userService.isLoggedIn()) {
      let user = this.userService.getUser();

      if (user.UserStatus === 6){
        return true;
      }

      if (user.UserStatus === 2 || user.UserStatus >= 5){
        if (user.CompanyId === +route.params.cid){
          return true;
        }
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
    this.router.navigate(['/notFound']);
    return false;
  }
}

@Injectable()
export class GAdminAuthGuard {

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