import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMedicationsDialogComponent } from './manage-medications-dialog.component';

describe('ManageMedicationsDialogComponent', () => {
  let component: ManageMedicationsDialogComponent;
  let fixture: ComponentFixture<ManageMedicationsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMedicationsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageMedicationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
