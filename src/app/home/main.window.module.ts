import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MainWindowRoutingModule} from "./main.window.routing.module";
import {MainWindowComponent} from "./components/main-window/main-window.component";

@NgModule({
  imports: [
    MainWindowComponent,
    CommonModule,
    MainWindowRoutingModule
  ]
})
export class MainWindowModule { }
