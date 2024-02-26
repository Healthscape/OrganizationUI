import {inject, Injectable} from "@angular/core";
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {SpecialtyDto} from "../dtos/specialty.dto";

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  _http = inject(HttpClient)
  private REQUEST_MAPPING: string = "/specialty";

  getAllSpecialties() {
    return this._http.get<SpecialtyDto[]>(environment.apiUrl + this.REQUEST_MAPPING);
  }

}
