import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecordPreviewDialogComponent} from './record-preview-dialog.component';

describe('RecordOverviewComponent', () => {
    let component: RecordPreviewDialogComponent;
    let fixture: ComponentFixture<RecordPreviewDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecordPreviewDialogComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RecordPreviewDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
