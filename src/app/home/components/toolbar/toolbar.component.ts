import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-toolbar',
  host: {
    class:'toolbar-host-wrapper'
  },
  standalone: true,
  imports: [CommonModule, MatInputModule, MatCardModule, NgOptimizedImage, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  public minute: string = '';
  public hour: any;
  public currentDate: Date = new Date();

  ngOnInit() {
    this.currentDate = new Date();
    this.updateDate();
    setInterval(() => {
      this.currentDate = new Date();
      this.updateDate();
    }, 1000);

  }


  private updateDate(){
    const hours = this.currentDate.getHours();
    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;

    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;

    const minutes = this.currentDate.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();
  }
}
