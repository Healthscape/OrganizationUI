import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {EncounterDto} from "../../dto/encounter.dto";
import {TimelineModule} from "primeng/timeline";
import {TimelineComponent} from "../../../utils/custom-components/timeline/timeline.component";
import {AllergyDto} from "../../dto/allergy.dto";
import {MedicationDto} from "../../dto/medication.dto";
import {FhirUserDto} from "../../../settings/dto/fhirUserDto";
import {ConditionDto} from "../../dto/condition.dto";
import {PatientOverviewComponent} from "./components/patient-overview/patient-overview.component";
import {MedicationsOverviewComponent} from "./components/medications-overview/medications-overview.component";
import {EncountersOverviewComponent} from "./components/encounters-overview/encounters-overview.component";
import {ConditionsOverviewComponent} from "./components/conditions-overview/conditions-overview.component";
import {AllergiesOverviewComponent} from "./components/allergies-overview/allergies-overview.component";
import {PatientRecordToolbarComponent} from "../patient-record/components/patient-record-toolbar/patient-record-toolbar.component";
import {SubjectService} from "../../../utils/events/subject.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog} from "@angular/material/dialog";
import {RecordPreviewDialogComponent} from "../record-preview-dialog/record-preview-dialog.component";
import {QuestionDialogComponent} from "../../../utils/custom-components/question-dialog/question-dialog.component";

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
