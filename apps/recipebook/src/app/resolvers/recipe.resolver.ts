import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot } from "@angular/router";
import { map } from "rxjs";
import { Recipe } from "../models/recipe.model";
import { RecipeService } from "../services/recipe/recipe.service";

// export const RecipeResolver: ResolveFn<Recipe[]> = () => {
//   return inject(RecipeService).getRecipes().pipe(map((recipes: Recipe[]) => {
//     return recipes;
//   }));
// };

export const RecipeDetailResolver: ResolveFn<Recipe> = (route: ActivatedRouteSnapshot) => {
  return inject(RecipeService).getRecipe(+route.paramMap.get('id')!).pipe(map((recipe: Recipe) => {
    return recipe;
  }));
};