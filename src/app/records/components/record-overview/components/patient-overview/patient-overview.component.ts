import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {FhirUserDto} from "../../../../../settings/dto/fhirUserDto";

@Component({
  selector: 'app-patient-overview',
  standalone: true,
  host:{
    class:'patient-overview-host-wrapper'
  },
  imports: [CommonModule, MatCardModule],
  templateUrl: './patient-overview.component.html',
  styleUrl: './patient-overview.component.scss'
})
export class PatientOverviewComponent {
  patient: FhirUserDto = new FhirUserDto();
}
