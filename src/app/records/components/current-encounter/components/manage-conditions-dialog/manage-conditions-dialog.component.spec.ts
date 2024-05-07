import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConditionsDialogComponent } from './manage-conditions-dialog.component';

describe('ManageConditionsDialogComponent', () => {
  let component: ManageConditionsDialogComponent;
  let fixture: ComponentFixture<ManageConditionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageConditionsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageConditionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
