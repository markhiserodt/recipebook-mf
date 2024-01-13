import { Route } from '@angular/router';
import { InventoryComponent } from './components/inventory/inventory.component';

export const appRoutes: Route[] = [
  { path: '', component: InventoryComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];