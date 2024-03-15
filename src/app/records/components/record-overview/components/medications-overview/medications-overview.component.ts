import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MedicationDto} from "../../../../dto/medication.dto";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-medications-overview',
  standalone: true,
  host:{
    class: "medications-overview-host-wrapper"
  },
  imports: [CommonModule, MatButtonModule],
  templateUrl: './medications-overview.component.html',
  styleUrl: './medications-overview.component.scss'
})
export class MedicationsOverviewComponent {
  medications = [new MedicationDto(), new MedicationDto(), new MedicationDto(),new MedicationDto(), new MedicationDto(), new MedicationDto()];
  @Input() edit: boolean = false;
}
