import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {filter, Subscription} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {UserService} from "../../../auth/services/user.service";
import {UserDto} from "../../../auth/dto/user.dto";
import {NewDoctorComponent} from "../../../users/components/new-doctor/new-doctor.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-main-window',
  host: {
    class: 'main-window-host-wrapper'
  },
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule],
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.scss'
})
export class MainWindowComponent {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  readonly home = {icon: 'pi pi-home', url: 'home'};
  menuItems: { label: string, url: string }[] = [];
  subscription: Subscription | undefined;
  me = new UserDto();

  constructor(public router: Router, private userService: UserService, private activatedRoute: ActivatedRoute, public dialog: MatDialog) {
    userService.me().subscribe({
      next: (user) => {
        this.me = user;
      }
    })
  }

  ngOnInit(): void {
    this.menuItems = this.createBreadcrumbs(this.activatedRoute.root)
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menuItems = this.createBreadcrumbs(this.activatedRoute.root)
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  checkIfExists(label: string, url: string) {
    for (const obj of this.menuItems) {
      if (obj.label == label && obj.url == url) {
        return true;
      }
    }
    return false;
  }

  navigate(path: string) {
    this.router.navigate([path]).then()
  }

  onNewDoctor() {
    const dialogRef = this.dialog.open(NewDoctorComponent);

    dialogRef.afterClosed().subscribe();
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: any = []): any {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[MainWindowComponent.ROUTE_DATA_BREADCRUMB];
      if (label != undefined && label != null) {
        // if(!this.checkIfExists(label, url)) {
        breadcrumbs.push({label, url});
        // }
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
