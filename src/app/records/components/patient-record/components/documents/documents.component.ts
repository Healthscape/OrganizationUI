import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
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
import { RecordsService } from '../../../../service/records.service';

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
export class DocumentsComponent implements OnChanges {
    displayedColumns: string[] = ['date', 'name', 'author', 'type', 'more'];
    documents: DocumentReferenceDto[] = [];
    startDateCtrl: FormControl = new FormControl('');
    endDateCtrl: FormControl = new FormControl('');
    @Input() encounterId: string | undefined = undefined;

    constructor(private route: ActivatedRoute, private recordsService: RecordsService) {
        const patientRecordStr = sessionStorage.getItem(this.route.snapshot.params['id']);
        if (patientRecordStr) {
            let patientRecord: PatientRecordDto = JSON.parse(patientRecordStr);
            this.documents = patientRecord.documentReferences;
        }else{
            const patientRecordStr = sessionStorage.getItem('myRecord');
            if (patientRecordStr) {
                let patientRecord: PatientRecordDto = JSON.parse(patientRecordStr);
                if(this.encounterId){
                    this.documents = patientRecord.documentReferences.filter((doc) => {
                        doc.encounterId == 'Encounter/' + this.encounterId;
                    })
                }
            }else{
                this.recordsService.getMyPatientRecord().subscribe({
                    next:(patientRecord) => {
                        sessionStorage.setItem('myRecord', JSON.stringify(patientRecord));
                        if(this.encounterId){
                            this.documents = patientRecord.documentReferences.filter((doc: { encounterId: string; }) => {
                                doc.encounterId == 'Encounter/' + this.encounterId;
                            })
                        }
                    },
                    error: (e) =>{
                        console.error(e);
                    }
                })
            }
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

    

    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.encounterId);
        const patientRecordStr = sessionStorage.getItem('myRecord') ?? sessionStorage.getItem(this.route.snapshot.params['id']);
        if (patientRecordStr) {
            let patientRecord: PatientRecordDto = JSON.parse(patientRecordStr);
            if(this.encounterId){
                this.documents = patientRecord.documentReferences.filter((doc) => doc.encounterId == 'Encounter/' + this.encounterId)
            }
        }else{
            this.recordsService.getMyPatientRecord().subscribe({
                next:(patientRecord) => {
                    sessionStorage.setItem('myRecord', JSON.stringify(patientRecord));
                    if(this.encounterId){
                        this.documents = patientRecord.documentReferences.filter((doc: { encounterId: string; }) => {
                            doc.encounterId == 'Encounter/' + this.encounterId;
                        })
                    }
                },
                error: (e) =>{
                    console.error(e);
                }
            })
        }
      }
}
