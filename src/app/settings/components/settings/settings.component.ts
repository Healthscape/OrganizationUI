import { Component } from '@angular/core';
import {FhirPatientDto} from "../../dto/fhir.patient.dto";
import {FhirService} from "../../service/fhir.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  host:{
    class: 'settings-host-wrapper'
  },
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  me?: FhirPatientDto;

  constructor(_fhirService: FhirService, private _router: Router) {
    this.me = this._router.getCurrentNavigation()?.extras?.state?.['me'];
    _fhirService.me().subscribe({
      next: (user) =>{
        this.me = user;
        console.log(user)
      }
    })
  }

}
