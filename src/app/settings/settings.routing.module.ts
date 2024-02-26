import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SettingsComponent} from "./components/settings/settings.component";
import {UpdateInfoComponent} from "./components/update-info/update-info.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: '',
    },
    component: SettingsComponent
  },
  {
    path: 'profile',
    data: {
      breadcrumb: 'Information'
    },
    component: UpdateInfoComponent
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
