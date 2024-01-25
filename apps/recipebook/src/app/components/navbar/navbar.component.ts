import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
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

  account = this.userService.account.asReadonly();
  profile = this.userService.profile.asReadonly();
  
  route = '';

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.route = event.urlAfterRedirects;
      }
    });

    setTimeout(() => {
      this.userService.initProfile();
      this.changeDetectorRef.detectChanges();
    }, 1000)
  }

  login(): void {
    this.userService.login();
  }

}
