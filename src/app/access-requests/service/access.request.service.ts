import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment";
import {AccessRequestDto} from "../dtos/access.request.dto";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccessRequestService {
  _http = inject(HttpClient)
  private REQUEST_MAPPING: string = "/accessRequests";
  newAccessRequest: Subject<AccessRequestDto> = new Subject<AccessRequestDto>();
  updateAccessRequest: Subject<AccessRequestDto> = new Subject<AccessRequestDto>();

  getAccessRequestForUser(userId: string) {
    return this._http.get<AccessRequestDto>(environment.apiUrl + this.REQUEST_MAPPING + "/" + userId);
  }

  sendAccessRequest(userId: string) {
    return this._http.post<AccessRequestDto>(environment.apiUrl + this.REQUEST_MAPPING + "/" + userId, {});
  }

  getAccessRequests() {
    return this._http.get<AccessRequestDto[]>(environment.apiUrl + this.REQUEST_MAPPING + "/recent");
  }

  getAccessRequestsByReviewed(reviewed: boolean) {
    return this._http.get<AccessRequestDto>(environment.apiUrl + this.REQUEST_MAPPING, {params: {reviewed: reviewed}});
  }

  reviewAccessRequest(updated: AccessRequestDto) {
    console.log(updated)
    return this._http.put<AccessRequestDto>(environment.apiUrl + this.REQUEST_MAPPING, updated);
  }

  getAccessRequestsByStatus(status: string) {
    return this._http.get<AccessRequestDto[]>(environment.apiUrl + this.REQUEST_MAPPING, {params: {status: status}});
  }

  getAccessRequestHistory(requestId: string) {
    return this._http.get<AccessRequestDto[]>(environment.apiUrl + this.REQUEST_MAPPING + "/" + requestId + "/history");

  }
}
