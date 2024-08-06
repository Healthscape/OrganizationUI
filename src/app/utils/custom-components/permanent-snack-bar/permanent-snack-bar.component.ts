import {Component, Injectable} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSnackBar} from "@angular/material/snack-bar";
@Injectable()
@Component({
  selector: 'app-permanent-snack-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permanent-snack-bar.component.html',
  styleUrl: './permanent-snack-bar.component.scss'
})
export class PermanentSnackBarComponent {
  message: string = "";

  constructor(public snackBar: MatSnackBar) { }

  open(message: string) {
    this.message = message;
    this.snackBar.openFromComponent(PermanentSnackBarComponent, {duration: Number.MAX_VALUE});
  }
}
