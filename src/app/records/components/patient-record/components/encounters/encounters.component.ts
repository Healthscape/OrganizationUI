import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButton, MatIconButton} from "@angular/material/button";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from "@angular/material/table";
import {
    MatDatepickerActions,
    MatDatepickerApply,
    MatDatepickerCancel,
    MatDatepickerToggle,
    MatDateRangeInput,
    MatDateRangePicker,
    MatEndDate,
    MatStartDate
} from "@angular/material/datepicker";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {EncounterDto} from "../../../../dto/encounter.dto";
import {ActivatedRoute} from "@angular/router";
import {PatientRecordDto} from "../../../../dto/patientRecord.dto";

@Component({
    selector: 'app-encounters',
    standalone: true,
    host: {
        class: 'encounters-host-wrapper'
    },
    imports: [CommonModule, MatButton, MatCell, MatCellDef, MatColumnDef, MatDateRangeInput, MatDateRangePicker, MatDatepickerActions, MatDatepickerApply, MatDatepickerCancel, MatDatepickerToggle, MatEndDate, MatFormField, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatIconButton, MatInput, MatRow, MatRowDef, MatStartDate, MatSuffix, MatTable, MatTooltip, ReactiveFormsModule, MatHeaderCellDef],
    templateUrl: './encounters.component.html',
    styleUrl: './encounters.component.scss'
})
export class EncountersComponent {
    displayedColumns: string[] = ['date', 'time', 'specialty', 'serviceProvider', 'more'];
    encounters = new Array<EncounterDto>();
    startDateCtrl: FormControl = new FormControl('');
    endDateCtrl: FormControl = new FormControl('');

    constructor(private route: ActivatedRoute) {
        const patientRecordStr = sessionStorage.getItem(this.route.snapshot.params['id']);
        if (patientRecordStr) {
            let patientRecord: PatientRecordDto = JSON.parse(patientRecordStr);
            this.encounters = patientRecord.encounters;
        }
    }


}
