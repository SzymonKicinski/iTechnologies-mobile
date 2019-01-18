import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
    private _currentUser;
    private _authorizationUser;
    private _role;

    private _currentTheme = 'success';

    searchUser;
    private _isAdmin = false;

    constructor() {
    }

    get currentUser(): any {
        console.log(localStorage);
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        this.currentUser = user;
        return user;
    }

    set currentUser(value) {
        const user = JSON.stringify(value);
        this._currentUser = user;
        localStorage.setItem('user', user);
    }

    get authorizationUser(): any {
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        this.authorizationUser = user;
        return user;
    }

    set authorizationUser(value) {
        const user = JSON.stringify(value);
        this._authorizationUser = user;
        localStorage.setItem('user', user);
    }

    get role() {
        let role = localStorage.getItem('role');
        role = JSON.parse(role);
        this.role = role;
        return role;
    }

    set role(value) {
        const role = JSON.stringify(value);
        this._role = role;
        localStorage.setItem('role', role);
    }

    get currentTheme(): string {
        return this._currentTheme;
    }

    set currentTheme(value: string) {
        this._currentTheme = value;
    }

    get isAdmin(): boolean {
        let isAdmin: any = localStorage.getItem('isAdmin');
        isAdmin = JSON.parse(isAdmin);
        this.isAdmin = isAdmin;
        return this._isAdmin;
    }

    set isAdmin(value: boolean) {
        const isAdmin = JSON.stringify(value);
        this._isAdmin = value;
        localStorage.setItem('isAdmin', isAdmin);
    }
}
