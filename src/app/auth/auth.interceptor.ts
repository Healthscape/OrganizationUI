import {HttpInterceptorFn} from "@angular/common/http";
import {TokenService} from "./services/token.service";
import {inject} from "@angular/core";

// export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
//   let tokenService = inject(TokenService);
//   let authReq = req.clone();
//   const token = tokenService.getToken();
//   if (token != null) {
//     authReq = req.clone({
//       headers: req.headers.set('Authorization', token)
//     })
//   }
//
//   return next(authReq);
// }

import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {LoadingService} from "./services/loading.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private tokenService: TokenService, private authService: AuthService, private _loadingService: LoadingService, private router: Router) {
  }

  private static addTokenHeader(request: HttpRequest<any>, token: string) {
    if (request.headers.get('Content-Type')) {
      let newHeaders = request.headers.delete('Content-Type')
      newHeaders = newHeaders.set('Accept', 'application/json');
      newHeaders = newHeaders.set('Authorization', 'Bearer ' + token);
      return request.clone({
        headers: newHeaders
      });
    }
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let delayExpired = false;

    const timeout = setTimeout(() => {
      delayExpired = true;
      this._loadingService.loading.next(req);
    }, 100);

    if (req.url.includes('refresh')) {
      return next.handle(req)
    }

    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = AuthInterceptor.addTokenHeader(req, token);
    }
    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          clearTimeout(timeout);
          if (delayExpired) {
            this._loadingService.loading.next(req);
          }
        }
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(error);
      }));
  }



  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.tokenService.getRefreshToken();
      if (token) {
        return this.authService.refreshToken(token).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.tokenService.saveToken(token.access_token);
            this.refreshTokenSubject.next(token.access_token);

            return next.handle(AuthInterceptor.addTokenHeader(request, token.access_token));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this.tokenService.signOut();
            this.authService.logInUserChanged.next(false)
            this.router.navigate(['/login']).then()
            return throwError(err);
          })
        );
      }

    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(AuthInterceptor.addTokenHeader(request, token)))
    );
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
