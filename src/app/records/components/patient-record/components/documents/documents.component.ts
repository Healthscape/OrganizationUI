import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {PaginatorModule} from "primeng/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {DocumentReferenceDto} from "../../../../dto/document.reference.dto";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {ActivatedRoute} from "@angular/router";
import {PatientRecordDto} from "../../../../dto/patientRecord.dto";

@Component({
    selector: 'app-documents',
    standalone: true,
    host: {
        class: 'documents-host-wrapper'
    },
    imports: [CommonModule, MatInputModule, MatDatepickerModule, PaginatorModule, MatButtonModule, MatTableModule, ReactiveFormsModule, MatIconModule, MatTooltip],
    templateUrl: './documents.component.html',
    styleUrl: './documents.component.scss'
})
export class DocumentsComponent {
    displayedColumns: string[] = ['date', 'name', 'author', 'type', 'more'];
    documents = [new DocumentReferenceDto(), new DocumentReferenceDto(), new DocumentReferenceDto(), new DocumentReferenceDto(), new DocumentReferenceDto(), new DocumentReferenceDto(), new DocumentReferenceDto()];
    startDateCtrl: FormControl = new FormControl('');
    endDateCtrl: FormControl = new FormControl('');


    constructor(private route: ActivatedRoute) {
        const patientRecordStr = sessionStorage.getItem(this.route.snapshot.params['id']);
        if (patientRecordStr) {
            let patientRecord: PatientRecordDto = JSON.parse(patientRecordStr);
            this.documents = patientRecord.documentReferences;
        }
    }

    openDocument(document: DocumentReferenceDto) {
        const newTab = window.open();
        newTab?.document.write(
            `<!DOCTYPE html><head><title>Document preview</title></head><body style="margin: 0; height: 100%; background-color: rgb(14, 14, 14);"><img src="data:image/jpeg;base64,${document.data}" style="display: block; -webkit-user-select: none; margin: auto; background-color: hsl(0, 0%, 90%); transition: background-color 300ms;"  alt="${document.title}"></body></html>`);

        newTab?.document.close();
    }

    downloadFile(documentDto: DocumentReferenceDto) {
        const downloadLink = document.createElement('a');
        const fileName = documentDto.title;

        downloadLink.href = 'data:image/jpeg;base64,' + documentDto.data;
        downloadLink.download = fileName;
        downloadLink.click();
    }
}
