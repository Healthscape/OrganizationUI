import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment";
import {PatientRecordUpdateDto} from "../dto/patientRecordUpdate.dto";
import {MedicationAdministrationDto} from "../dto/medicationAdministrationDto";

class List<T> {
}

@Injectable({
    providedIn: 'root'
})
export class EncounterService{
    _http = inject(HttpClient)
    private REQUEST_MAPPING: string = "/encounter";

    startEncounter(requestId: string) {
        return this._http.post(environment.apiUrl + this.REQUEST_MAPPING + "/start", requestId);
    }

    getMedicationAdministrationHistory() {
        let requestId = sessionStorage.getItem("request");
        return this._http.get<MedicationAdministrationDto[]>(environment.apiUrl + this.REQUEST_MAPPING + "/medication-history/" + requestId);
    }

    endEncounter(patientRecordUpdated: PatientRecordUpdateDto) {
        return this._http.post(environment.apiUrl + this.REQUEST_MAPPING + "/end", patientRecordUpdated);
    }
}