import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../../../auth/services/token.service";
import {UserDto} from "../../../auth/dto/user.dto";

@Component({
    selector: 'app-account-settings',
    host: {
        class: 'account-settings-host-wrapper'
    },
    standalone: true,
    imports: [CommonModule],
    templateUrl: './account-settings.component.html',
    styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent {
    @Input() me?: UserDto;
    isAdmin: boolean = false;

    constructor(_tokenService: TokenService, private router: Router, private route: ActivatedRoute) {
        this.isAdmin = _tokenService.isAdmin();
    }

    onUpdateInfo() {
        this.router.navigate(['./edit'], {relativeTo: this.route, state: {me: this.me}}).then();
    }

    onChangePassword() {
        this.router.navigate(['./password'], {relativeTo: this.route}).then();
    }
}
