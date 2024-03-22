import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AllergiesOverviewComponent} from './allergies-overview.component';

describe('AllergiesComponent', () => {
    let component: AllergiesOverviewComponent;
    let fixture: ComponentFixture<AllergiesOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AllergiesOverviewComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AllergiesOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
