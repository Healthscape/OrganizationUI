import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment";
import {RecordOverviewDto} from "../../records/dto/record.overview.dto";

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  _http = inject(HttpClient)
  private REQUEST_MAPPING: string = "/records";

  findRecordWithPersonalId(personalId: string) {
    return this._http.get<RecordOverviewDto>(environment.apiUrl + this.REQUEST_MAPPING + "/" + personalId);
  }
}
