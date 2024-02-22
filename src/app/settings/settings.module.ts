import {NgModule} from "@angular/core";
import {SettingsComponent} from "./components/settings/settings.component";
import {SettingsRoutingModule} from "./settings.routing.module";
import {CommonModule} from "@angular/common";
import {ProfileComponent} from "./components/profile/profile.component";
import {AccountSettingsComponent} from "./components/account-settings/account-settings.component";

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ProfileComponent,
    AccountSettingsComponent
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
