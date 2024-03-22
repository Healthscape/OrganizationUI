import {NgModule} from "@angular/core";
import {ProfileRoutingModule} from "./profile.routing.module";
import {CommonModule} from "@angular/common";
import {ProfileComponent} from "./components/profile/profile.component";
import {ProfileInfoComponent} from "./components/profile-info/profile-info.component";

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        ProfileInfoComponent,
    ],
    declarations: [ProfileComponent]
})
export class ProfileModule {
}
