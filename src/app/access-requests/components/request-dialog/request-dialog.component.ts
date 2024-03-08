import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {AccessRequestDto} from "../../dtos/access.request.dto";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DecisionEnum, DecisionEnumLabelMapping} from "../../enums/decision.enum";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {AccessRequestService} from "../../service/access.request.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenService} from "../../../auth/services/token.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-request-dialog',
  host:{
    class: 'request-dialog-host-wrapper'
  },
  standalone: true,
  imports: [MatDatepickerModule, MatNativeDateModule, CommonModule, MatCardModule, MatFormFieldModule, MatOptionModule, MatSelectModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatTableModule, MatProgressBarModule],
  templateUrl: './request-dialog.component.html',
  styleUrl: './request-dialog.component.scss'
})
export class RequestDialogComponent {
  request: AccessRequestDto = new AccessRequestDto();
  decisionMapping = DecisionEnumLabelMapping;
  decisionKeys: string[] = [];
  protected readonly DecisionEnum = DecisionEnum;
  decisionCtrl: FormControl = new FormControl('');
  availableFromCtrl: FormControl = new FormControl('');
  availableUntilCtrl: FormControl = new FormControl('');
  reviewedCtrl: FormControl = new FormControl('');
  lastUpdatedCtrl: FormControl = new FormControl('');
  requestIdCtrl: FormControl = new FormControl('');
  itemsAccessCtrl: FormControl = new FormControl('');
  decisionFormGroup: FormGroup = new FormGroup<any>({});
    role: string = "";
  loading: boolean = false;
  history: AccessRequestDto[] = []
  displayedColumns: string[] = ['decision','date', 'time'];
  protected readonly DecisionEnumLabelMapping = DecisionEnumLabelMapping;
  loadingHistory: boolean = true;

  constructor(private tokenService: TokenService, private dialogRef: MatDialogRef<RequestDialogComponent>, private accessRequestService: AccessRequestService, @Inject(MAT_DIALOG_DATA) public data: {request: AccessRequestDto}, private _snackBar: MatSnackBar) {
    this.role = this.tokenService.getRoleFromToken();
    let keys = Object.keys(DecisionEnumLabelMapping);
    keys.shift()
    this.decisionKeys = keys;
    this.request = data.request;
    this.initializeForm();
    this.accessRequestService.getAccessRequestHistory(this.request.requestId).pipe(takeUntilDestroyed()).subscribe({
      next: (response) => {
        this.loadingHistory = false;
        this.history = response;
      },
      error: (err) => {
        this.loadingHistory = false;
        this._snackBar.open("Something went wrong!")
        console.log(err);
      }
    })
  }

  private initializeForm() {
    this.decisionCtrl = new FormControl<any>(this.request.decision);
    this.availableFromCtrl = new FormControl<any>('');
    this.availableUntilCtrl = new FormControl<any>('');
    this.reviewedCtrl = new FormControl<any>(this.request.requestId);
    this.lastUpdatedCtrl = new FormControl<any>(this.request.lastUpdated);
    this.requestIdCtrl = new FormControl<any>(this.request.requestId);
    this.itemsAccessCtrl = new FormControl<any>([]);
    this.decisionFormGroup = new FormGroup<any>({
      'decision': this.decisionCtrl,
      'availableFrom': this.availableFromCtrl,
      'availableUntil': this.availableUntilCtrl,
      'reviewed': this.reviewedCtrl,
      'lastUpdated': this.lastUpdatedCtrl,
      'requestId': this.requestIdCtrl,
      'itemsAccess': this.itemsAccessCtrl
    })
  }

  onSave() {
    this.loading = true;
    this.decisionFormGroup.disable();
    this.accessRequestService.reviewAccessRequest(this.decisionFormGroup.value).subscribe({
      next: (response)=>{
        this.loading = false;
        this.request.decision = this.decisionCtrl.value;
        this.request.lastUpdated = new Date();
        this.dialogRef.close();
        this._snackBar.open("You have reviewed access request")
      },
      error: (error)=>{
        this.decisionFormGroup.enable();
        this.loading = false;
        console.log(error)
          this._snackBar.open("Something went wrong!")
      }
    })
  }

  protected readonly AccessRequestDto = AccessRequestDto;

  onResend() {
    this.loading = true;
    this.decisionFormGroup.disable();
    this.accessRequestService.sendAccessRequest(this.request.patientId).subscribe({
      next: (response)=>{
        this.loading = false;
        this.request.decision = DecisionEnum.UNDEFINED;
        this.request.lastUpdated = new Date();
        this.dialogRef.close();
        this._snackBar.open("You have successfully sent access request")
      },
      error: (error)=>{
        this.decisionFormGroup.enable();
        this.loading = false;
        console.log(error)
        this._snackBar.open("Something went wrong!")
      }
    })

  }
}
