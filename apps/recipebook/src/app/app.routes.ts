import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { HomeComponent } from './components/home/home.component';
import { FoodComponent } from './components/food/food.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { FoodGroupComponent } from './components/food-group/food-group.component';
import { RecipeDetailComponent } from './components/recipe/recipe-detail/recipe-detail.component';
import { RecipeDetailResolver } from './resolvers/recipe.resolver';
import { FoodResolver } from './resolvers/food.resolver';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'foods', component: FoodComponent, resolve: { foods: FoodResolver } },
  { path: 'foodGroups', component: FoodGroupComponent },
  { path: 'recipes', component: RecipeComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent, resolve: { recipe: RecipeDetailResolver } },
  {
    path: 'inventory',
    loadChildren: () =>
      loadRemoteModule('inventory', './Routes').then((m) => m.appRoutes),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
