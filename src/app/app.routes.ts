import {Routes} from '@angular/router';
import {AuthComponent} from "./auth/components/auth/auth.component";
import {BlankPageComponent} from "./blank-page/blank-page/blank-page.component";
import {HomeComponent} from "./home/components/home/home.component";
import {PatientsComponent} from "./patients/components/patients/patients.component";
import {UsersComponent} from "./users/components/users/users.component";
import {RequestsOverviewComponent} from "./access-requests/components/requests-overview/requests-overview.component";
import {AccessGuard} from "./access.guard";
import {PatientRecordComponent} from "./records/components/patient-record/patient-record.component";

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
                path: 'requests',
                data: {
                    breadcrumb: 'Access Requests'
                },
                component: RequestsOverviewComponent,
                children: [
                    {
                        path: 'pending',
                        data: {
                            breadcrumb: 'Pending'
                        },
                        component: RequestsOverviewComponent,
                    },
                    {
                        path: 'denied',
                        data: {
                            breadcrumb: 'Denied'
                        },
                        component: RequestsOverviewComponent,
                    },
                    {
                        path: 'one-time',
                        data: {
                            breadcrumb: 'One time'
                        },
                        component: RequestsOverviewComponent,
                    },
                    {
                        path: 'unlimited',
                        data: {
                            breadcrumb: 'Unlimited'
                        },
                        component: RequestsOverviewComponent,
                    },
                ]
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
            }
        ]
    },
    {
        path: 'blank-page',
        component: BlankPageComponent,
        canActivate: []
    },
];
