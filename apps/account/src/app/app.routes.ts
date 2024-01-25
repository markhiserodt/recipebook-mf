import { Route } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { MsalGuard } from '@azure/msal-angular';
import { FeaturesComponent } from './components/features/features.component';
import { adminGuardFn } from './guards/admin.guard';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, canActivate: [MsalGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'features', component: FeaturesComponent, canActivate: [adminGuardFn] },
      { path: '**', redirectTo: 'profile', pathMatch: 'full' },
    ]
  }
];