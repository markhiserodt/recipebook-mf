import { Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MsalGuard } from '@azure/msal-angular';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [MsalGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];