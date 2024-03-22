import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecordsComponent} from "./components/records/records.component";
import {PatientRecordComponent} from "./components/patient-record/patient-record.component";

const routes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: '',
        },
        component: RecordsComponent
    },
    {
        path: ':id',
        data: {
            breadcrumb: 'bc'
        },
        component: PatientRecordComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class RecordsRoutingModule {
}
