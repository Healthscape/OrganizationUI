import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanentSnackBarComponent } from './permanent-snack-bar.component';

describe('PermanentSnackBarComponent', () => {
  let component: PermanentSnackBarComponent;
  let fixture: ComponentFixture<PermanentSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermanentSnackBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermanentSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
