import { Component } from '@angular/core';
import {FhirPatientDto} from "../../dto/fhir.patient.dto";
import {FhirService} from "../../service/fhir.service";

@Component({
  selector: 'app-settings',
  host:{
    class: 'settings-host-wrapper'
  },
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  me: FhirPatientDto = new FhirPatientDto();

  constructor(private _fhirService: FhirService) {
    _fhirService.me().subscribe({
      next: (user) =>{
        this.me = user;
      }
    })
  }

}
