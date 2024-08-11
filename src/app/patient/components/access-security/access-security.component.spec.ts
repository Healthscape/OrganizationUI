import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessSecurityComponent } from './access-security.component';

describe('AccessSecurityComponent', () => {
  let component: AccessSecurityComponent;
  let fixture: ComponentFixture<AccessSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessSecurityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
