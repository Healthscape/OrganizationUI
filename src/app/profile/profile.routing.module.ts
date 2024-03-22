import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./components/profile/profile.component";
import {UpdateInfoComponent} from "./components/update-info/update-info.component";

const routes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: '',
        },
        component: ProfileComponent
    },
    {
        path: 'edit',
        data: {
            breadcrumb: 'Information'
        },
        component: UpdateInfoComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ProfileRoutingModule {
}
