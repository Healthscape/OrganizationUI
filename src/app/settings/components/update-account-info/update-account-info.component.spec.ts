import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateAccountInfoComponent} from './update-account-info.component';

describe('UpdateAccountInfoComponent', () => {
    let component: UpdateAccountInfoComponent;
    let fixture: ComponentFixture<UpdateAccountInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UpdateAccountInfoComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UpdateAccountInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
