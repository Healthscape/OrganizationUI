import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {AccessRequestDto} from "../../../access-requests/dtos/access.request.dto";
import {TokenService} from "../../../auth/services/token.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {RecordsService} from "../../service/records.service";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-records',
  standalone: true,
  host:{
    class: 'records-host-wrapper'
  },
  imports: [CommonModule, MatButtonModule, MatProgressBarModule, MatTableModule, MatCardModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss'
})
export class RecordsComponent {
  requests: AccessRequestDto[] = [];
  dataSource = new MatTableDataSource(this.requests);
  loading: boolean = true;
  displayedColumns: string[] = ['avatar', 'name', 'more'];

  constructor(_tokenService: TokenService, public recordsService: RecordsService) {
    this.recordsService.getAllAvailablePatientRecords().pipe(takeUntilDestroyed()).subscribe((response) => {
      this.requests = response;
      this.dataSource.data = this.requests
      this.loading = false;
    })
  }


  onViewRecord(patientId: string) {
    this.recordsService.getPatientRecord(patientId).pipe(takeUntilDestroyed()).subscribe((response) => {
      console.log(response)
    })
  }
}
