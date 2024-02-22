import {inject, Injectable, OnDestroy} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateFn, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "./auth/services/auth.service";
import {UserService} from "./auth/services/user.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class PermissionsService implements OnDestroy {

  subs: Subscription[] = []
  private _helper = new JwtHelperService();

  constructor(private router: Router, private _authService: AuthService, private _userService: UserService) {
  }

  ngOnDestroy() {
    for (let sub of this.subs) {
      sub.unsubscribe()
    }
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiresLogin = route.data['requiresLogin'];
    const roles = route.data['roles'];
    const isTokenAvailable = sessionStorage.getItem('access_token') != null && sessionStorage.getItem('access_token') != "";
    if (requiresLogin) {
      if (!this.isTokenValid(isTokenAvailable, roles)) {
        this.router.navigate(['']).then()
        return false;
      }
    }
    return true;
  }

  private isTokenValid(isTokenAvailable: boolean, roles: Array<string>) {
    let retValue = true;
    if (!isTokenAvailable) {
      retValue = false;
    } else {
      if (this._helper.isTokenExpired(sessionStorage.getItem('access_token')!)) {
        this.logOutUser();
        retValue = false;
      } else {
        retValue = this.isRequiredRole(roles);
      }
    }
    return retValue
  }

  private logOutUser() {
    sessionStorage.clear()
    this._authService.logInUserChanged.next(false)
  }

  private isRequiredRole(roles: Array<string>) {
    return roles.includes(this._helper.decodeToken(sessionStorage.getItem('access_token')!)['roles']);
  }
}

export const AccessGuard: CanActivateFn = (next: ActivatedRouteSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next);
}
