import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConditionDto} from "../../../../dto/condition.dto";

@Component({
  selector: 'app-conditions-overview',
  standalone: true,
  host:{
    class: "conditions-overview-host-wrapper"
  },
  imports: [CommonModule],
  templateUrl: './conditions-overview.component.html',
  styleUrl: './conditions-overview.component.scss'
})
export class ConditionsOverviewComponent {
  conditions = [new ConditionDto(), new ConditionDto()];
}
