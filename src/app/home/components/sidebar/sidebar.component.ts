import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LogoComponent} from "../../../utils/logo/logo.component";
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MainWindowComponent} from "../main-window/main-window.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";

@Component({
  selector: 'app-sidebar',
  host: {
    class:'sidebar-host-wrapper'
  },
  standalone: true,
  imports: [CommonModule, LogoComponent, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MainWindowComponent, ToolbarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output('toggleMenuEvent') toggleMenuEvent: EventEmitter<boolean>= new EventEmitter();
  isMobile= true;
  isCollapsed = true;

  constructor(private observer: BreakpointObserver) {

  }
  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  toggleMenu() {
    // if(this.isMobile){
    //   this.sidenav.toggle();
    //   this.isCollapsed = false; // On mobile, the menu can never be collapsed
    // } else {
    //   this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
    //   this.isCollapsed = !this.isCollapsed;
    // }
    this.isCollapsed = !this.isCollapsed
    this.toggleMenuEvent.emit(this.isCollapsed);
  }

}
