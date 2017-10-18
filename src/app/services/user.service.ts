import { Injectable, EventEmitter, Output } from '@angular/core';

import { User } from '../models/user.model'

@Injectable()
export class UserService {
    public userUpdated: EventEmitter<any> = new EventEmitter()

    public setUser( user: User) {       
        this._user = user
        sessionStorage.setItem('user', JSON.stringify(user))
        this.userUpdated.emit(null)        
    }

    public getUser (): any{
        if (this._user == null){
            console.log(this._user)
            console.log(sessionStorage.getItem('user'))
            return JSON.parse(sessionStorage.getItem('user'))
        }
        return this._user
    }

    public isLoggedIn(): boolean{
        if (this._user != null || sessionStorage.getItem('user') != null){
            return true;
        }
        return false;
    }

    public getUserStatus(): number {
        let currentUser = this.getUser()
        if (currentUser != null){
            return currentUser.UserStatus
        }
        return 0;
    }

    public clearUser(){
        sessionStorage.clear()
        this._user= new User();
        this.userUpdated.emit(null)
    }

    private _user : User 
}
