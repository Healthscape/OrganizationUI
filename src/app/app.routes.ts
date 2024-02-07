import {Routes} from '@angular/router';
import {AuthComponent} from "./auth/components/auth/auth.component";
import {BlankPageComponent} from "./blank-page/blank-page/blank-page.component";
import {HomeComponent} from "./home/components/home/home.component";

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: []
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: []
  },
  {
    path: 'blank-page',
    component: BlankPageComponent,
    canActivate: []
  },
];
