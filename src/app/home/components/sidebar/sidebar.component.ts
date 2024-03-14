import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoComponent} from "../../../utils/logo/logo.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MainWindowComponent} from "../main-window/main-window.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UserDto} from "../../../auth/dto/user.dto";
import {UserService} from "../../../auth/services/user.service";
import {AuthService} from "../../../auth/services/auth.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SubjectService} from "../../../utils/events/subject.service";

@Component({
  selector: 'app-sidebar',
  host: {
    class: 'sidebar-host-wrapper'
  },
  standalone: true,
  imports: [CommonModule, LogoComponent, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MainWindowComponent, ToolbarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output('toggleMenuEvent') toggleMenuEvent: EventEmitter<boolean> = new EventEmitter();
  isMobile = true;
  isCollapsed = false;
  selected = 'dashboard';
  me: UserDto = new UserDto();

  constructor(private authService: AuthService, userService: UserService, private router: Router, private route: ActivatedRoute, private subjectService: SubjectService) {
    userService.me().pipe(takeUntilDestroyed()).subscribe({
      next: (user) => {
        this.me = user;
      }
    })
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let currentlySelected = this.route.snapshot.children?.at(0)?.routeConfig?.path;
        if (currentlySelected) {
          this.selected = currentlySelected
          if(currentlySelected == 'record-overview'){
            this.isCollapsed = true;
          }
        } else {
          this.selected = 'home'
        }
      }
    });
    this.subjectService.collapseSidebar.pipe(takeUntilDestroyed()).subscribe(() =>{
      this.isCollapsed = true;
      this.toggleMenuEvent.emit(this.isCollapsed);
    })
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed
    this.toggleMenuEvent.emit(this.isCollapsed);
  }

  select(cardName: string) {
    this.selected = cardName;
    if (cardName != 'home') {
      this.router.navigate(['home', cardName]).then();
    } else {
      this.router.navigate(['home']).then();
    }
  }

  logout() {
    this.authService.logout();
  }
}
