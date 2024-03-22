import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environment";
import {RegisterDto} from "../../auth/dto/register.dto";
import {UserDto} from "../../auth/dto/user.dto";
import {PasswordDto} from "../../auth/dto/password.dto";
import {FhirUserDto} from "../../settings/dto/fhirUserDto";
import {TokensDto} from "../../auth/dto/tokes.dto";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    _http = inject(HttpClient)
    updateImage: Subject<string | undefined> = new BehaviorSubject<string | undefined>("");
    private REQUEST_MAPPING: string = "/users";

    getDetailedMe() {
        return this._http.get<FhirUserDto>(environment.apiUrl + this.REQUEST_MAPPING + "/me/detailed");
    }

    registerUser(registerDto: RegisterDto) {
        return this._http.post(environment.apiUrl + this.REQUEST_MAPPING + "/patient", registerDto);
    }

    me() {
        return this._http.get<UserDto>(environment.apiUrl + this.REQUEST_MAPPING + "/me");
    }

    getUsers() {
        return this._http.get<UserDto[]>(environment.apiUrl + this.REQUEST_MAPPING);
    }

    changeEmail(email: string) {
        return this._http.put<TokensDto>(environment.apiUrl + this.REQUEST_MAPPING + '/email', email);
    }

    changePassword(passwordDto: PasswordDto) {
        return this._http.put(environment.apiUrl + this.REQUEST_MAPPING + '/password', passwordDto);
    }

    updateUserInfo(formData: FormData) {
        let header = new HttpHeaders();
        header = header.set('Content-Type', 'multipart/form-data;charset=utf-8')
        return this._http.put<any>(environment.apiUrl + this.REQUEST_MAPPING, formData, {
            headers: header
        });
    }

    updateAccountInfo(formData: FormData) {
        let header = new HttpHeaders();
        header = header.set('Content-Type', 'multipart/form-data;charset=utf-8')
        return this._http.put<any>(environment.apiUrl + this.REQUEST_MAPPING + "/info", formData, {
            headers: header
        });
    }

    registerPractitioner(registerDto: RegisterDto) {
        return this._http.post<UserDto>(environment.apiUrl + this.REQUEST_MAPPING + "/practitioner", registerDto);
    }
}
