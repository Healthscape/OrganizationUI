import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {FhirUserDto} from "../../../../../settings/dto/fhirUserDto";
import {PatientRecordDto} from "../../../../dto/patientRecord.dto";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-patient-overview',
    standalone: true,
    host: {
        class: 'patient-overview-host-wrapper'
    },
    imports: [CommonModule, MatCardModule],
    templateUrl: './patient-overview.component.html',
    styleUrl: './patient-overview.component.scss'
})
export class PatientOverviewComponent {
    patient: FhirUserDto = new FhirUserDto();

    constructor(private route: ActivatedRoute) {
        const patientRecordStr = sessionStorage.getItem(this.route.snapshot.params['id']);
        if (patientRecordStr) {
            let patientRecord: PatientRecordDto = JSON.parse(patientRecordStr);
            this.patient = patientRecord.userDto;
        }
    }
}
