import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import ConfirmPasswordValidator from "../../../auth/components/validator/confirm-password.validator";
import {MatSelectModule} from "@angular/material/select";
import {SpecialtyDto} from "../../dtos/specialty.dto";
import {SpecialtyService} from "../../services/specialty.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ResponseJson} from "../../../utils/dto/response-json.dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminService} from "../../../utils/services/admin.service";
import {UserDto} from "../../../auth/dto/user.dto";

@Component({
  selector: 'app-new-doctor',
  standalone: true,
  imports: [CommonModule, MatDialogActions, MatButtonModule, MatDialogClose, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule, MatTooltipModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './new-doctor.component.html',
  styleUrls: ['./new-doctor.component.scss', '../../../auth/components/login-register/login-register.component.scss']
})
export class NewDoctorComponent {
  nameCtrl: FormControl = new FormControl<any>('');
  surnameCtrl: FormControl = new FormControl<any>('');
  emailCtrl: FormControl = new FormControl<any>('');
  passwordCtrl: FormControl = new FormControl<any>('');
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  confirmPasswordCtrl: FormControl = new FormControl<any>('');
  isLoading: boolean = false;
  newDoctorForm: FormGroup = new FormGroup({});
  specialtyCtrl: FormControl = new FormControl<any>('');
  specialties: SpecialtyDto[] = [];

  constructor(private dialogRef: MatDialogRef<NewDoctorComponent>, private _specialtyService: SpecialtyService, private _adminService: AdminService, private _snackBar: MatSnackBar) {
    this.initForm();
    this._specialtyService.getAllSpecialties().subscribe(
      {
        next: (response) => {
          this.specialties = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error)
        }
      })

  }


  onRegister() {
    this.isLoading = true
    this.newDoctorForm.disable()
    this._adminService.registerPractitioner(this.newDoctorForm.value).subscribe({
      next: (response: UserDto) => {
        this.isLoading = false;
        this.dialogRef.close(response);
        this._snackBar.open("You have successfully registered a new doctor!");
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error as ResponseJson)
        this.newDoctorForm.enable()
        this.isLoading = false;
        let responseErr = (err.error as ResponseJson);
        console.log(responseErr.message)
        this._snackBar.open("Something went wrong. Please try again!");
      }
    });
  }

  private initForm() {
    this.emailCtrl = new FormControl('', [Validators.email, Validators.required])
    this.passwordCtrl = new FormControl('', [Validators.required])
    this.confirmPasswordCtrl = new FormControl('', [Validators.required])
    this.nameCtrl = new FormControl('', [Validators.required])
    this.surnameCtrl = new FormControl('', [Validators.required])
    this.specialtyCtrl = new FormControl('', [Validators.required])
    this.newDoctorForm = new FormGroup({
        'name': this.nameCtrl,
        'surname': this.surnameCtrl,
        'email': this.emailCtrl,
        'password': this.passwordCtrl,
        'confirmPassword': this.confirmPasswordCtrl,
        'specialty': this.specialtyCtrl
      },
      {
        validators: [ConfirmPasswordValidator.match('password', 'confirmPassword')]
      })
  }
}
