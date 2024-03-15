import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {TextFieldModule} from "@angular/cdk/text-field";

@Component({
  selector: 'app-clinical-impression',
  standalone: true,
  host:{
    class:'clinical-impression-host-wrapper'
  },
    imports: [CommonModule, MatFormFieldModule, MatInputModule, TextFieldModule],
  templateUrl: './clinical-impression.component.html',
  styleUrl: './clinical-impression.component.scss'
})
export class ClinicalImpressionComponent {

}
