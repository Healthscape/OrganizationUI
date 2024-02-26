import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {UserService} from "../../../auth/services/user.service";
import {UserDto} from "../../../auth/dto/user.dto";

@Component({
  selector: 'app-toolbar',
  host: {
    class: 'toolbar-host-wrapper'
  },
  standalone: true,
  imports: [CommonModule, MatInputModule, MatCardModule, NgOptimizedImage, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnDestroy {
  public minute: string = '';
  public hour: any;
  public currentDate: Date = new Date();
  me: UserDto = new UserDto();
  timer: number;

  constructor(private userService: UserService, private changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef.detach();
    this.currentDate = new Date();
    this.updateDate();
    this.timer = setInterval(() => {
      this.currentDate = new Date();
      this.updateDate();
      this.changeDetectorRef.detectChanges();
    }, 1000);
    userService.me().subscribe({
      next: (user) => {
        this.me = user;
      }
    })
  }

  ngOnDestroy() {
    clearInterval(this.timer)
  }


  private updateDate() {
    const hours = this.currentDate.getHours();
    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;

    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;

    const minutes = this.currentDate.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();
  }

}
