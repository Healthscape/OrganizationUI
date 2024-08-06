import {Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {UserService} from "../../services/user.service";
import {UserDto} from "../../../auth/dto/user.dto";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTable, MatTableModule} from "@angular/material/table";
import {SubjectService} from "../../../utils/services/subject.service";

@Component({
    selector: 'app-users',
    host: {
        class: 'users-host-wrapper'
    },
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTooltipModule, MatTableModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent {
    users: UserDto[] = []
    @ViewChild(MatTable) table?: MatTable<UserDto>;
    displayedColumns: string[] = ['role', 'name', 'email', 'date-created'];

    constructor(_subjectService: SubjectService, _userService: UserService) {
        _subjectService.newDoctorSubject.subscribe({
            next: (response) => {
                this.users.push(response);
                this.table?.renderRows();
            },
            error: (err) => {
                console.log(err)
            }

        })
        _userService.getUsers().subscribe({
            next: (users) => {
                this.users = users
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

}
