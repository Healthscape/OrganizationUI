import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PatientRecordComponent} from "./components/patient-record/patient-record.component";
import { PatientsComponent } from "../patients/components/patients/patients.component";

const routes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: '',
        },
        component: PatientsComponent
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
