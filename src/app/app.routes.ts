import {Routes} from '@angular/router';
import {AuthComponent} from "./auth/components/auth/auth.component";
import {BlankPageComponent} from "./blank-page/blank-page/blank-page.component";
import {HomeComponent} from "./home/components/home/home.component";
import {PatientsComponent} from "./patients/components/patients/patients.component";

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    data: {
      breadcrumb: null
    },
  },
  {
    path: 'home',
    component: HomeComponent,
    children:[
      {
        path: 'patients',
        data: {
          breadcrumb: 'Patients'
        },
        loadChildren: () => import('./home/main.window.module').then(m => m.MainWindowModule)
      }
    ]
  },
  {
    path: 'blank-page',
    component: BlankPageComponent,
    canActivate: []
  },
];
