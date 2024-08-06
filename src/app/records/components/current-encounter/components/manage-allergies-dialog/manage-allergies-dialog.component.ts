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
    AllergiesOverviewComponent
} from "../../../record-overview/components/allergies-overview/allergies-overview.component";
import {ActivatedRoute} from "@angular/router";
import {SubjectService} from "../../../../../utils/services/subject.service";
import {AllergyDto, AllergyCriticality, AllergyCategory, AllergyCategories, AllergyCriticalities} from "../../../../dto/allergy.dto";
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-manage-allergies-dialog',
  standalone: true,
  imports: [CommonModule, CdkTextareaAutosize, FormsModule, MatButton, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatFormField, MatInput, MatLabel, MatTab, MatTabGroup, AllergiesOverviewComponent, ReactiveFormsModule, MatSelect, MatOption],
  templateUrl: './manage-allergies-dialog.component.html',
  styleUrl: './manage-allergies-dialog.component.scss'
})
export class ManageAllergiesDialogComponent {
  allergies: AllergyDto[] = []
  loadingHistory: boolean = true;
  id: string = '';
  allergyCtrl!: FormControl;
  form!: FormGroup;
  categoryCtrl!: FormControl;
  criticalityCtrl!: FormControl;
  categories: AllergyCategory[] = AllergyCategories;
  criticalities: AllergyCriticality[] = AllergyCriticalities;

  constructor(private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: { id: string }, private subjectService:SubjectService) {
    let id = this.route.snapshot.params['id'];
    if (!id) {
      id = data.id;
    }
    this.id = id;

    this.initForm();
  }

  initForm(){
    this.allergyCtrl = new FormControl<any>('');
    this.categoryCtrl = new FormControl<any>('');
    this.criticalityCtrl = new FormControl<any>('');
    this.form = new FormGroup<any>({
      'code': this.allergyCtrl,
      'category': this.categoryCtrl,
      'criticality': this.criticalityCtrl
    })
  }
  onAdd() {
    if(this.form.valid) {
      let allergyDto = new AllergyDto(this.allergyCtrl.value, this.categoryCtrl.value, this.criticalityCtrl.value);
      this.subjectService.newAllergy.next(allergyDto)
      this.initForm();
    }
  }
}