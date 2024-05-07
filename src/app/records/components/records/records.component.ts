import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AccessRequestDto} from "../../../access-requests/dtos/access.request.dto";
import {TokenService} from "../../../auth/services/token.service";
import {RecordsService} from "../../service/records.service";
import {AccessRequestService} from "../../../access-requests/service/access.request.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-records',
    host: {
        class: 'records-host-wrapper'
    },
    templateUrl: './records.component.html',
    styleUrl: './records.component.scss'
})
export class RecordsComponent {
    requests: AccessRequestDto[] = [];
    dataSource = new MatTableDataSource(this.requests);
    loading: boolean = true;
    displayedColumns: string[] = ['avatar', 'name', 'more'];

    constructor(private router: Router, private route: ActivatedRoute, _tokenService: TokenService, public accessRequestService: AccessRequestService, public recordsService: RecordsService) {
        this.accessRequestService.getAllAvailableRequests().subscribe((response) => {
            this.requests = response;
            this.dataSource.data = this.requests
            this.loading = false;
        })

    }


    onViewRecord(requestId: string) {
        this.recordsService.getPatientRecord(requestId).subscribe((response) => {
            const id = crypto.randomUUID();
            sessionStorage.setItem(id, JSON.stringify(response));
            sessionStorage.setItem("request", requestId);
            this.router.navigate(['./' + id], {relativeTo: this.route}).then();

        })
    }
}
