import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SettingsComponent} from "./components/settings/settings.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {UpdateAccountInfoComponent} from "./components/update-account-info/update-account-info.component";

const routes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: '',
        },
        component: SettingsComponent
    },
    {
        path: 'edit',
        data: {
            breadcrumb: 'Information'
        },
        component: UpdateAccountInfoComponent
    },
    {
        path: 'password',
        data: {
            breadcrumb: 'Email & Password'
        },
        component: ChangePasswordComponent
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SettingsRoutingModule {
}
