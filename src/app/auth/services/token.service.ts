import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private _helper = new JwtHelperService();

    constructor() {
    }

    getSubjectFromToken(): string {
        return this._helper.decodeToken(sessionStorage.getItem(TOKEN_KEY)!)['sub'];
    }

    isAdmin(): boolean {
        return this._helper.decodeToken(sessionStorage.getItem(TOKEN_KEY)!)['roles'] == 'ROLE_ADMIN';
    }

    getRoleFromToken(): string {
        return this._helper.decodeToken(sessionStorage.getItem(TOKEN_KEY)!)['roles'];
    }

    isTokenExpired() {
        return this._helper.isTokenExpired(sessionStorage.getItem(TOKEN_KEY)!);
    }

    signOut(): void {
        window.sessionStorage.clear();
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
        const user = this.getUser();
        if (user.id) {
            this.saveUser({...user, accessToken: token});
        }
    }

    public getToken(): string | null {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    public saveRefreshToken(token: string): void {
        window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
        window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
    }

    public getRefreshToken(): string | null {
        return window.sessionStorage.getItem(REFRESH_TOKEN_KEY);
    }

    public saveUser(user: any): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }
        return {};
    }
}
