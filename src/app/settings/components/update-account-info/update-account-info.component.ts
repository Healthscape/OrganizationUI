import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TokenService} from "../../../auth/services/token.service";
import {Router} from "@angular/router";
import {UserService} from "../../../users/services/user.service";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatTooltip} from "@angular/material/tooltip";
import {MatCardAvatar} from "@angular/material/card";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {UserDto} from "../../../auth/dto/user.dto";

@Component({
    selector: 'app-update-account-info',
    standalone: true,
    host: {
        class: "update-account-info-host-wrapper"
    },
    imports: [CommonModule, MatFormField, ReactiveFormsModule, MatTooltip, MatCardAvatar, MatInput, MatIconButton, MatIcon, MatButton, MatLabel, MatPrefix],
    templateUrl: './update-account-info.component.html',
    styleUrl: './update-account-info.component.scss'
})
export class UpdateAccountInfoComponent {
    @ViewChild('avatarPhoto') avatarPhoto?: HTMLDivElement;
    @ViewChild('fileInput') fileInput?: ElementRef;
    me?: UserDto;
    file: File = new File([], '');
    url?: string | ArrayBuffer | null;
    nameCtrl: FormControl = new FormControl<any>('');
    surnameCtrl: FormControl = new FormControl<any>('');
    photoCtrl: FormControl = new FormControl<any>('');
    form: FormGroup = new FormGroup<any>({});
    role: string = "";
    isLoading: boolean = false;

    constructor(_tokenService: TokenService, private router: Router, private userService: UserService) {
        this.me = this.router.getCurrentNavigation()?.extras?.state?.['me'];
        if(!this.me){
            this.userService.me().subscribe((response) =>{
                this.me = response;
                console.log(this.me);
                this.initializeForm();
            })
        }
        this.role = _tokenService.getRoleFromToken();
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
                this.avatarPhoto = avatarPhoto;
                avatarPhoto.style.backgroundImage = 'url(' + this.url + ')'
                this.photoCtrl.setValue(this.url);
            }
        }
    }

    onSave() {
        let formData = this.prepareFormData();
        this.form.disable();
        this.isLoading = true;
        this.userService.updateAccountInfo(formData).subscribe({
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

    prepareFormData(): FormData {
        let formData = new FormData();

        formData.append(
            'userDto',
            new Blob([JSON.stringify(this.form.getRawValue())], {type: 'application/json'})
        )

        formData.append(
            'newImage',
            this.file
        )

        return formData;
    }

    onCancel() {
        this.initializeForm();
        if(this.avatarPhoto){
            this.avatarPhoto.style.backgroundImage = 'url(\'data:image/png;base64, ' + this.photoCtrl.value + '\')'
        }
        if(this.fileInput){
            this.fileInput.nativeElement.value = "";
        }
        this.file = new File([], '');
    }

    private initializeForm() {
        this.nameCtrl = new FormControl<any>(this.me?.name, {validators: [Validators.required]});
        this.surnameCtrl = new FormControl<any>(this.me?.surname, {validators: [Validators.required]});
        this.photoCtrl = new FormControl<any>(this.me?.image);
        this.form = new FormGroup<any>({
            'name': this.nameCtrl,
            'surname': this.surnameCtrl,
        })
    }
}
