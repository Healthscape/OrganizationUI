import {Component} from '@angular/core';
import {FhirUserDto} from "../../dto/fhirUserDto";
import {FhirService} from "../../service/fhir.service";
import {Router} from "@angular/router";
import {UserService} from "../../../auth/services/user.service";

@Component({
  selector: 'app-settings',
  host: {
    class: 'settings-host-wrapper'
  },
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  me?: FhirUserDto;
  isLoading: boolean = true;

  constructor(private userService: UserService, _fhirService: FhirService) {
    _fhirService.me().subscribe({
      next: (user) => {
        console.log(user)
        this.me = user;
        this.isLoading = false;
        this.userService.updateImage.next(user.image);
      }
    })
  }

}
