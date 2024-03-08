import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordOverviewDialogComponent } from './record-overview-dialog.component';

describe('RecordOverviewComponent', () => {
  let component: RecordOverviewDialogComponent;
  let fixture: ComponentFixture<RecordOverviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordOverviewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
