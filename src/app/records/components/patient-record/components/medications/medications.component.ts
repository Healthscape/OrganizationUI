import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
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
import {MedicationAdministrationDto} from "../../../../dto/medicationAdministrationDto";
import {ActivatedRoute} from "@angular/router";
import {PatientRecordDto} from "../../../../dto/patientRecord.dto";

@Component({
    selector: 'app-medications',
    standalone: true,
    host: {
        class: 'medications-host-wrapper'
    },
    imports: [CommonModule, MatButton, MatCell, MatCellDef, MatColumnDef, MatDateRangeInput, MatDateRangePicker, MatDatepickerActions, MatDatepickerApply, MatDatepickerCancel, MatDatepickerToggle, MatEndDate, MatFormField, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatIconButton, MatInput, MatRow, MatRowDef, MatStartDate, MatSuffix, MatTable, MatTooltip, ReactiveFormsModule, MatHeaderCellDef],
    templateUrl: './medications.component.html',
    styleUrl: './medications.component.scss'
})
export class MedicationsComponent {
    displayedColumns: string[] = ['status', 'medication', 'start', 'end', 'more'];
    medications: MedicationAdministrationDto[] = [];
    startDateCtrl: FormControl = new FormControl('');
    endDateCtrl: FormControl = new FormControl('');


    constructor(private route: ActivatedRoute) {
        const patientRecordStr = sessionStorage.getItem(this.route.snapshot.params['id']);
        if (patientRecordStr) {
            let patientRecord: PatientRecordDto = JSON.parse(patientRecordStr);
            this.medications = patientRecord.medications;
        }
    }

}
