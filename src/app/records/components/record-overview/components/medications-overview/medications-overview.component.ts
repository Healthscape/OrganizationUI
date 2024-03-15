import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MedicationAdministrationDto} from "../../../../dto/medicationAdministrationDto";
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
  medications = [new MedicationAdministrationDto(), new MedicationAdministrationDto(), new MedicationAdministrationDto(),new MedicationAdministrationDto(), new MedicationAdministrationDto(), new MedicationAdministrationDto()];
  @Input() edit: boolean = false;
}
