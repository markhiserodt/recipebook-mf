import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { HomeComponent } from './components/home/home.component';
import { FoodComponent } from './components/food/food.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { FoodGroupComponent } from './components/food-group/food-group.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'foods', component: FoodComponent },
  { path: 'foodGroups', component: FoodGroupComponent },
  { path: 'recipes', component: RecipeComponent },
  {
    path: 'inventory',
    loadChildren: () =>
      loadRemoteModule('inventory', './Routes').then((m) => m.appRoutes),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
