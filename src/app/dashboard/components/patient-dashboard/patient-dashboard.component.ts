import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessSecurityComponent } from "../../../patient/components/access-security/access-security.component";
import { MatIcon } from '@angular/material/icon';
import { AccessLogEntryDto } from '../../../patient/dtos/AccessLogEntryDto';
import { MonitoringService } from '../../../patient/service/monitoring.service';
import { SubjectService } from '../../../utils/services/subject.service';
import { SecurityCheckDto } from '../../../utils/dto/security-check.dto';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  host: {
      class: 'patient-dashboard-host-wrapper'
  },
  imports: [CommonModule, AccessSecurityComponent, MatIcon],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})
export class PatientDashboardComponent {
  viewCount: number = 0;
  editCount: number = 0;
  accessLogs: AccessLogEntryDto[] = []
  timeWhenSecurityChecked: Date | undefined = new Date();

  constructor(private monitoringService: MonitoringService, private subjectService:SubjectService) {
      this.monitoringService.getAccessLogs().subscribe({
          next: (accessLogs) => {
            this.timeWhenSecurityChecked = subjectService.securityCheck.date;
              this.accessLogs = accessLogs;
              accessLogs.forEach(log => {
                if(log.action === 'EDIT'){
                  this.editCount++;
                }else if(log.action === 'VIEW'){
                  this.viewCount++;
                }
              })
          },
          error: (err) => {
              console.log(err)
          }
      })
        this.monitoringService.getSecurityStatus().subscribe({
          next: (securityStatus) => {
            this.timeWhenSecurityChecked = new Date();
            subjectService.securityCheck = new SecurityCheckDto(this.timeWhenSecurityChecked, securityStatus);
          },
          error: (err) => {
              console.log(err)
          }
        })
  }


}
