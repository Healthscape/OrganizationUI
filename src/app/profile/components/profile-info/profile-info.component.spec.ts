import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileInfoComponent} from './profile-info.component';

describe('ProfileSettingsComponent', () => {
    let component: ProfileInfoComponent;
    let fixture: ComponentFixture<ProfileInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileInfoComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProfileInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
