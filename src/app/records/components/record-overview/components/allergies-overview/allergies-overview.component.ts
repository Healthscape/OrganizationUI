import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AllergyDto} from "../../../../dto/allergy.dto";

@Component({
  selector: 'app-allergies-overview',
  standalone: true,
  host:{
    class: "allergies-overview-host-wrapper"
  },
  imports: [CommonModule],
  templateUrl: './allergies-overview.component.html',
  styleUrl: './allergies-overview.component.scss'
})
export class AllergiesOverviewComponent {
  allergies = [new AllergyDto(), new AllergyDto(), new AllergyDto(),new AllergyDto(), new AllergyDto(), new AllergyDto()];

}
