import {Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import { UserService } from '../../../users/services/user.service';
import { UserDto } from '../../../auth/dto/user.dto';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-patients',
    host: {
        class: 'patients-host-wrapper'
    },
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTooltipModule, MatTableModule],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss'
})
export class PatientsComponent {
    patients: UserDto[] = []
    @ViewChild(MatTable) table?: MatTable<UserDto>;
    displayedColumns: string[] = ['role', 'name', 'email', 'date-created'];

    constructor(private userService: UserService) {
        this.userService.getPatients().subscribe({
            next: (patients) => {
                this.patients = patients;
            },
            error: (err) => {
                console.log(err)
            }
        })
}

}
