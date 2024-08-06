import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllergyDto, AllergyCategory} from "../../../../dto/allergy.dto";
import {ActivatedRoute} from "@angular/router";
import {PatientRecordDto} from "../../../../dto/patientRecord.dto";
import { SubjectService } from '../../../../../utils/services/subject.service';
import { EncounterService } from '../../../../service/encounter.service';
import { PatientRecordUpdateDto } from '../../../../dto/patientRecordUpdate.dto';

@Component({
    selector: 'app-allergies-overview',
    standalone: true,
    host: {
        class: "allergies-overview-host-wrapper"
    },
    imports: [CommonModule],
    templateUrl: './allergies-overview.component.html',
    styleUrl: './allergies-overview.component.scss'
})
export class AllergiesOverviewComponent {
    @Input() type: string = 'NO_EDIT'// ,'EDIT', 'HISTORY'
    @Input() id: string = '';
    conditions: AllergyDto[] = [];
    originalAllergies: AllergyDto[] = [];
    showingAllergies: AllergyDto[] = [];
    updatedAllergies: AllergyDto[] = []
    loading: boolean = false;

    constructor(private route: ActivatedRoute, private subjectService: SubjectService, private encounterService: EncounterService) {
    }
    private loadAllergies(id: string) {
        const patientRecordStr = sessionStorage.getItem(id);
        if (patientRecordStr) {
            let patientRecord: PatientRecordDto = JSON.parse(patientRecordStr);
            this.showingAllergies = patientRecord.allergies.map(e => ({...e}));
            this.originalAllergies = patientRecord.allergies;
        }
    }

    ngOnInit(): void {
        if (this.type == "NO_EDIT") {
            this.getNotEditedConditions();
        } else if (this.type == "HISTORY") {
            this.getConditionHistory();
        } else if (this.type == "EDIT") {
            this.getEditedConditions();
        }
        this.onAdd();
    }

    private onAdd() {
        this.subjectService.newAllergy.subscribe((allergy) => {
            if (this.type == "EDIT") {
                allergy.updated = true;
                this.showingAllergies.push(allergy)
                this.updatedAllergies.push(allergy);
            }
        })
    }

    private getNotEditedConditions() {
        let id = this.route.snapshot.params['id'];
        this.loadAllergies(id);
        this.showingAllergies = this.showingAllergies.filter(m => m.status == "in-progress");
    }

    getConditionHistory() {
        this.loading = true;
        this.encounterService.getAllergyHistory().subscribe((response) => {
            this.loading = false;
            this.showingAllergies = response;
        })
    }

    private getEditedConditions() {
        this.loadAllergies(this.id);
        let patientRecordUpdateStr = sessionStorage.getItem('updated')
        if (patientRecordUpdateStr) {
            let patientRecordUpdateDto: PatientRecordUpdateDto = JSON.parse(patientRecordUpdateStr);
            if (patientRecordUpdateDto.allergies) {
                this.updatedAllergies = patientRecordUpdateDto.allergies;
                for (let allergy of patientRecordUpdateDto.allergies) {
                    if (allergy.id == null) {
                        this.showingAllergies.push(allergy);
                    } else {
                        let index = this.showingAllergies.findIndex((value, index) => {
                            if (value.id == allergy.id) return index; else return -1
                        });
                        allergy.updated = true;
                        this.showingAllergies.splice(index, 1, allergy);
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
            updated.allergies = this.updatedAllergies;
            sessionStorage.setItem('updated', JSON.stringify(updated));
        }
    }

    onDelete(condition: AllergyDto) {
        let index = this.updatedAllergies.indexOf(condition);
        this.updatedAllergies.splice(index, 1);
        index = this.showingAllergies.indexOf(condition);
        this.showingAllergies.splice(index, 1);
    }

    onStatusChange(event: string, allergy: AllergyDto) {
        let index = this.originalAllergies.indexOf(allergy)
        let updatedIndex = this.updatedAllergies.findIndex(x => x.id == allergy.id);

        allergy.updated = true;
        if (this.originalAllergies.at(index)?.status == event) {
            this.updatedAllergies.splice(updatedIndex, 1);
            allergy.updated = false;
        } else {
            allergy.status = event;
            if (updatedIndex != -1) {
                this.updatedAllergies.splice(updatedIndex, 1, allergy);
            } else {
                this.updatedAllergies.push(allergy);
            }
        }
    }

}
