import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {RecordOverviewDto} from "../../dto/record.overview.dto";
import {AccessRequestService} from "../../../access-requests/service/access.request.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RequestDialogComponent} from "../../../access-requests/components/request-dialog/request-dialog.component";
import {AccessRequestDto} from "../../../access-requests/dtos/access.request.dto";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
  selector: 'app-record-preview-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, ReactiveFormsModule, MatProgressBarModule],
  templateUrl: './record-preview-dialog.component.html',
  styleUrl: './record-preview-dialog.component.scss'
})
export class RecordPreviewDialogComponent {
  recordOverview: RecordOverviewDto = new RecordOverviewDto();
  accessRequest?: AccessRequestDto;
  loading: boolean = true;

  constructor(private accessRequestService: AccessRequestService, private _snackBar: MatSnackBar, private dialogRef: MatDialogRef<RecordPreviewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {record: RecordOverviewDto}, private dialog: MatDialog) {
    this.recordOverview = data.record;
    this.accessRequestService.getAccessRequestForUser(this.recordOverview.id).subscribe({
      next: (response) =>{
        this.loading = false
        console.log(response)
        this.accessRequest = response;
      },
      error: (err) =>{
        this.loading = false
        console.log(err)
      }
    })
  }

  onSend() {
    this.loading = true;
    this.accessRequestService.sendAccessRequest(this.recordOverview.id).subscribe({
      next:(response) =>{
        console.log(response)
        this.accessRequestService.newAccessRequest.next(response);
        this.dialogRef.close();
        this._snackBar.open("Access requests successfully sent.");
      },
      error: (err) =>{
        console.log(err)
        this.loading = false;
        this._snackBar.open("Something went wrong!");
      }
    })
  }

  onOpen() {
    this.dialogRef.close();
    this.dialog.open(RequestDialogComponent, {
      minWidth: "40vw",
      data:{
        request: this.accessRequest
      }
    });
  }
}
