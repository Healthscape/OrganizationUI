import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {AuthInterceptor} from "./auth/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(withInterceptors([
    AuthInterceptor
  ])), {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: {duration: 3000}
  }],
};
