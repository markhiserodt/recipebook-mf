import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Observable } from 'rxjs';
import { MsalModule } from '@azure/msal-angular';

@Component({
  selector: 'rb-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, MsalModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private router = inject(Router);
  
  private excludedRoutes: string[] = ['inventory'];
  protected timers: number[] = [];

  loading: boolean = false;
  routeUrl: string = '';

  ngOnInit(): void {
    (this.router.events as unknown as Observable<NavigationStart | NavigationEnd>).subscribe((event: NavigationStart | NavigationEnd) => {
      if (event instanceof NavigationStart) {
        this.timers.push(setTimeout(() => {
          this.loading = true;
        }, 300) as unknown as number);
      }
      if (event instanceof NavigationEnd) {
        this.clearTimers();
        this.loading = false;
        this.routeUrl = event.urlAfterRedirects;
      }
    });
  }

  protected clearTimers(): void {
    this.timers.forEach((timer: number) => {
      clearInterval(timer);
    });
    this.timers = [];
  }

  protected excludedRoute(): boolean {
    let isExcludedRoute: boolean = false;
    this.excludedRoutes.forEach(excludedRoute => {
      if (this.routeUrl.indexOf(excludedRoute) > 0) {
        isExcludedRoute = true;
      }
    });
    return isExcludedRoute;
  }
}
