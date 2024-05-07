import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {MedicationAdministrationDto} from "../../../../dto/medicationAdministrationDto";
import {MatButton} from "@angular/material/button";
import {MatCardAvatar} from "@angular/material/card";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from "@angular/material/table";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatSelect} from "@angular/material/select";
import {PaginatorModule} from "primeng/paginator";
import {
    MedicationsOverviewComponent
} from "../../../record-overview/components/medications-overview/medications-overview.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {SubjectService} from "../../../../../utils/services/subject.service";
import {MatTab, MatTabGroup} from "@angular/material/tabs";

@Component({
    selector: 'app-manage-medications-dialog',
    standalone: true,
    imports: [CommonModule, MatButton, MatCardAvatar, MatCell, MatCellDef, MatColumnDef, MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatFormField, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatInput, MatLabel, MatOption, MatPrefix, MatProgressBar, MatRow, MatRowDef, MatSelect, MatSuffix, MatTable, PaginatorModule, MedicationsOverviewComponent, ReactiveFormsModule, CdkTextareaAutosize, MatTabGroup, MatTab],
    templateUrl: './manage-medications-dialog.component.html',
    styleUrl: './manage-medications-dialog.component.scss'
})
export class ManageMedicationsDialogComponent {
    medications: MedicationAdministrationDto[] = []
    loadingHistory: boolean = true;
    id: string = '';
    medicationNameCtrl!: FormControl;
    dosageCtrl!: FormControl;
    form!: FormGroup;

    constructor(private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: { id: string }, private subjectService:SubjectService) {
        let id = this.route.snapshot.params['id'];
        if (!id) {
            id = data.id;
        }
        this.id = id;
        console.log(id)

        this.initForm();
    }

    initForm(){
        this.dosageCtrl =  new FormControl<any>('');
        this.medicationNameCtrl = new FormControl<any>('')
        this.form = new FormGroup<any>({
            'dosage': this.dosageCtrl,
            'medication': this.medicationNameCtrl
        })
    }
    onAdd() {
        if(this.form.valid) {
            let medication = this.medicationNameCtrl.value;
            let dosage = this.dosageCtrl.value;
            let medicationDto = new MedicationAdministrationDto(medication, dosage);
            this.subjectService.newMedication.next(medicationDto)
            this.initForm();
        }
    }
}