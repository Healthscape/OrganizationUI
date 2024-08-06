import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {UserService} from "../../../users/services/user.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AuthService} from "../../../auth/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenService} from "../../../auth/services/token.service";

@Component({
    selector: 'app-change-password',
    host: {
        class: 'change-password-host-wrapper'
    },
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, MatTooltipModule],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
    email?: string;
    emailCtrl: FormControl = new FormControl<any>('');
    oldPasswordCtrl: FormControl = new FormControl<any>('');
    newPasswordCtrl: FormControl = new FormControl<any>('');
    confirmPasswordCtrl: FormControl = new FormControl<any>('');
    passwordVisible: boolean = false;
    newPasswordVisible: boolean = false;
    confirmPasswordVisible: boolean = false;
    passwordForm: FormGroup = new FormGroup<any>({});

    constructor(_tokenService: TokenService, private userService: UserService, private authService: AuthService, private snackBar: MatSnackBar) {
        this.email = _tokenService.getSubjectFromToken();
        this.emailCtrl = new FormControl<any>(this.email);

        this.initializeForm();

    }

    onSaveEmail() {

        this.userService.changeEmail(this.emailCtrl.value).subscribe({
            next: (response) => {
                this.authService.updateTokens(response);
                this.snackBar.open("Your have successfully changed your email!");
                this.email = this.emailCtrl.value
            },
            error: (err) => {
                if (err.error.status == 400) {
                    this.snackBar.open(err.error.message);
                } else {
                    console.log(err)
                    this.snackBar.open("Something went wrong, please try again!");
                }
            }
        })
    }

    onCancelEmail() {
        this.emailCtrl = new FormControl<any>(this.email);
    }

    onSavePassword() {

        this.userService.changePassword(this.passwordForm.value).subscribe({
            next: (response) => {
                this.snackBar.open("Your have successfully changed your password!");
                this.initializeForm();
            },
            error: (err) => {
                if (err.error.status == 400) {
                    this.snackBar.open(err.error.message);
                } else {
                    console.log(err)
                    this.snackBar.open("Something went wrong, please try again!");
                }
            }
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
