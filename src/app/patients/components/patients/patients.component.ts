import {Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import { UserService } from '../../../users/services/user.service';
import { UserDto } from '../../../auth/dto/user.dto';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RecordsService } from '../../../records/service/records.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-patients',
    host: {
        class: 'patients-host-wrapper'
    },
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTooltipModule, MatTableModule, MatButtonModule],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss'
})
export class PatientsComponent {
    patients: UserDto[] = []
    @ViewChild(MatTable) table?: MatTable<UserDto>;
    displayedColumns: string[] = ['role', 'name', 'email', 'date-created', 'view'];

    constructor(private router: Router,private route: ActivatedRoute, private userService: UserService, private recordService: RecordsService) {
        this.userService.getPatients().subscribe({
            next: (patients) => {
                this.patients = patients;
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    openPatientRecord(patientUserId: string) {
        this.recordService.findRecordWithUserId(patientUserId).subscribe((response) => {
            const id = crypto.randomUUID();
            console.log(response);
            response.patientId = patientUserId;
            sessionStorage.setItem(id, JSON.stringify(response));
            sessionStorage.setItem("request", patientUserId);
            this.router.navigate(['home','patients', id]).then();

        });
    }

}
