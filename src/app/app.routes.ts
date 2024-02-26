import {Routes} from '@angular/router';
import {AuthComponent} from "./auth/components/auth/auth.component";
import {BlankPageComponent} from "./blank-page/blank-page/blank-page.component";
import {HomeComponent} from "./home/components/home/home.component";
import {AccessGuard} from "./access.guard";
import {PatientsComponent} from "./patients/components/patients/patients.component";
import {UsersComponent} from "./users/components/users/users.component";

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AccessGuard],
    data: {
      breadcrumb: null,
      requiresLogin: false
    },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AccessGuard],
    data: {
      requiresLogin: true,
      roles: ['ROLE_ADMIN', 'ROLE_PATIENT', 'ROLE_PRACTITIONER']
    },
    children: [
      {
        path: 'patients',
        data: {
          breadcrumb: 'Patients'
        },
        component: PatientsComponent
      },
      {
        path: 'users',
        data: {
          breadcrumb: 'Users'
        },
        component: UsersComponent
      },
      {
        path: 'settings',
        data: {
          breadcrumb: 'Settings',
        },
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),

      }
    ]
  },
  {
    path: 'blank-page',
    component: BlankPageComponent,
    canActivate: []
  },
];
