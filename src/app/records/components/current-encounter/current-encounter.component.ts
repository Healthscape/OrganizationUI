import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {
    ConditionsOverviewComponent
} from "../record-overview/components/conditions-overview/conditions-overview.component";
import {ClinicalImpressionComponent} from "./components/clinical-impression/clinical-impression.component";
import {DocumentOverviewComponent} from "./components/documents-overview/document-overview.component";
import {
    MedicationsOverviewComponent
} from "../record-overview/components/medications-overview/medications-overview.component";
import {DocumentsComponent} from "../patient-record/components/documents/documents.component";
import {EncounterService} from "../../service/encounter.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
    ManageMedicationsDialogComponent
} from "./components/manage-medications-dialog/manage-medications-dialog.component";
import {SubjectService} from "../../../utils/services/subject.service";

@Component({
    selector: 'app-current-encounter',
    standalone: true,
    host: {
        class: "current-encounter-host-wrapper"
    },
    imports: [CommonModule, MatButtonModule, MatInputModule, ConditionsOverviewComponent, ClinicalImpressionComponent, DocumentOverviewComponent, MedicationsOverviewComponent, DocumentsComponent],
    templateUrl: './current-encounter.component.html',
    styleUrl: './current-encounter.component.scss'
})
export class CurrentEncounterComponent implements OnInit {
    time: number = 0;
    display: string = '00 : 00';
    interval: any;
    @Input() startedAt: Date = new Date();
    @Input() encounterStarted: boolean = false;

    constructor(private dialog: MatDialog, private route: ActivatedRoute, private encounterService: EncounterService, private subjectService: SubjectService) {
    }
    startTimer() {
        let startAt = new Date().getTime() - this.startedAt.getTime();
        startAt = startAt - (startAt % 1000);
        this.time = startAt / 1000;
        this.interval = setInterval(() => {
            if (this.time === 0) {
                this.time++;
            } else {
                this.time++;
            }
            this.display = this.transform(this.time)
        }, 1000);
        this.encounterStarted = true;
    }

    stopTimer() {
        clearInterval(this.interval);
        this.display = '00 : 00';
        this.stopEncounter();
    }

    private stopEncounter() {
        let patientRecordUpdatedStr = sessionStorage.getItem("updated");
        if (patientRecordUpdatedStr) {
            let patientRecordUpdated = JSON.parse(patientRecordUpdatedStr);
            this.encounterService.endEncounter(patientRecordUpdated).subscribe(() => {
                this.subjectService.encounterEnded.next("");
            });
        }
    }

    ngOnInit(): void {
        const patientRecordStr = sessionStorage.getItem(this.route.snapshot.params['id']);
        if (patientRecordStr) {
            console.log(JSON.parse(patientRecordStr));
        }
        if (this.encounterStarted) {
            this.startTimer();
        }
    }

    private startEncounter() {
        let requestId = sessionStorage.getItem("request");
        if (requestId) {
            this.encounterService.startEncounter(requestId).subscribe((response) => {
                console.log(response)
                sessionStorage.setItem("updated", JSON.stringify(response));
            })
        }
    }

    transform(value: number): string {

        const hours: number = Math.floor(value / 60);
        const minutes: number = (value - hours * 60);

        if (hours < 10 && minutes < 10) {
            return '0' + hours + ' : 0' + (value - hours * 60);
        }
        if (hours > 10 && minutes > 10) {
            return '0' + hours + ' : ' + (value - hours * 60);
        }
        if (hours > 10 && minutes < 10) {
            return hours + ' : 0' + (value - hours * 60);
        }
        if (minutes > 10) {
            return '0' + hours + ' : ' + (value - hours * 60);
        }
        return '';
    }

    startNow() {
        this.startedAt = new Date();
        this.startTimer();
        this.startEncounter();
    }

    onManageConditions() {

    }

    onManageAllergies() {

    }

    onManageMedications() {
        this.dialog.open(ManageMedicationsDialogComponent, {
            data: {id: this.route.snapshot.params['id']}
        })
    }
}
