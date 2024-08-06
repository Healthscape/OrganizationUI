import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {TextFieldModule} from "@angular/cdk/text-field";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-clinical-impression',
    standalone: true,
    host: {
        class: 'clinical-impression-host-wrapper'
    },
    imports: [CommonModule, MatFormFieldModule, MatInputModule, TextFieldModule, ReactiveFormsModule],
    templateUrl: './clinical-impression.component.html',
    styleUrl: './clinical-impression.component.scss'
})
export class ClinicalImpressionComponent implements OnInit, OnChanges, OnDestroy{
    @Input() disabled!: boolean;
    form!: FormGroup;
    descriptionCtrl!: FormControl;
    summaryCtrl!: FormControl;
    subscriptions: Subscription[] = [];


    constructor(
        private route: ActivatedRoute
      ) {
    
      }

    ngOnInit() {
        this.initializeForm();
        if(this.disabled){
            this.form.disable();
        }
        
        let patientRecordUpdated = sessionStorage.getItem('updated');
        if(patientRecordUpdated){
            let patientRecord = JSON.parse(patientRecordUpdated);
            this.descriptionCtrl.setValue(patientRecord.clinicalImpressionDescription);
            this.summaryCtrl.setValue(patientRecord.clinicalImpressionSummary);
        }

        this.subscriptions.push(this.form.valueChanges.subscribe(() => {
            let patientRecordUpdated = sessionStorage.getItem('updated');
            if(patientRecordUpdated){
                let patientRecord = JSON.parse(patientRecordUpdated);
                patientRecord.clinicalImpressionDescription = this.descriptionCtrl.value;
                patientRecord.clinicalImpressionSummary = this.summaryCtrl.value;
                sessionStorage.setItem('updated', JSON.stringify(patientRecord));
            }
        }));
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log("da");
        if(this.form){
            if(!this.disabled){
                this.form.reset();
                this.form.enable();
            }else{
                this.form.disable();
            }
        }
    }

    private initializeForm() {
        this.descriptionCtrl = new FormControl<any>('');
        this.summaryCtrl = new FormControl<any>('');
        this.form = new FormGroup<any>({
            'description': this.descriptionCtrl,
            'summary': this.summaryCtrl
        })
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }
}
