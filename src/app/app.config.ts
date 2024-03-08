import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {PermissionsService} from "./access.guard";
import {provideEnvironmentNgxMask} from "ngx-mask";
import {MatNativeDateModule} from "@angular/material/core";

export const appConfig: ApplicationConfig = {
  providers: [provideEnvironmentNgxMask(),
    provideRouter(routes), provideAnimations(), provideHttpClient(withInterceptorsFromDi()),importProvidersFrom(MatNativeDateModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 3000},
    }, PermissionsService],
};
