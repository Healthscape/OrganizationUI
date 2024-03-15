import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConditionDto} from "../../../../dto/condition.dto";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-conditions-overview',
  standalone: true,
  host:{
    class: "conditions-overview-host-wrapper"
  },
  imports: [CommonModule, MatButtonModule],
  templateUrl: './conditions-overview.component.html',
  styleUrl: './conditions-overview.component.scss'
})
export class ConditionsOverviewComponent {
  @Input() edit: boolean = false;
  conditions = [new ConditionDto(), new ConditionDto()];
}
