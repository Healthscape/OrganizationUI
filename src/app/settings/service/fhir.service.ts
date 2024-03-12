import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment";
import {FhirUserDto} from "../dto/fhirUserDto";

@Injectable({
  providedIn: 'root'
})
export class FhirService {
  _http = inject(HttpClient)
  private REQUEST_MAPPING: string = "/fhir";

  me() {
    return this._http.get<FhirUserDto>(environment.apiUrl + this.REQUEST_MAPPING + "/me");
  }
}
