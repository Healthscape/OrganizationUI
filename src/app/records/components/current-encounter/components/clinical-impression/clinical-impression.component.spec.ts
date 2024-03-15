import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalImpressionComponent } from './clinical-impression.component';

describe('ClinicalImpressionComponent', () => {
  let component: ClinicalImpressionComponent;
  let fixture: ComponentFixture<ClinicalImpressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalImpressionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalImpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
