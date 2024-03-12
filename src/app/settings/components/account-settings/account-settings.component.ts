import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {FhirUserDto} from "../../dto/fhirUserDto";
import {TokenService} from "../../../auth/services/token.service";

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
  @Input() me?: FhirUserDto;
  isAdmin: boolean = false;

  constructor(_tokenService: TokenService, private router: Router, private route: ActivatedRoute) {
    this.isAdmin = _tokenService.isAdmin();
  }

  onUpdateInfo() {
    this.router.navigate(['./profile'], {relativeTo: this.route, state: {me: this.me}}).then();
  }

  onChangePassword() {
    this.router.navigate(['./password'], {relativeTo: this.route}).then();
  }
}
