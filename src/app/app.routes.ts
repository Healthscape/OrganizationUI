import { Routes } from '@angular/router';
import {HomeComponent} from "./auth/components/home/home.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {requiresLogin: false},
    canActivate: [],
    children: [
      {
        path: 'login',
        component: HomeComponent
      },

      {
        path: 'register',
        component: HomeComponent
      }
    ]
  },
];
