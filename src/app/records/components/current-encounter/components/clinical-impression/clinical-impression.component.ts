import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {TextFieldModule} from "@angular/cdk/text-field";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

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
export class ClinicalImpressionComponent implements OnInit, OnChanges{
    @Input() disabled!: boolean;
    form!: FormGroup;
    descriptionCtrl!: FormControl;
    summaryCtrl!: FormControl;

    ngOnInit() {
        this.initializeForm();
        if(this.disabled){
            this.form.disable();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if(!this.disabled && this.form){
            this.form.enable();
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
}
