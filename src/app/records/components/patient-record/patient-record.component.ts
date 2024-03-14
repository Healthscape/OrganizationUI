import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PatientOverviewComponent} from "../record-overview/components/patient-overview/patient-overview.component";
import {PatientRecordToolbarComponent} from "./components/patient-record-toolbar/patient-record-toolbar.component";
import {RecordOverviewComponent} from "../record-overview/record-overview.component";

@Component({
  selector: 'app-patient-record',
  standalone: true,
  host:{
    class: "patient-record-host-wrapper"
  },
  imports: [CommonModule, PatientOverviewComponent, PatientRecordToolbarComponent, RecordOverviewComponent],
  templateUrl: './patient-record.component.html',
  styleUrl: './patient-record.component.scss'
})
export class PatientRecordComponent {

  currentTab: string = "overview";

  onTabChanged(tabName: string) {
    this.currentTab = tabName;
  }
}
