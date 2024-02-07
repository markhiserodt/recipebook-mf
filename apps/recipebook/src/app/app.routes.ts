import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { HomeComponent } from './components/home/home.component';
import { FoodComponent } from './components/food/food.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { FoodGroupComponent } from './components/food-group/food-group.component';
import { RecipeDetailComponent } from './components/recipe/recipe-detail/recipe-detail.component';
import { RecipeDetailResolver } from './resolvers/recipe.resolver';
import { FoodResolver } from './resolvers/food.resolver';
import { inventoryGuardFn } from './guards/inventory.guard';
import { FormComponent } from './components/form/form.component';
import { HomeInsuranceFormComponent } from './components/form/home-insurance-form/home-insurance-form.component';
import { AutoInsuranceFormComponent } from './components/form/auto-insurance-form/auto-insurance-form.component';
import { HealthInsuranceFormComponent } from './components/form/health-insurance-form/health-insurance-form.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'foods', component: FoodComponent, resolve: { foods: FoodResolver } },
  { path: 'foodGroups', component: FoodGroupComponent },
  { path: 'recipes', component: RecipeComponent },
  {
    path: 'recipes/:id', component: RecipeDetailComponent, resolve: { recipe: RecipeDetailResolver },
  },
  { path: 'inventory', loadChildren: () => loadRemoteModule('inventory', './Routes').then((m) => m.appRoutes), canActivate: [inventoryGuardFn]},
  { path: 'account', loadChildren: () => loadRemoteModule('account', './Routes').then((m) => m.appRoutes)},
  { path: 'forms', component: FormComponent, 
    children: [
      { path: 'home', component: HomeInsuranceFormComponent },
      { path: 'auto', component: AutoInsuranceFormComponent },
      { path: 'health', component: HealthInsuranceFormComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
