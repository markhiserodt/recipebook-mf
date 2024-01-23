import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { RecipeRequest } from '../../models/recipe-request.model';
import { Observable, take } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { environment } from '../../../environments/environment';
import { RecipeCommentRequest } from '../../models/recipe-comment-request.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);

  readonly recipes = signal<Recipe[]>([]);

  constructor() {
    this.getRecipes();
  }
  
  // addComment(recipeComment: RecipeCommentRequest): Observable<void> {
  //   return this.http.post<void>(`${environment.apiUrl + 'api/recipe/comment'}`, recipeComment);
  // }

  addComment(recipeComment: RecipeCommentRequest): Observable<void> {
    return this.http.post<void>(`https://pkc-6vz38.westus2.azure.confluent.cloud/kafka/v3/clusters/lkc-z6qmdz/topics/recipe_comments/records`, recipeComment);
  }

  addRecipe(recipeRequest: RecipeRequest): Observable<Recipe> {
    return this.http.post<Recipe>(`${environment.apiUrl + 'api/recipe'}`, recipeRequest);
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${environment.apiUrl + 'api/recipe/' + id}`);
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
