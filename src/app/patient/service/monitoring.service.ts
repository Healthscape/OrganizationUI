import { HttpClient } from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import { environment } from "../../../environment";
import { AccessLogEntryDto } from "../dtos/AccessLogEntryDto";
import { SecurityCheckDto } from "../../utils/dto/security-check.dto";

@Injectable({
    providedIn: 'root'
})
export class MonitoringService {
    _http = inject(HttpClient)
    private REQUEST_MAPPING: string = "/monitoring";

    getAccessLogs() {
        return this._http.get<AccessLogEntryDto[]>(environment.apiUrl + this.REQUEST_MAPPING);
    }

    getSecurityStatus() {
        return this._http.get<boolean>(environment.apiUrl + this.REQUEST_MAPPING + '/integrity');
    }
}