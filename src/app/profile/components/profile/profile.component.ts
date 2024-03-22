import {Component} from '@angular/core';
import {FhirUserDto} from "../../../settings/dto/fhirUserDto";
import {UserService} from "../../../users/services/user.service";
import {TokenService} from "../../../auth/services/token.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-profile',
    host: {
        class: "profile-host-wrapper"
    },
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    me?: FhirUserDto;
    isLoading: boolean = true;
    isAdmin: boolean = false;

    constructor(_userService: UserService, _tokenService: TokenService, private router: Router, private route: ActivatedRoute) {
        this.isAdmin = _tokenService.isAdmin();
        _userService.getDetailedMe().subscribe({
            next: (user) => {
                console.log(user)
                this.me = user;
                this.isLoading = false;
            }
        })
    }

    onUpdateInfo() {
        this.router.navigate(['./edit'], {relativeTo: this.route, state: {me: this.me}}).then();
    }
}
