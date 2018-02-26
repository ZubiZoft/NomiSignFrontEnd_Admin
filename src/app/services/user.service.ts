import {Injectable, EventEmitter, Output} from '@angular/core';

import {User} from '../models/user.model';

@Injectable()
export class UserService {
    public userUpdated: EventEmitter<any> = new EventEmitter();

    public setUser(user: User) {
        this._user = user;
        sessionStorage.setItem('user', JSON.stringify(user));
        this.userUpdated.emit(null);
    }

    public getUser(): any {
        if (this._user == null) {
            return JSON.parse(sessionStorage.getItem('user'));
        }
        return this._user;
    }

    public isLoggedIn(): boolean {
        if (this._user != null || sessionStorage.getItem('user') != null) {
            return true;
        }
        return false;
    }

    public getUserType(): number {
        let currentUser = this.getUser();
        if (currentUser != null) {
            return currentUser.UserType;
        }
        return 0;
    }

    public clearUser() {
        sessionStorage.clear();
        this._user = null;
        this.userUpdated.emit(null);
    }

    private _user: User;
}
