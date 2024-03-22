import {NgModule} from "@angular/core";
import {SettingsComponent} from "./components/settings/settings.component";
import {SettingsRoutingModule} from "./settings.routing.module";
import {CommonModule} from "@angular/common";
import {ProfileInfoComponent} from "../profile/components/profile-info/profile-info.component";
import {AccountSettingsComponent} from "./components/account-settings/account-settings.component";
import {AccountInfoComponent} from "./components/account-info/account-info.component";

@NgModule({
    imports: [
        CommonModule,
        SettingsRoutingModule,
        ProfileInfoComponent,
        AccountSettingsComponent,
        AccountInfoComponent
    ],
    declarations: [SettingsComponent]
})
export class SettingsModule {
}
