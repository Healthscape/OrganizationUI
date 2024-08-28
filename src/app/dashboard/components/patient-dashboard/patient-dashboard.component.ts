import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessSecurityComponent } from "../../../patient/components/access-security/access-security.component";
import { MatIcon } from '@angular/material/icon';
import { AccessLogEntryDto } from '../../../patient/dtos/AccessLogEntryDto';
import { MonitoringService } from '../../../patient/service/monitoring.service';
import { SubjectService } from '../../../utils/services/subject.service';
import { SecurityCheckDto } from '../../../utils/dto/security-check.dto';
import { ActivatedRoute } from '@angular/router';
import { PatientRecordDto } from '../../../records/dto/patientRecord.dto';
import { RecordsService } from '../../../records/service/records.service';

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
  encounterCount: number = 0;
  accessLogs: AccessLogEntryDto[] = []
  timeWhenSecurityChecked: Date | undefined = new Date();
  securityStatus: boolean | undefined = true;

  constructor(private route: ActivatedRoute,private monitoringService: MonitoringService, private subjectService:SubjectService, private recordsService: RecordsService) {
    this.retreivePatientRecord();
    let logs = sessionStorage.getItem('logs');
    if(logs){
      this.accessLogs = JSON.parse(logs);
    }
    
      this.monitoringService.getAccessLogs().subscribe({
          next: (accessLogs) => {
            this.timeWhenSecurityChecked = subjectService.securityCheck.date;
            this.securityStatus = subjectService.securityCheck.status;
              this.accessLogs = accessLogs;
              sessionStorage.setItem('logs', JSON.stringify(accessLogs));
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
            this.securityStatus = securityStatus;
            subjectService.securityCheck = new SecurityCheckDto(this.timeWhenSecurityChecked, securityStatus);
          },
          error: (err) => {
              console.log(err)
          }
        })
  }

  retreivePatientRecord(){
        const patientRecordStr = sessionStorage.getItem('myRecord');
        if (patientRecordStr) {
            let patientRecord: PatientRecordDto = JSON.parse(patientRecordStr);
            this.encounterCount = patientRecord.encounters.length;
        }else{
            this.recordsService.getMyPatientRecord().subscribe({
                next:(patientRecord) => {
                    sessionStorage.setItem('myRecord', JSON.stringify(patientRecord));
                    this.encounterCount = patientRecord.encounters.length;
                },
                error: (e) =>{
                    console.error(e);
                }
            })
        }
  }


}
