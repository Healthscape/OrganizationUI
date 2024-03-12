import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {Router} from "@angular/router";
import {FhirUserDto} from "../../dto/fhirUserDto";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../auth/services/user.service";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgxMaskDirective} from "ngx-mask";
import {FhirService} from "../../service/fhir.service";
import {GenderEnum} from "../../../utils/enums/gender.enum";
import {MaritalStatusEnum} from "../../../utils/enums/marital.status.enum";
import {TokenService} from "../../../auth/services/token.service";
import {SpecialtyDto} from "../../../users/dtos/specialty.dto";
import {HttpErrorResponse} from "@angular/common/http";
import {SpecialtyService} from "../../../users/services/specialty.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
  selector: 'app-update-info',
  host: {
    class: 'update-info-host-wrapper'
  },
  standalone: true,
  imports: [MatDatepickerModule, MatNativeDateModule, CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatInputModule, ReactiveFormsModule, MatSelectModule, NgxMaskDirective, MatProgressBarModule],
  templateUrl: './update-info.component.html',
  styleUrl: './update-info.component.scss'
})
export class UpdateInfoComponent {
  me?: FhirUserDto;
  file: File = new File([],'');
  url?: string | ArrayBuffer | null;
  genderCtrl: FormControl = new FormControl<any>('');
  maritalStatusCtrl: FormControl = new FormControl<any>('');
  phoneCtrl: FormControl = new FormControl<any>('');
  birthDateCtrl: FormControl = new FormControl<any>('');
  addressCtrl: FormControl = new FormControl<any>('');
  idCtrl: FormControl = new FormControl<any>('');
  nameCtrl: FormControl = new FormControl<any>('');
  surnameCtrl: FormControl = new FormControl<any>('');
  photoCtrl: FormControl = new FormControl<any>('');
  emailCtrl: FormControl = new FormControl<any>('');
  form: FormGroup = new FormGroup<any>({});
  role: string = "";

  genders: GenderEnum = new GenderEnum();
  maritalStatuses: MaritalStatusEnum = new MaritalStatusEnum();
  specialtyCtrl: FormControl = new FormControl<any>('');
  specialties: SpecialtyDto[] = [];
  isLoading: boolean = false;

  constructor(private specialtyService: SpecialtyService, _tokenService: TokenService, private router: Router, private userService: UserService, _fhirService: FhirService) {
    this.me = this.router.getCurrentNavigation()?.extras?.state?.['me'];
    this.role = _tokenService.getRoleFromToken();
    if(this.role == "ROLE_PRACTITIONER") {
      this.specialtyService.getAllSpecialties().subscribe(
        {
          next: (response) => {
            this.specialties = response;
            this.initializeSpecialty();
          },
          error: (error: HttpErrorResponse) => {
            console.log(error)
          }
        })
    }
    if (!this.me) {
      _fhirService.me().subscribe({
        next: (user) => {
          this.me = user;
        }
      })
    }
    this.initializeForm();
  }

  onChangePhotoButton(fileInput: HTMLInputElement) {
    fileInput.click()
  }

  onChangePhoto(event: Event, avatarPhoto: HTMLDivElement) {
    const target = event.target as HTMLInputElement;
    const files = target?.files as FileList;

    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    this.file = files[0];
    reader.onload = (_event) => {
      this.url = reader.result;
      if (typeof this.url === "string") {
        avatarPhoto.style.backgroundImage = 'url(' + this.url + ')'
        this.photoCtrl.setValue(this.url);
      }
    }
  }

  onSave() {
    let formData = this.prepareFormData();
    this.form.disable();
    this.isLoading = true;
    this.userService.updateUserInfo(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(["home", "settings"]).then()
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err)
        this.router.navigate(["home", "settings"]).then()
      }
    })
  }

  prepareFormData(): FormData{
    let formData = new FormData();

    formData.append(
      'userDto',
      new Blob([JSON.stringify(this.form.getRawValue())], {type:'application/json'})
    )

    formData.append(
      'newImage',
      this.file
    )

    return formData;
  }

  onCancel() {
    this.initializeForm();
  }

  public isFocused(element: HTMLInputElement) {

    return document.activeElement == element
  }

  private initializeForm() {
    this.nameCtrl = new FormControl<any>(this.me?.name, {validators: [Validators.required]});
    this.surnameCtrl = new FormControl<any>(this.me?.surname, {validators: [Validators.required]});
    this.idCtrl = new FormControl<any>({value: this.me?.identifier, disabled: true});
    this.birthDateCtrl = new FormControl<any>(this.me?.birthDate);
    this.addressCtrl = new FormControl<any>(this.me?.address);
    this.genderCtrl = new FormControl<any>(this.me?.gender);
    this.maritalStatusCtrl = new FormControl<any>(this.me?.maritalStatus);
    this.phoneCtrl = new FormControl<any>(this.me?.phone);
    this.photoCtrl = new FormControl<any>(this.me?.image);
    this.emailCtrl = new FormControl<any>(this.me?.email);
    this.form = new FormGroup<any>({
      'name': this.nameCtrl,
      'surname': this.surnameCtrl,
      'identifier': this.idCtrl,
      'birthDate': this.birthDateCtrl,
      'address': this.addressCtrl,
      'gender': this.genderCtrl,
      'maritalStatus': this.maritalStatusCtrl,
      'phone': this.phoneCtrl,
      'email': this.emailCtrl
    })
  }

  private initializeSpecialty() {
    this.specialties.forEach((specialty) =>{
      if(specialty.name === this.me?.specialty){
        this.specialtyCtrl = new FormControl<any>(specialty.code);
        return;
      }
    })
    this.form.addControl('specialty',this.specialtyCtrl);
  }
}
