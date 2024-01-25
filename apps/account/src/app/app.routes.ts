import { Route } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { MsalGuard } from '@azure/msal-angular';
import { FeaturesComponent } from './components/features/features.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, canActivate: [MsalGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'features', component: FeaturesComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ]
  }
];