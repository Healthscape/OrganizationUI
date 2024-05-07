import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MedicationAdministrationDto} from "../../../../dto/medicationAdministrationDto";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute} from "@angular/router";
import {PatientRecordDto} from "../../../../dto/patientRecord.dto";
import {SubjectService} from "../../../../../utils/services/subject.service";
import {PatientRecordUpdateDto} from "../../../../dto/patientRecordUpdate.dto";
import {MatFormField, MatOption, MatSelect} from "@angular/material/select";
import {MatTooltip} from "@angular/material/tooltip";
import {EncounterService} from "../../../../service/encounter.service";
import {MatProgressBar} from "@angular/material/progress-bar";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-medications-overview',
    standalone: true,
    host: {
        class: "medications-overview-host-wrapper"
    },
    imports: [CommonModule, MatButtonModule, MatSelect, MatFormField, MatOption, MatTooltip, MatProgressBar, ReactiveFormsModule],
    templateUrl: './medications-overview.component.html',
    styleUrl: './medications-overview.component.scss'
})
export class MedicationsOverviewComponent implements OnInit, OnDestroy {
    originalMedications: MedicationAdministrationDto[] = [];
    showingMedications: MedicationAdministrationDto[] = [];
    @Input() type: string = 'NO_EDIT'// ,'EDIT', 'HISTORY'
    @Input() id: string = '';
    updatedMedications: MedicationAdministrationDto[] = []
    loading: boolean = false;

    constructor(private route: ActivatedRoute, private subjectService: SubjectService, private encounterService: EncounterService) {

    }

    private loadMedications(id: string) {
        const patientRecordStr = sessionStorage.getItem(id);
        if (patientRecordStr) {
            let patientRecord: PatientRecordDto = JSON.parse(patientRecordStr);
            this.showingMedications = patientRecord.medications.map(e => ({...e}));
            this.originalMedications = patientRecord.medications;
        }
    }

    ngOnInit(): void {
        if (this.type == "NO_EDIT") {
            this.getNotEditedMedications();
        } else if (this.type == "HISTORY") {
            this.getMedicationHistory();
        } else if (this.type == "EDIT") {
            this.getEditedMedications();
        }
        this.onAdd();
    }

    private onAdd() {
        this.subjectService.newMedication.subscribe((medication) => {
            if (this.type == "EDIT") {
                medication.updated = true;
                this.showingMedications.push(medication)
                this.updatedMedications.push(medication);
            }
        })
    }

    private getNotEditedMedications() {
        let id = this.route.snapshot.params['id'];
        this.loadMedications(id);
        this.showingMedications = this.showingMedications.filter(m => m.status == "in-progress");
    }

    getMedicationHistory() {
        this.loading = true;
        this.encounterService.getMedicationAdministrationHistory().subscribe((response) => {
            this.loading = false;
            this.showingMedications = response;
        })
    }

    private getEditedMedications() {
        this.loadMedications(this.id);
        let patientRecordUpdateStr = sessionStorage.getItem('updated')
        if (patientRecordUpdateStr) {
            let patientRecordUpdateDto: PatientRecordUpdateDto = JSON.parse(patientRecordUpdateStr);
            if (patientRecordUpdateDto.medications) {
                this.updatedMedications = patientRecordUpdateDto.medications;
                for (let medication of patientRecordUpdateDto.medications) {
                    if (medication.id == null) {
                        this.showingMedications.push(medication);
                    } else {
                        let index = this.showingMedications.findIndex((value, index) => {
                            if (value.id == medication.id) return index; else return -1
                        });
                        medication.updated = true;
                        this.showingMedications.splice(index, 1, medication);
                    }
                }
            }
        }
    }

    ngOnDestroy(): void {
        if (this.type == "EDIT") {
            this.setUpdated();
        }
    }

    private setUpdated() {
        let patientRecordUpdateStr = sessionStorage.getItem('updated')
        if (patientRecordUpdateStr) {
            let updated: PatientRecordUpdateDto = JSON.parse(patientRecordUpdateStr);
            updated.medications = this.updatedMedications;
            sessionStorage.setItem('updated', JSON.stringify(updated));
        }
    }

    onDelete(medication: MedicationAdministrationDto) {
        let index = this.updatedMedications.indexOf(medication);
        this.updatedMedications.splice(index, 1);
        index = this.showingMedications.indexOf(medication);
        this.showingMedications.splice(index, 1);
    }

    onStatusChange(event: string, medication: MedicationAdministrationDto) {
        let index = this.originalMedications.indexOf(medication)
        let updatedIndex = this.updatedMedications.findIndex(x => x.id == medication.id);

        medication.updated = true;
        if (this.originalMedications.at(index)?.status == event) {
            this.updatedMedications.splice(updatedIndex, 1);
            medication.updated = false;
        } else {
            medication.status = event;
            if (updatedIndex != -1) {
                this.updatedMedications.splice(updatedIndex, 1, medication);
            } else {
                this.updatedMedications.push(medication);
            }
        }
    }
}
