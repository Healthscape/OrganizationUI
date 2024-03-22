import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RecordsComponent} from "./components/records/records.component";
import {MatProgressBar} from "@angular/material/progress-bar";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef,
    MatRow, MatRowDef,
    MatTable
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {MatCardAvatar} from "@angular/material/card";
import {RecordsRoutingModule} from "./records.routing.module";

@NgModule({
    imports: [
        CommonModule,
        MatProgressBar,
        MatHeaderRow,
        MatButton,
        MatRow,
        MatHeaderCell,
        MatCell,
        MatColumnDef,
        MatCardAvatar,
        MatTable,
        RecordsRoutingModule,
        MatCellDef,
        MatHeaderCellDef,
        MatHeaderRowDef,
        MatRowDef
    ],
    declarations: [RecordsComponent]
})
export class RecordsModule {
}
