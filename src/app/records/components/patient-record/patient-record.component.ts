import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatientOverviewComponent} from "../record-overview/components/patient-overview/patient-overview.component";
import {PatientRecordToolbarComponent} from "./components/patient-record-toolbar/patient-record-toolbar.component";
import {RecordOverviewComponent} from "../record-overview/record-overview.component";
import {SubjectService} from "../../../utils/services/subject.service";
import {MatDialog} from "@angular/material/dialog";
import {QuestionDialogComponent} from "../../../utils/custom-components/question-dialog/question-dialog.component";
import {CurrentEncounterComponent} from "../current-encounter/current-encounter.component";
import {DocumentsComponent} from "./components/documents/documents.component";
import {
    MedicationsOverviewComponent
} from "../record-overview/components/medications-overview/medications-overview.component";
import {MedicationsComponent} from "./components/medications/medications.component";
import {EncountersComponent} from "./components/encounters/encounters.component";
import {DemographicsComponent} from "./components/demographics/demographics.component";
import {ActivatedRoute, Router} from "@angular/router";
import {PatientRecordDto} from "../../dto/patientRecord.dto";
import {Subscription} from "rxjs";
import {EncounterService} from "../../service/encounter.service";

@Component({
    selector: 'app-patient-record',
    standalone: true,
    host: {
        class: "patient-record-host-wrapper"
    },
    imports: [CommonModule, PatientOverviewComponent, PatientRecordToolbarComponent, RecordOverviewComponent, CurrentEncounterComponent, DocumentsComponent, MedicationsOverviewComponent, MedicationsComponent, EncountersComponent, DemographicsComponent],
    templateUrl: './patient-record.component.html',
    styleUrl: './patient-record.component.scss'
})
export class PatientRecordComponent implements OnInit, OnDestroy {

    currentTab: string = "overview";
    encounterStarted: boolean = false;
    startedAt: Date = new Date();
    patientRecord: PatientRecordDto = new PatientRecordDto();
    subscription: Subscription = new Subscription();

    constructor(private subjectService: SubjectService, private dialog: MatDialog, private route: ActivatedRoute, private encounterService: EncounterService) {

    }

    onTabChanged(tabName: string) {
        console.log(this.startedAt)
        this.currentTab = tabName;
    }

    ngOnInit(): void {
        const patientRecordStr = sessionStorage.getItem(this.route.snapshot.params['id']);
        if (patientRecordStr) {
            this.patientRecord = JSON.parse(patientRecordStr);
        }
        this.route.snapshot.data['breadcrumb'] = this.patientRecord.userDto.name + " " + this.patientRecord.userDto.surname;
        this.subjectService.reloadBreadcrumbs.next("");
        this.subjectService.collapseSidebar.next('');
        this.subscription = this.route.params.subscribe((res) => {
            let dialogRef = this.dialog.open(QuestionDialogComponent, {
                minWidth: "40vw",
                data: {
                    question: "Do you want to start an encounter?"
                }
            });

            dialogRef.afterClosed().subscribe({
                next: (response) => {
                    this.encounterStarted = response;
                    this.startedAt = new Date();
                    if(response) {
                        let requestId = sessionStorage.getItem("request");
                        if (requestId) {
                            this.encounterService.startEncounter(requestId).subscribe((response) => {
                                console.log(response);
                                sessionStorage.setItem("updated", JSON.stringify(response));
                            })
                        }
                    }
                }
            });
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        sessionStorage.removeItem(this.route.snapshot.params['id']);
        sessionStorage.removeItem("updated");
    }
}
