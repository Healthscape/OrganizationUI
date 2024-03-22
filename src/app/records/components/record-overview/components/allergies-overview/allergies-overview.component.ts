import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllergyDto} from "../../../../dto/allergy.dto";
import {ActivatedRoute} from "@angular/router";
import {PatientRecordDto} from "../../../../dto/patientRecord.dto";

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
    allergies = [new AllergyDto(), new AllergyDto(), new AllergyDto(), new AllergyDto(), new AllergyDto(), new AllergyDto()];

    constructor(private route: ActivatedRoute) {
        const patientRecordStr = sessionStorage.getItem(this.route.snapshot.params['id']);
        if(patientRecordStr){
            let patientRecord: PatientRecordDto = JSON.parse(patientRecordStr);
            this.allergies = patientRecord.allergies;
        }
    }

}
