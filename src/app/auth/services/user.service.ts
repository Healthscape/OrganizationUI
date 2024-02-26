import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment";
import {RegisterDto} from "../dto/register.dto";
import {UserDto} from "../dto/user.dto";
import {PasswordDto} from "../dto/password.dto";
import {FhirPatientDto} from "../../settings/dto/fhir.patient.dto";
import {TokensDto} from "../dto/tokes.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _http = inject(HttpClient)
  private REQUEST_MAPPING: string = "/users";

  constructor() {
  }

  registerUser(registerDto: RegisterDto) {
    return this._http.post(environment.apiUrl + this.REQUEST_MAPPING, registerDto);
  }

  me() {
    return this._http.get<UserDto>(environment.apiUrl + this.REQUEST_MAPPING + "/me");
  }

  getUsers() {
    return this._http.get<UserDto[]>(environment.apiUrl + this.REQUEST_MAPPING);
  }

  changeEmail(email: string){
    return this._http.put<TokensDto>(environment.apiUrl + this.REQUEST_MAPPING + '/email', email);
  }

  changePassword(passwordDto: PasswordDto){
    return this._http.put(environment.apiUrl + this.REQUEST_MAPPING + '/password', passwordDto);
  }

  updateUserInfo(fhirPatientDto: FhirPatientDto){
    return this._http.put(environment.apiUrl + this.REQUEST_MAPPING, fhirPatientDto);
  }
}
