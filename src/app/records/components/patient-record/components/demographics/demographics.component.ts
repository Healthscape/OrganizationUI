import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileInfoComponent} from "../../../../../profile/components/profile-info/profile-info.component";
import {FhirUserDto} from "../../../../../settings/dto/fhirUserDto";
import {ActivatedRoute} from "@angular/router";
import {PatientRecordDto} from "../../../../dto/patientRecord.dto";

@Component({
    selector: 'app-demographics',
    standalone: true,
    imports: [CommonModule, ProfileInfoComponent],
    templateUrl: './demographics.component.html',
    styleUrl: './demographics.component.scss'
})
export class DemographicsComponent {
    patient: FhirUserDto = new FhirUserDto();

    constructor(private route: ActivatedRoute) {
        const patientRecordStr = sessionStorage.getItem(this.route.snapshot.params['id']);
        if(patientRecordStr){
            let patientRecord: PatientRecordDto = JSON.parse(patientRecordStr);
            this.patient = patientRecord.userDto;
        }
    }

}
