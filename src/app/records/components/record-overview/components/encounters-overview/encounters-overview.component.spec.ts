import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncountersOverviewComponent } from './encounters-overview.component';

describe('EncountersComponent', () => {
  let component: EncountersOverviewComponent;
  let fixture: ComponentFixture<EncountersOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncountersOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncountersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
