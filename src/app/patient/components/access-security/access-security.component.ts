import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AccessLogEntryDto } from '../../dtos/AccessLogEntryDto';
import { MonitoringService } from '../../service/monitoring.service';

@Component({
  selector: 'app-access-security',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTooltipModule, MatTableModule, MatButtonModule],
  host:{
    class: 'access-security-host-wrapper'
  },
  styles:['::ng-deep .access-security-host-wrapper {overflow: auto}'],
  templateUrl: './access-security.component.html',
  styleUrl: './access-security.component.scss'
})
export class AccessSecurityComponent {
  @Input() accessLogs: AccessLogEntryDto[] = []
  @ViewChild(MatTable) table?: MatTable<AccessLogEntryDto>;
  displayedColumns: string[] = ['org', 'role', 'name', 'action', 'timestamp'];

}
