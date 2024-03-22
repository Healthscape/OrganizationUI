import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";

@Component({
    selector: 'app-patients',
    host: {
        class: 'patients-host-wrapper'
    },
    standalone: true,
    imports: [CommonModule, MatCardModule],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss'
})
export class PatientsComponent {

}
