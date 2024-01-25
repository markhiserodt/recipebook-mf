import { Route } from '@angular/router';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { HomeComponent } from './components/home/home.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent,
    children: [
      { path: 'items', component: InventoryComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: '**', redirectTo: 'items', pathMatch: 'full' },
    ]
  }
];