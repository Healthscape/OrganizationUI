import {Routes} from '@angular/router';
import {HomeComponent} from "./auth/components/home/home.component";
import {BlankPageComponent} from "./blank-page/blank-page/blank-page.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: []
  },
  {
    path: 'blank-page',
    component: BlankPageComponent,
    canActivate: []
  },
];
