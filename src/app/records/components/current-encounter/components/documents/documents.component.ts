import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-documents',
  standalone: true,
  host:{
    class: 'documents-host-wrapper'
  },
  imports: [CommonModule, MatButtonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {

}
