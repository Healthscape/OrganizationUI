import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {
  ConditionsOverviewComponent
} from "../record-overview/components/conditions-overview/conditions-overview.component";
import {ClinicalImpressionComponent} from "./components/clinical-impression/clinical-impression.component";
import {DocumentsComponent} from "./components/documents/documents.component";
import {
  MedicationsOverviewComponent
} from "../record-overview/components/medications-overview/medications-overview.component";

@Component({
  selector: 'app-current-encounter',
  standalone: true,
  host:{
    class: "current-encounter-host-wrapper"
  },
  imports: [CommonModule, MatButtonModule, MatInputModule, ConditionsOverviewComponent, ClinicalImpressionComponent, DocumentsComponent, MedicationsOverviewComponent],
  templateUrl: './current-encounter.component.html',
  styleUrl: './current-encounter.component.scss'
})
export class CurrentEncounterComponent implements OnInit {
  time: number = 0;
  display : string = '00 : 00';
  interval : any;
  @Input() startedAt: Date = new Date();
  @Input() encounterStarted: boolean = false;

  constructor() {
  }

  startTimer() {
    let startAt = new Date().getTime() - this.startedAt.getTime();
    startAt = startAt - (startAt%1000);
    this.time = startAt/1000;
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.display=this.transform( this.time)
    }, 1000);
    this.encounterStarted = true;
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  ngOnInit(): void {
    if(this.encounterStarted){
      this.startTimer();
    }
  }

  transform(value: number): string {

    const hours: number = Math.floor(value / 60);
    const minutes: number = (value - hours * 60);

    if (hours < 10 && minutes < 10) {
      return '0' + hours + ' : 0' + (value - hours * 60);
    }
    if (hours > 10 && minutes > 10) {
      return '0' + hours + ' : ' + (value - hours * 60);
    }
    if (hours > 10 && minutes < 10) {
      return hours + ' : 0' + (value - hours * 60);
    }
    if (minutes > 10) {
      return '0' + hours + ' : ' + (value - hours * 60);
    }
    return '';
  }

  startNow() {
    this.startedAt = new Date();
    this.startTimer();
  }
}
