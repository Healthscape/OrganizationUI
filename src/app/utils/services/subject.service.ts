import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {UserDto} from "../../auth/dto/user.dto";
import {MedicationAdministrationDto} from "../../records/dto/medicationAdministrationDto";
import {AllergyDto} from "../../records/dto/allergy.dto";
import {ConditionDto} from "../../records/dto/condition.dto";

@Injectable({
    providedIn: 'root'
})
export class SubjectService {
    newDoctorSubject = new Subject<UserDto>();
    collapseSidebar = new Subject();
    encounterStarted = new Subject();
    reloadBreadcrumbs = new Subject();
    newMedication = new Subject<MedicationAdministrationDto>();
    encounterEnded= new Subject();
    newAllergy = new Subject<AllergyDto>();
    newCondition= new Subject<ConditionDto>();
}