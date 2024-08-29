import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { TokenService } from '../../../auth/services/token.service';
import { PatientDashboardComponent } from '../patient-dashboard/patient-dashboard.component';
import { PractitonerDashboardComponent } from '../practitoner-dashboard/practitoner-dashboard.component';
import { PatientsComponent } from '../../../patients/components/patients/patients.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: '<ng-template #dynamicComponent></ng-template>',
  host: {
      class: 'dashboard-host-wrapper'
  },
  styles: ['::ng-deep .dashboard-host-wrapper {overflow: auto}']
})
export class DashboardComponent implements OnInit {
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true })
  dynamicComponent!: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    const role = this.tokenService.getRoleFromToken(); 
    let component: any;

    if (role === 'ROLE_PRACTITIONER') {
      this.router.navigate(['home', 'patients'])
    } else if (role === 'ROLE_PATIENT') {
      component = PatientDashboardComponent;
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.dynamicComponent.clear();
    this.dynamicComponent.createComponent(componentFactory);
  }
}
