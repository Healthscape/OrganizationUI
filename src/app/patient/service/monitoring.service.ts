import { HttpClient } from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import { environment } from "../../../environment";
import { AccessLogEntryDto } from "../dtos/AccessLogEntryDto";

@Injectable({
    providedIn: 'root'
})
export class MonitoringService {
    _http = inject(HttpClient)
    private REQUEST_MAPPING: string = "/monitoring";

    getAccessLogs() {
        return this._http.get<AccessLogEntryDto[]>(environment.apiUrl + this.REQUEST_MAPPING);
    }
}