import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MedicationDto} from "../../../../dto/medication.dto";

@Component({
  selector: 'app-medications-overview',
  standalone: true,
  host:{
    class: "medications-overview-host-wrapper"
  },
  imports: [CommonModule],
  templateUrl: './medications-overview.component.html',
  styleUrl: './medications-overview.component.scss'
})
export class MedicationsOverviewComponent {  medications = [new MedicationDto(), new MedicationDto(), new MedicationDto(),new MedicationDto(), new MedicationDto(), new MedicationDto()];
}
