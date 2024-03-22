import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";

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

}
