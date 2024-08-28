import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitonerDashboardComponent } from './practitoner-dashboard.component';

describe('PractitonerDashboardComponent', () => {
  let component: PractitonerDashboardComponent;
  let fixture: ComponentFixture<PractitonerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PractitonerDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PractitonerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
