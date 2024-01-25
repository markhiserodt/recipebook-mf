import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AccountInfo } from '@azure/msal-browser';
import { FeatureService, UserService } from '@recipebook-mf/services';
import { Features } from '../../enumerations/feature.enum';

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
  private featureService = inject(FeatureService);
  private changeDetectorRef = inject(ChangeDetectorRef);

  private account$ = this.userService.account$.asReadonly();
  get account(): AccountInfo | null { return this.account$(); }

  private feature$ = this.featureService.features$.asReadonly();
  get feature() { return this.feature$(); }

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

  isInventoryFeatureEnabled(): boolean {
    const feature = this.feature.find(feature => feature.name?.toLowerCase() === Features.Inventory.toLowerCase());
    return feature?.flag ?? false;
  }

}
