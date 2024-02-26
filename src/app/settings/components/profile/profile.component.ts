import {Component, Input, OnChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FhirPatientDto} from "../../dto/fhir.patient.dto";
import {GenderEnum} from "../../../utils/enums/gender.enum";
import {MaritalStatusEnum} from "../../../utils/enums/marital.status.enum";

@Component({
  selector: 'app-profile',
  host:{
    class: 'profile-host-wrapper'
  },
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnChanges{
  @Input() me?: FhirPatientDto;
  genderEnum: GenderEnum;
  maritalStatusEnum: MaritalStatusEnum;
  gender?: string = 'UNKNOWN';
  maritalStatus?: string = 'NULL';

  constructor() {
    this.genderEnum = new GenderEnum();
    this.maritalStatusEnum = new MaritalStatusEnum();
  }

  ngOnChanges(){
    this.gender = this.genderEnum.getViewValue(this.me?.gender)
    this.maritalStatus = this.maritalStatusEnum.getViewValue(this.me?.maritalStatus)
  }

}
