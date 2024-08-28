import {Routes} from '@angular/router';
import {AuthComponent} from "./auth/components/auth/auth.component";
import {BlankPageComponent} from "./blank-page/blank-page/blank-page.component";
import {HomeComponent} from "./home/components/home/home.component";
import {PatientsComponent} from "./patients/components/patients/patients.component";
import {UsersComponent} from "./users/components/users/users.component";
import {AccessGuard} from "./access.guard";
import {PatientRecordComponent} from "./records/components/patient-record/patient-record.component";
import { PatientDashboardComponent } from './dashboard/components/patient-dashboard/patient-dashboard.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { MedicationsOverviewComponent } from './records/components/record-overview/components/medications-overview/medications-overview.component';
import { MedicationsComponent } from './records/components/patient-record/components/medications/medications.component';
import { EncountersComponent } from './records/components/patient-record/components/encounters/encounters.component';

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
                path: '',
                component: DashboardComponent,
            },
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
            },
            {
                path: 'profile',
                data: {
                    breadcrumb: 'Profile',
                },
                loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
            },
            {
                path: 'records',
                data: {
                    breadcrumb: 'Records',
                },
                loadChildren: () => import('./records/records.module').then(m => m.RecordsModule),
            },
            {
                path: 'record-overview',
                data: {
                    breadcrumb: 'Record Overview',
                },
                component: PatientRecordComponent
            },
            {
                path: 'medications',
                data: {
                    breadcrumb: 'Medications Overview',
                },
                component: MedicationsComponent
            },
            {
                path: 'encounters',
                data: {
                    breadcrumb: 'Encounter Overview',
                },
                component: EncountersComponent
            }
        ]
    },
    {
        path: 'blank-page',
        component: BlankPageComponent,
        canActivate: []
    },
];
