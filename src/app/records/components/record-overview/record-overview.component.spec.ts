import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecordOverviewComponent} from './record-overview.component';

describe('RecordOverviewComponent', () => {
    let component: RecordOverviewComponent;
    let fixture: ComponentFixture<RecordOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecordOverviewComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RecordOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
