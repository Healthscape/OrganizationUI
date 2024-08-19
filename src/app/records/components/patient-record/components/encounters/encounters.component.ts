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
import { MatIcon } from '@angular/material/icon';
import { ClinicalImpressionDto } from '../../../../dto/clinicalImpression.dto';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-encounters',
    standalone: true,
    host: {
        class: 'encounters-host-wrapper'
    },
    imports: [CommonModule, MatButton, MatCell, MatCellDef, MatColumnDef, MatDateRangeInput, MatDateRangePicker, MatDatepickerActions, MatDatepickerApply, MatDatepickerCancel, MatDatepickerToggle, MatEndDate, MatFormField, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatIconButton, MatInput, MatRow, MatRowDef, MatStartDate, MatSuffix, MatTable, MatTooltip, ReactiveFormsModule, MatHeaderCellDef, MatIcon
    ],
    animations: [
        trigger('detailExpand', [
          state('collapsed,void', style({height: '0px', minHeight: '0'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
      ],
    templateUrl: './encounters.component.html',
    styleUrl: './encounters.component.scss'
})
export class EncountersComponent {
    displayedColumns: string[] = ['date', 'time', 'specialty', 'serviceProvider'];
    encounters = new Array<EncounterDto>();
    startDateCtrl: FormControl = new FormControl('');
    endDateCtrl: FormControl = new FormControl('');
    expandedElement: EncounterDto | null = null;
    columnsToDisplayWithExpand = [...this.displayedColumns, 'more'];
    impressions = new Array<ClinicalImpressionDto>();

    constructor(private route: ActivatedRoute) {
        const patientRecordStr = sessionStorage.getItem(this.route.snapshot.params['id']);
        if (patientRecordStr) {
            let patientRecord: PatientRecordDto = JSON.parse(patientRecordStr);
            this.encounters = patientRecord.encounters;
            this.impressions = patientRecord.clinicalImpressions;

            this.encounters.forEach(encounter => {
                let impression = this.impressions.find((impression) => {
                    if(encounter.id == impression.encounterId.split('/')[1]){
                        return true;
                    }
                    return false;
                })
                encounter.description = impression?.description ?? '';
                encounter.summary = impression?.summary ?? '';
            });
        }
    }


}
