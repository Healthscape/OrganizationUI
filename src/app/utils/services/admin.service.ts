import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment";
import {RegisterDto} from "../../auth/dto/register.dto";
import {UserDto} from "../../auth/dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  _http = inject(HttpClient)
  private REQUEST_MAPPING: string = "/admin";

  registerPractitioner(registerDto: RegisterDto) {
    return this._http.post<UserDto>(environment.apiUrl + this.REQUEST_MAPPING + "/practitioner", registerDto);
  }
}
