import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {UserService} from "../../../auth/services/user.service";
import {UserDto} from "../../../auth/dto/user.dto";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";

@Component({
  selector: 'app-change-password',
  host:{
    class: 'change-password-host-wrapper'
  },
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, MatTooltipModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  me: UserDto = new UserDto();
  emailCtrl: FormControl = new FormControl<any>('');
  oldPasswordCtrl: FormControl = new FormControl<any>('');
  newPasswordCtrl: FormControl = new FormControl<any>('');
  confirmPasswordCtrl: FormControl = new FormControl<any>('');
  passwordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  passwordForm: FormGroup = new FormGroup<any>({});

  constructor(private userService: UserService) {
    this.userService.me().subscribe((response) => {
      this.me = response;
      this.emailCtrl = new FormControl<any>(this.me.email);

      this.initializeForm();
    })

  }

  onSaveEmail() {

    this.userService.changeEmail(this.emailCtrl.value).subscribe((response)=>{
      console.log(response);
    })
  }

  onCancelEmail() {
    this.emailCtrl = new FormControl<any>(this.me.email);
  }

  onSavePassword() {

    this.userService.changePassword(this.passwordForm.value).subscribe((response)=>{
      console.log(response);
    })
  }

  onCancelPassword() {
    this.initializeForm();
  }

  private initializeForm() {
    this.oldPasswordCtrl = new FormControl<any>('');
    this.newPasswordCtrl = new FormControl<any>('');
    this.confirmPasswordCtrl = new FormControl<any>('');
    this.passwordForm = new FormGroup<any>({
      'oldPassword': this.oldPasswordCtrl,
      'newPassword': this.newPasswordCtrl,
      'confirmPassword': this.confirmPasswordCtrl
    })
  }
}
