import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { InterceptorProviders } from './interceptors';
import { provideMsal } from './msal/msal.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    InterceptorProviders,
    provideMsal(),
  ],
  
};
