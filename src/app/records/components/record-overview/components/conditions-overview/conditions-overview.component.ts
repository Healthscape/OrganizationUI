import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConditionDto} from "../../../../dto/condition.dto";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute} from "@angular/router";
import {PatientRecordDto} from "../../../../dto/patientRecord.dto";
import { SubjectService } from '../../../../../utils/services/subject.service';
import { EncounterService } from '../../../../service/encounter.service';
import { PatientRecordUpdateDto } from '../../../../dto/patientRecordUpdate.dto';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
    selector: 'app-conditions-overview',
    standalone: true,
    host: {
        class: "conditions-overview-host-wrapper"
    },
    imports: [CommonModule, MatButtonModule, MatProgressBar],
    templateUrl: './conditions-overview.component.html',
    styleUrl: './conditions-overview.component.scss'
})
export class ConditionsOverviewComponent {
    @Input() type: string = 'NO_EDIT'// ,'EDIT', 'HISTORY'
    @Input() id: string = '';
    conditions: ConditionDto[] = [];
    originalConditions: ConditionDto[] = [];
    showingCondtions: ConditionDto[] = [];
    updatedConditions: ConditionDto[] = []
    loading: boolean = false;

    constructor(private route: ActivatedRoute, private subjectService: SubjectService, private encounterService: EncounterService) {
    }
    private loadConditions(id: string) {
        const patientRecordStr = sessionStorage.getItem(id);
        if (patientRecordStr) {
            let patientRecord: PatientRecordDto = JSON.parse(patientRecordStr);
            this.showingCondtions = patientRecord.conditions.map(e => ({...e}));
            this.originalConditions = patientRecord.conditions;
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
        this.subjectService.newCondition.subscribe((condition) => {
            if (this.type == "EDIT") {
                condition.updated = true;
                this.showingCondtions.push(condition)
                this.updatedConditions.push(condition);
            }
        })
    }

    private getNotEditedConditions() {
        let id = this.route.snapshot.params['id'];
        this.loadConditions(id);
        this.showingCondtions = this.showingCondtions.filter(m => m.status == "in-progress");
    }

    getConditionHistory() {
        this.loading = true;
        this.encounterService.getConditionHistory().subscribe((response) => {
            this.loading = false;
            this.showingCondtions = response;
        })
    }

    private getEditedConditions() {
        this.loadConditions(this.id);
        let patientRecordUpdateStr = sessionStorage.getItem('updated')
        if (patientRecordUpdateStr) {
            let patientRecordUpdateDto: PatientRecordUpdateDto = JSON.parse(patientRecordUpdateStr);
            if (patientRecordUpdateDto.conditions) {
                this.updatedConditions = patientRecordUpdateDto.conditions;
                for (let condition of patientRecordUpdateDto.conditions) {
                    if (condition.id == null) {
                        this.showingCondtions.push(condition);
                    } else {
                        let index = this.showingCondtions.findIndex((value, index) => {
                            if (value.id == condition.id) return index; else return -1
                        });
                        condition.updated = true;
                        this.showingCondtions.splice(index, 1, condition);
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
            updated.conditions = this.updatedConditions;
            sessionStorage.setItem('updated', JSON.stringify(updated));
        }
    }

    onDelete(condition: ConditionDto) {
        let index = this.updatedConditions.indexOf(condition);
        this.updatedConditions.splice(index, 1);
        index = this.showingCondtions.indexOf(condition);
        this.showingCondtions.splice(index, 1);
    }

    onStatusChange(event: string, condition: ConditionDto) {
        let index = this.originalConditions.indexOf(condition)
        let updatedIndex = this.updatedConditions.findIndex(x => x.id == condition.id);

        condition.updated = true;
        if (this.originalConditions.at(index)?.status == event) {
            this.updatedConditions.splice(updatedIndex, 1);
            condition.updated = false;
        } else {
            condition.status = event;
            if (updatedIndex != -1) {
                this.updatedConditions.splice(updatedIndex, 1, condition);
            } else {
                this.updatedConditions.push(condition);
            }
        }
    }
}
