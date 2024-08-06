import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SubjectService } from '../../../../../utils/services/subject.service';

@Component({
    selector: 'app-patient-record-toolbar',
    standalone: true,
    host: {
        class: "patient-record-toolbar-host-wrapper"
    },
    imports: [CommonModule],
    templateUrl: './patient-record-toolbar.component.html',
    styleUrl: './patient-record-toolbar.component.scss'
})
export class PatientRecordToolbarComponent {
    @Input() encounterStarted: boolean = false;
    @Output() tabChanged: EventEmitter<string> = new EventEmitter<string>();
    selected = "overview";

    onTabChange(tabName: string) {
        this.selected = tabName;
        this.tabChanged.emit(tabName);
    }
}
