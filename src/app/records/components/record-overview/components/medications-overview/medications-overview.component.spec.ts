import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationsOverviewComponent } from './medications-overview.component';

describe('MedicationsComponent', () => {
  let component: MedicationsOverviewComponent;
  let fixture: ComponentFixture<MedicationsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicationsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicationsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
