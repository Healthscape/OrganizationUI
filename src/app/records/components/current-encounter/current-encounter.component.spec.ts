import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CurrentEncounterComponent} from './current-encounter.component';

describe('CurrentEncounterComponent', () => {
    let component: CurrentEncounterComponent;
    let fixture: ComponentFixture<CurrentEncounterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CurrentEncounterComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CurrentEncounterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
