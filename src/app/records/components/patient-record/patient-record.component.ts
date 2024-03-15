import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PatientOverviewComponent} from "../record-overview/components/patient-overview/patient-overview.component";
import {PatientRecordToolbarComponent} from "./components/patient-record-toolbar/patient-record-toolbar.component";
import {RecordOverviewComponent} from "../record-overview/record-overview.component";
import {SubjectService} from "../../../utils/events/subject.service";
import {MatDialog} from "@angular/material/dialog";
import {QuestionDialogComponent} from "../../../utils/custom-components/question-dialog/question-dialog.component";
import {CurrentEncounterComponent} from "../current-encounter/current-encounter.component";

@Component({
  selector: 'app-patient-record',
  standalone: true,
  host:{
    class: "patient-record-host-wrapper"
  },
  imports: [CommonModule, PatientOverviewComponent, PatientRecordToolbarComponent, RecordOverviewComponent, CurrentEncounterComponent],
  templateUrl: './patient-record.component.html',
  styleUrl: './patient-record.component.scss'
})
export class PatientRecordComponent {

  currentTab: string = "overview";
  encounterStarted: boolean = false;
  startedAt: Date = new Date();

  constructor(private subjectService: SubjectService, private dialog: MatDialog,) {
    this.subjectService.collapseSidebar.next('');

    let dialogRef = this.dialog.open(QuestionDialogComponent, {
      minWidth: "40vw",
      data:{
        question: "Do you want to start an encounter?"
      }
    });

    dialogRef.afterClosed().subscribe({
      next:(response) =>{
        console.log(response)
        console.log(new Date())
        this.encounterStarted = response;
        this.startedAt = new Date();
      }
    });
  }

  onTabChanged(tabName: string) {
    console.log(this.startedAt)
    this.currentTab = tabName;
  }
}
