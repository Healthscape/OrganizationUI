import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {TimelineModule} from "primeng/timeline";
import {TimelineComponent} from "../../../utils/custom-components/timeline/timeline.component";
import {PatientOverviewComponent} from "./components/patient-overview/patient-overview.component";
import {MedicationsOverviewComponent} from "./components/medications-overview/medications-overview.component";
import {EncountersOverviewComponent} from "./components/encounters-overview/encounters-overview.component";
import {ConditionsOverviewComponent} from "./components/conditions-overview/conditions-overview.component";
import {AllergiesOverviewComponent} from "./components/allergies-overview/allergies-overview.component";
import {PatientRecordToolbarComponent} from "../patient-record/components/patient-record-toolbar/patient-record-toolbar.component";

@Component({
  selector: 'app-record-overview',
  standalone: true,
  host:{
    class: 'record-overview-host-wrapper'
  },
  imports: [CommonModule, MatCardModule, TimelineModule, TimelineComponent, PatientOverviewComponent, MedicationsOverviewComponent, EncountersOverviewComponent, ConditionsOverviewComponent, AllergiesOverviewComponent, PatientRecordToolbarComponent],
  templateUrl: './record-overview.component.html',
  styleUrl: './record-overview.component.scss'
})
export class RecordOverviewComponent {
}
