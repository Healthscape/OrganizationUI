import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PatientsComponent} from "../patients/components/patients/patients.component";

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
    data: {
      breadcrumb: null
    }
  }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainWindowRoutingModule { }
