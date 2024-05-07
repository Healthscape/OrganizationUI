import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAllergiesDialogComponent } from './manage-allergies-dialog.component';

describe('ManageAllergiesDialogComponent', () => {
  let component: ManageAllergiesDialogComponent;
  let fixture: ComponentFixture<ManageAllergiesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAllergiesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAllergiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
