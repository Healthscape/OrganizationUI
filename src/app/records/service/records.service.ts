import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AccessRequestDto} from "../../access-requests/dtos/access.request.dto";
import {environment} from "../../../environment";
import {RecordOverviewDto} from "../dto/record.overview.dto";

@Injectable({
  providedIn: 'root'
})
export class RecordsService{
  _http = inject(HttpClient)
  private REQUEST_MAPPING: string = "/records";

  getAllAvailablePatientRecords() {
    return this._http.get<AccessRequestDto[]>(environment.apiUrl + this.REQUEST_MAPPING);
  }

  getPatientRecord(patientId: string) {
    return this._http.get<any>(environment.apiUrl + this.REQUEST_MAPPING + "/" + patientId);
  }

  findRecordWithPersonalId(personalId: string) {
    return this._http.get<RecordOverviewDto>(environment.apiUrl + this.REQUEST_MAPPING, {params:{personalId: personalId}});
  }

}
