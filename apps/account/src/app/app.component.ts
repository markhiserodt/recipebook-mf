import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { RouterOutlet, Router, NavigationEnd } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'account-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  route = '';

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.route = event.urlAfterRedirects;
      }
    });
  }
}
