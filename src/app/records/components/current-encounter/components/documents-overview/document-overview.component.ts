import {Component, Inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {DocumentReferenceDto} from "../../../../dto/document.reference.dto";
import {ActivatedRoute} from "@angular/router";
import {PatientRecordUpdateDto} from "../../../../dto/patientRecordUpdate.dto";

@Component({
    selector: 'app-documents-overview',
    standalone: true,
    host: {
        class: 'documents-overview-host-wrapper'
    },
    imports: [CommonModule, MatButtonModule],
    templateUrl: './document-overview.component.html',
    styleUrl: './document-overview.component.scss'
})
export class DocumentOverviewComponent {
    @Input() disabled!: boolean;
    documents: DocumentReferenceDto[] = []
    files: File[] = [];
    id: string = "";

    constructor(private route: ActivatedRoute) {
        this.id = this.route.snapshot.params['id'];
    }

    onOpen(document: DocumentReferenceDto) {
        const newTab = window.open();

        newTab?.document.write(
            `<!DOCTYPE html><head><title>Document preview</title></head><body style="margin: 0px; height: 100%; background-color: rgb(14, 14, 14);"><img src="${document.data}" style="display: block; -webkit-user-select: none; margin: auto; background-color: hsl(0, 0%, 90%); transition: background-color 300ms;" ></body></html>`);

        newTab?.document.close();
    }

    onDelete(document: DocumentReferenceDto) {
        let index = this.documents.indexOf(document);
        if (index != -1) {
            this.documents.splice(index, 1);
        }

    }

    onAdd(fileInput: HTMLInputElement) {
        fileInput.value = "";
        fileInput.click()
    }

    onAddInput(event: Event) {
        const target = event.target as HTMLInputElement;
        const files = target?.files as FileList;

        if (files.length === 0)
            return;

        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        for (let i = 0; i < files.length; i++) {
            let item = files.item(i);
            if(item) {
                const reader = new FileReader();
                reader.onload = () => {
                    let document = new DocumentReferenceDto();
                    document.data = reader.result as string;
                    document.title = item!.name;
                    document.contentType = item!.type;
                    this.documents.push(document);
                    this.setUpdated();

                };
                reader.readAsDataURL(item);
            }
        }
    }

    private setUpdated() {
        let patientRecordUpdateStr = sessionStorage.getItem('updated')
        if (patientRecordUpdateStr) {
            let updated: PatientRecordUpdateDto = JSON.parse(patientRecordUpdateStr);
            updated.documents = this.documents;
            sessionStorage.setItem('updated', JSON.stringify(updated));
        }
    }
}
