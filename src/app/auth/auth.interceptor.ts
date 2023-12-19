import {HttpInterceptorFn} from "@angular/common/http";
import {TokenService} from "./services/token.service";
import {inject} from "@angular/core";

export const AuthInterceptor: HttpInterceptorFn = (req, next) =>{
  let tokenService = inject(TokenService);
  let authReq = req.clone();
  const token = tokenService.getToken();
  if (token != null) {
    authReq = req.clone({
      headers:req.headers.set('Authorization',token)
    })
  }

  return next(authReq);
}
