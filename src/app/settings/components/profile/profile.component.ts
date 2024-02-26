import {Component, Input, OnChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FhirPatientDto} from "../../dto/fhir.patient.dto";
import {GenderEnum} from "../../../utils/enums/gender.enum";
import {MaritalStatusEnum} from "../../../utils/enums/marital.status.enum";
import {TokenService} from "../../../auth/services/token.service";

@Component({
  selector: 'app-profile',
  host: {
    class: 'profile-host-wrapper'
  },
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnChanges {
  @Input() me?: FhirPatientDto;
  genderEnum: GenderEnum;
  maritalStatusEnum: MaritalStatusEnum;
  gender?: string = 'UNKNOWN';
  maritalStatus?: string = 'NULL';
  adminEmail?: string;
  isAdmin: boolean = false;

  constructor(_tokenService: TokenService) {
    this.genderEnum = new GenderEnum();
    this.maritalStatusEnum = new MaritalStatusEnum();

    if(_tokenService.isAdmin()){
      this.adminEmail = _tokenService.getSubjectFromToken();
      this.isAdmin = true;
    }else{
      this.adminEmail = undefined;
      this.isAdmin = false;
    }
  }

  ngOnChanges() {
    this.gender = this.genderEnum.getViewValue(this.me?.gender)
    this.maritalStatus = this.maritalStatusEnum.getViewValue(this.me?.maritalStatus)
  }

}
