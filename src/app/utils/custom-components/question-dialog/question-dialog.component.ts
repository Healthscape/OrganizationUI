import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {PaginatorModule} from "primeng/paginator";
import {RecordOverviewDto} from "../../../records/dto/record.overview.dto";

@Component({
  selector: 'app-question-dialog',
  standalone: true,
    imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatProgressBarModule, MatSelectModule, MatTooltipModule, PaginatorModule],
  templateUrl: './question-dialog.component.html',
  styleUrl: './question-dialog.component.scss'
})
export class QuestionDialogComponent {
  question: string = "";
  @Output() response: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private dialogRef: MatDialogRef<QuestionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {question: string}) {
    this.question = data.question
  }

  onClick(yesNo: boolean){
    this.dialogRef.close(yesNo);
  }
}
