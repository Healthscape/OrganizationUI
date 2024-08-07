import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {
    ConditionsOverviewComponent
} from "../../../record-overview/components/conditions-overview/conditions-overview.component";
import {ActivatedRoute} from "@angular/router";
import {SubjectService} from "../../../../../utils/services/subject.service";
import {ConditionDto} from "../../../../dto/condition.dto";

@Component({
  selector: 'app-manage-conditions-dialog',
  standalone: true,
  imports: [CommonModule, CdkTextareaAutosize, FormsModule, MatButton, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatFormField, MatInput, MatLabel, MatTab, MatTabGroup, ReactiveFormsModule, ConditionsOverviewComponent],
  templateUrl: './manage-conditions-dialog.component.html',
  styleUrl: './manage-conditions-dialog.component.scss'
})
export class ManageConditionsDialogComponent {
  conditions: ConditionDto[] = []
  loadingHistory: boolean = true;
  id: string = '';
  conditionCtrl!: FormControl;
  form!: FormGroup;

  constructor(private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: { id: string }, private subjectService:SubjectService) {
    let id = this.route.snapshot.params['id'];
    if (!id) {
      id = data.id;
    }
    this.id = id;

    this.initForm();
  }

  initForm(){
    this.conditionCtrl = new FormControl<any>('')
    this.form = new FormGroup<any>({
      'code': this.conditionCtrl
    })
  }
  onAdd() {
    if(this.form.valid) {
      let conditionDto = new ConditionDto(this.conditionCtrl.value);
      this.subjectService.newCondition.next(conditionDto)
      this.initForm();
    }
  }
}