import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRecordToolbarComponent } from './patient-record-toolbar.component';

describe('PatientRecordToolbarComponent', () => {
  let component: PatientRecordToolbarComponent;
  let fixture: ComponentFixture<PatientRecordToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientRecordToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientRecordToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
