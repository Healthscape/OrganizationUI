import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {UserService} from "../../../auth/services/user.service";
import {UserDto} from "../../../auth/dto/user.dto";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-users',
  host:{
    class: 'users-host-wrapper'
  },
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTooltipModule, MatTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: UserDto[] = []
  displayedColumns: string[] = ['image', 'name', 'email', 'role', 'date-created'];

  constructor(private userService: UserService) {
    userService.getUsers().subscribe({
      next: (users) => {
        this.users = users
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
