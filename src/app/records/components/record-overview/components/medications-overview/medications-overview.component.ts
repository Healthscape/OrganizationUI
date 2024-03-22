import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MedicationAdministrationDto} from "../../../../dto/medicationAdministrationDto";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute} from "@angular/router";
import {PatientRecordDto} from "../../../../dto/patientRecord.dto";

@Component({
    selector: 'app-medications-overview',
    standalone: true,
    host: {
        class: "medications-overview-host-wrapper"
    },
    imports: [CommonModule, MatButtonModule],
    templateUrl: './medications-overview.component.html',
    styleUrl: './medications-overview.component.scss'
})
export class MedicationsOverviewComponent {
    medications = [new MedicationAdministrationDto(), new MedicationAdministrationDto(), new MedicationAdministrationDto(), new MedicationAdministrationDto(), new MedicationAdministrationDto(), new MedicationAdministrationDto()];
    @Input() edit: boolean = false;

    constructor(private route: ActivatedRoute) {
        const patientRecordStr = sessionStorage.getItem(this.route.snapshot.params['id']);
        if(patientRecordStr){
            let patientRecord: PatientRecordDto = JSON.parse(patientRecordStr);
            this.medications = patientRecord.medications;
        }
    }
}
