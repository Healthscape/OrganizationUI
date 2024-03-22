import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestDialogComponent} from "../request-dialog/request-dialog.component";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";
import {AccessRequestDto} from "../../dtos/access.request.dto";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatListModule} from "@angular/material/list";
import {DecisionEnum} from "../../enums/decision.enum";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AccessRequestService} from "../../service/access.request.service";
import {TokenService} from "../../../auth/services/token.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-requests-overview',
    host: {
        class: 'requests-overview-host-wrapper'
    },
    standalone: true,
    imports: [CommonModule, RequestDialogComponent, MatTableModule, MatTooltipModule, MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatProgressBarModule],
    templateUrl: './requests-overview.component.html',
    animations: [
        trigger('detailExpand', [
            state('collapsed,void', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    styleUrl: './requests-overview.component.scss'
})
export class RequestsOverviewComponent {
    showing: string = "recent"
    requests: AccessRequestDto[] = [];
    dataSource = new MatTableDataSource(this.requests);
    date = new Date();
    displayedColumnsPractitioner: string[] = ['decision', 'date', 'patient', 'more'];
    displayedColumnsPatient: string[] = ['decision', 'date', 'practitioner', 'specialty', 'more'];
    role: string = "";
    loading = true;
    protected readonly DecisionEnum = DecisionEnum;

    constructor(_tokenService: TokenService, public accessRequestService: AccessRequestService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
        this.accessRequestService.newAccessRequest.pipe(takeUntilDestroyed()).subscribe((response) => {
            this.requests.push(response);
            this.dataSource.data = this.requests
        })

        this.role = _tokenService.getRoleFromToken();

        this.setShowing(this.router.url)
        this.onStatClick(this.showing)
        this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.setShowing(event.url);
                this.onStatClick(this.showing);
            }
        })
    }

    openDialog(selectedReq: AccessRequestDto): void {
        this.dialog.open(RequestDialogComponent, {
            minWidth: "40vw",
            maxHeight: "85vw",
            data: {
                request: selectedReq
            }
        });
    }

    onStatClick(requestType: string) {
        if (requestType != "recent") {
            this.router.navigate([requestType], {relativeTo: this.route}).then()
        }
        switch (requestType) {
            case "pending":
                this.loading = true;
                this.dataSource.data = [];
                this.accessRequestService.getAccessRequestsByStatus("UNDEFINED").subscribe({
                    next: (response) => {
                        this.loading = false;
                        this.dataSource.data = response
                    },
                    error: (err) => {
                        console.log(err)
                        this.loading = false;
                    }
                })
                break;
            case "unlimited":
                this.loading = true;
                this.dataSource.data = [];
                this.accessRequestService.getAccessRequestsByStatus("UNLIMITED").subscribe({
                    next: (response) => {
                        this.loading = false;
                        this.dataSource.data = response
                    },
                    error: (err) => {
                        this.loading = false;
                        console.log(err)
                    }
                })
                break;
            case "one-time":
                this.loading = true;
                this.dataSource.data = [];
                this.accessRequestService.getAccessRequestsByStatus("ONE_TIME").subscribe({
                    next: (response) => {
                        this.loading = false;
                        this.dataSource.data = response
                    },
                    error: (err) => {
                        this.loading = false;
                        console.log(err)
                    }
                })
                break;
            case "denied":
                this.loading = true;
                this.dataSource.data = [];
                this.accessRequestService.getAccessRequestsByStatus("NO_ACCESS").subscribe({
                    next: (response) => {
                        this.loading = false;
                        this.dataSource.data = response
                    },
                    error: (err) => {
                        this.loading = false;
                        console.log(err)
                    }
                })
                break;
            case "recent":
                this.loading = true;
                this.dataSource.data = [];
                this.accessRequestService.getAccessRequests().subscribe({
                    next: (response) => {
                        this.loading = false;
                        this.dataSource.data = response
                    },
                    error: (err) => {
                        this.loading = false;
                        console.log(err)
                    }
                })
                break;
        }
    }

    private setShowing(url: string) {
        if (url === "/home/requests/pending") {
            this.showing = "pending";
        } else if (url === "/home/requests/approved") {
            this.showing = "approved";
        } else if (url === "/home/requests/denied") {
            this.showing = "denied";
        } else if (url === "/home/requests") {
            this.showing = "recent";
        }
    }

}
