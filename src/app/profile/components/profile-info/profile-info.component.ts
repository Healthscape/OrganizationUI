import {Component, Input, OnChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FhirUserDto} from "../../../settings/dto/fhirUserDto";
import {GenderEnum} from "../../../utils/enums/gender.enum";
import {MaritalStatusEnum} from "../../../utils/enums/marital.status.enum";
import {TokenService} from "../../../auth/services/token.service";

@Component({
    selector: 'app-profile-info',
    host: {
        class: 'profile-info-host-wrapper'
    },
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './profile-info.component.html',
    styleUrl: './profile-info.component.scss'
})
export class ProfileInfoComponent implements OnChanges {
    @Input() me?: FhirUserDto;
    genderEnum: GenderEnum;
    maritalStatusEnum: MaritalStatusEnum;
    gender?: string = 'UNKNOWN';
    maritalStatus?: string = 'NULL';
    adminEmail?: string;
    role: string = "";

    constructor(_tokenService: TokenService) {
        this.genderEnum = new GenderEnum();
        this.maritalStatusEnum = new MaritalStatusEnum();

        this.role = _tokenService.getRoleFromToken();
        if (this.role == "ROLE_ADMIN") {
            this.adminEmail = _tokenService.getSubjectFromToken();
        }
    }

    ngOnChanges() {
        this.gender = this.genderEnum.getViewValue(this.me?.gender)
        this.maritalStatus = this.maritalStatusEnum.getViewValue(this.me?.maritalStatus)
    }

}
