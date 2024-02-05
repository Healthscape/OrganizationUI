import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment";
import {RegisterDto} from "../dto/register.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _http = inject(HttpClient)
  private REQUEST_MAPPING: string = "/user";

  constructor() {
  }

  registerUser(registerDto: RegisterDto) {
    return this._http.post(environment.apiUrl + this.REQUEST_MAPPING, registerDto);
  }
}
