import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsOverviewComponent } from './conditions-overview.component';

describe('ConditionsComponent', () => {
  let component: ConditionsOverviewComponent;
  let fixture: ComponentFixture<ConditionsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
