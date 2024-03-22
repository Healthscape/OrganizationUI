import {Component} from '@angular/core';
import {UserService} from "../../../users/services/user.service";
import {UserDto} from "../../../auth/dto/user.dto";

@Component({
    selector: 'app-settings',
    host: {
        class: 'settings-host-wrapper'
    },
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {
    me?: UserDto;
    isLoading: boolean = true;

    constructor(private userService: UserService) {
        userService.me().subscribe({
            next: (user) => {
                console.log(user)
                this.me = user;
                this.isLoading = false;
                this.userService.updateImage.next(user.image);
            }
        })
    }

}
