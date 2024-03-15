import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EncounterDto} from "../../../../dto/encounter.dto";
import {MatCardModule} from "@angular/material/card";
import {TimelineComponent} from "../../../../../utils/custom-components/timeline/timeline.component";
import moment from "moment";

@Component({
  selector: 'app-encounters-overview',
  standalone: true,
  host: {
    class: "encounters-overview-host-wrapper"
  },
  imports: [CommonModule, MatCardModule, TimelineComponent],
  templateUrl: './encounters-overview.component.html',
  styleUrl: './encounters-overview.component.scss'
})
export class EncountersOverviewComponent {
  encounters = [new EncounterDto(), new EncounterDto(), new EncounterDto(),new EncounterDto(), new EncounterDto(), new EncounterDto()];

  constructor() {
    this.calculateMonthsAgo();
  }

  private calculateMonthsAgo() {
    this.encounters.forEach((encounter) => {
      encounter.ago = this.getMonthsAgo(encounter.dateTime);
    })
  }

  getMonthsAgo(date: Date){
    let dateFrom = date;
    let dateTo = new Date();

    let months = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));

    let result;
    if (months >= 12) {
      result = (months - (months %12))/12 + " years ago";
    } else if(months != 0) {
      result = months + " months ago";
    }else {
      result = "This month";
    }
    return result;
  }
}