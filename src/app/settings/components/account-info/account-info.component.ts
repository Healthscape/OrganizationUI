import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardAvatar} from "@angular/material/card";
import {TokenService} from "../../../auth/services/token.service";
import {UserDto} from "../../../auth/dto/user.dto";

@Component({
    selector: 'app-account-info',
    standalone: true,
    host: {
        class: "account-info-host-wrapper"
    },
    imports: [CommonModule, MatCardAvatar],
    templateUrl: './account-info.component.html',
    styleUrl: './account-info.component.scss'
})
export class AccountInfoComponent {
    @Input() me?: UserDto;
    adminEmail?: string;
    role: string = "";

    constructor(_tokenService: TokenService) {
        this.role = _tokenService.getRoleFromToken();
        if (this.role == "ROLE_ADMIN") {
            this.adminEmail = _tokenService.getSubjectFromToken();
        }
    }

}
