import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {MainWindowComponent} from "../main-window/main-window.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-auth',
  host: {
    class: 'home-host-wrapper'
  },
  standalone: true,
  imports: [CommonModule, ToolbarComponent, MainWindowComponent, SidebarComponent, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isCollapsed: boolean = false;

  toggleMenu(event: boolean) {
    this.isCollapsed = event;
  }

  getStyles() {
    if (this.isCollapsed) {
      return {
        'grid-template-columns': `90px auto`,
      };
    } else {
      return {
        'grid-template-columns': `250px auto`,
      };
    }
  }
}
