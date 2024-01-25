import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AccountInfo } from '@azure/msal-browser';
import { UserService } from '@recipebook-mf/services';

@Component({
  selector: 'rb-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private changeDetectorRef = inject(ChangeDetectorRef);

  private account$ = this.userService.account.asReadonly();
  get account(): AccountInfo | null { return this.account$(); }

  route = '';

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.route = event.urlAfterRedirects;
      }
    });

    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
    }, 0)

    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
    }, 2000)
  }

  login(): void {
    this.userService.login();
  }

}
