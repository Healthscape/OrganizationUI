import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from "../../../../../settings/components/profile/profile.component";
import {FhirUserDto} from "../../../../../settings/dto/fhirUserDto";

@Component({
  selector: 'app-demographics',
  standalone: true,
    imports: [CommonModule, ProfileComponent],
  templateUrl: './demographics.component.html',
  styleUrl: './demographics.component.scss'
})
export class DemographicsComponent {
  patient: FhirUserDto = new FhirUserDto();

}
