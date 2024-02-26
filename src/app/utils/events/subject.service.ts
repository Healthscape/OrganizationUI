import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {UserDto} from "../../auth/dto/user.dto";

@Injectable({
    providedIn: 'root'
})
export class SubjectService {
    newDoctorSubject = new Subject<UserDto>();
}
