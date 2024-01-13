import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';

export const appRoutes: Route[] = [
  {
    path: 'inventory',
    loadChildren: () =>
      loadRemoteModule('inventory', './Routes').then((m) => m.remoteRoutes),
  },
];
