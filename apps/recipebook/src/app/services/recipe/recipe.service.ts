import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { RecipeRequest } from '../../models/recipe-request.model';
import { Observable, take } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);

  readonly recipes = signal<Recipe[]>([]);

  constructor() {
    this.getRecipes();
  }

  addRecipe(recipeRequest: RecipeRequest): Observable<Recipe> {
    return this.http.post<Recipe>(`${environment.apiUrl + 'api/recipe'}`, recipeRequest);
  }

  getRecipes(): void {
    if (this.recipes().length > 0) return;
    this.http.get<Recipe[]>(`${environment.apiUrl + 'api/recipe'}`).pipe(take(1)).subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes.set(recipes);
      }
    });
  }

  updateRecipe(recipeRequest: RecipeRequest): Observable<Recipe> {
    return this.http.put<Recipe>(`${environment.apiUrl + 'api/recipe'}`, recipeRequest);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl + 'api/recipe/' + id}`);
  }
}
