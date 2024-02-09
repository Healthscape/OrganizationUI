import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-main-window',
  host:{
    class: 'main-window-host-wrapper'
  },
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.scss'
})
export class MainWindowComponent {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  readonly home = {icon: 'pi pi-home', url: 'home'};
  menuItems: any;
  subscription: Subscription | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.menuItems = this.createBreadcrumbs(this.activatedRoute.root)
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.menuItems = this.createBreadcrumbs(this.activatedRoute.root));
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
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
        breadcrumbs.push({label, url});
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }

  navigate(path: string) {
    this.router.navigate([path]).then()
  }
}
