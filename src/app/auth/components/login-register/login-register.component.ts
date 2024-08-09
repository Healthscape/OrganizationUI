import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoComponent} from "../../../utils/logo/logo.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegistrationService} from "../../../users/services/registration.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {ResponseJson} from "../../../utils/dto/response-json.dto";
import ConfirmPasswordValidator from "../validator/confirm-password.validator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-login-register',
    standalone: true,
    imports: [CommonModule, LogoComponent, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, MatTooltipModule, MatProgressBarModule],
    templateUrl: './login-register.component.html',
    styleUrl: './login-register.component.scss',
})
export class LoginRegisterComponent {
    @Output('onChange') onChangeEmitter: EventEmitter<void> = new EventEmitter<void>();
    @Input() isSignUp: boolean = false;

    registerForm: FormGroup = new FormGroup({});
    loginForm: FormGroup = new FormGroup({});
    loginEmailCtrl: FormControl = new FormControl();
    loginPasswordCtrl: FormControl = new FormControl();
    showErrorMessage: boolean = false;
    errorMessage: String = "";
    registerNameCtrl: FormControl = new FormControl();
    registerSurnameCtrl: FormControl = new FormControl();
    registerEmailCtrl: FormControl = new FormControl();
    registerPasswordCtrl: FormControl = new FormControl();
    registerConfirmPasswordCtrl: FormControl = new FormControl();
    passwordVisible: boolean = false;
    confirmPasswordVisible: boolean = false;
    loginPasswordVisible: boolean = false;
    isLoading: boolean = false;
    registerIDCtrl: FormControl = new FormControl();

    constructor(private registrationService: RegistrationService, private _authService: AuthService, private _snackBar: MatSnackBar) {
        this.initLoginForm();
        this._authService.errorResponse.subscribe((value) => {
            if (value != null) {
                this.errorMessage = "The email and password you entered did not match out records. Please double-check and try again."
                this.showErrorMessage = true;
            }
        })
    }

    onChange() {
        this.isSignUp = !this.isSignUp;
        if (this.isSignUp) {
            this.initRegisterForm()
        } else {
            this.initLoginForm()
        }
        this.onChangeEmitter.emit()
    }

    onRegister() {
        this.isLoading = true
        this.registerForm.disable()
        this.registrationService.registerPatient(this.registerForm.value).subscribe({
            next: () => {
                this.onChange()
                this.isLoading = false;
                this._snackBar.open("Your registration was successful!");
            },
            error: (err: HttpErrorResponse) => {
                this.registerForm.enable()
                this.isLoading = false;
                let responseErr = (err.error as ResponseJson);
                console.log(responseErr.message)
                this._snackBar.open("Something went wrong. Please try again!");
            }
        });
    }

    onLogin() {
        if (this.loginForm.valid) {
            this._authService.logInUser(this.loginForm.value);
        } else {
            this.errorMessage = "The email and password you entered did not match out records. Please double-check and try again."
            this.showErrorMessage = true;
        }
    }

    private initLoginForm() {
        this.loginEmailCtrl = new FormControl('', [Validators.required])
        // TODO: uncomment
        // this.loginEmailCtrl = new FormControl('', [Validators.email, Validators.required])
        this.loginPasswordCtrl = new FormControl('', [Validators.required])
        this.loginForm = new FormGroup({
            'email': this.loginEmailCtrl,
            'password': this.loginPasswordCtrl
        })
    }

    private initRegisterForm() {
        this.registerEmailCtrl = new FormControl('', [Validators.email, Validators.required])
        this.registerPasswordCtrl = new FormControl('', [Validators.required])
        this.registerConfirmPasswordCtrl = new FormControl('', [Validators.required])
        this.registerNameCtrl = new FormControl('', [Validators.required])
        this.registerSurnameCtrl = new FormControl('', [Validators.required])
        this.registerIDCtrl = new FormControl('', [Validators.required])
        this.registerForm = new FormGroup({
                'name': this.registerNameCtrl,
                'surname': this.registerSurnameCtrl,
                'email': this.registerEmailCtrl,
                'password': this.registerPasswordCtrl,
                'confirmPassword': this.registerConfirmPasswordCtrl,
                'identifier': this.registerIDCtrl
            },
            {
                validators: [ConfirmPasswordValidator.match('password', 'confirmPassword')]
            })
    }
}
