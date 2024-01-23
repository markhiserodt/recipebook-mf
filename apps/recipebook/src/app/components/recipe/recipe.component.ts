import { Component, ElementRef, Signal, ViewChild, inject } from '@angular/core';
import { RecipeService } from '../../services/recipe/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { Food } from '../../models/food.model';
import { take } from 'rxjs';
import { FoodService } from '../../services/food/food.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipeRequest } from '../../models/recipe-request.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'rb-recipe',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  recipeService = inject(RecipeService);
  foodService = inject(FoodService);

  @ViewChild('closeEditRecipeModalButton') closeEditRecipeModalButton?: ElementRef;

  recipes: Signal<Recipe[]> = this.recipeService.recipes.asReadonly();
  foods: Signal<Food[]> = this.foodService.foods.asReadonly();

  recipeName = '';
  selectedFoods: Food[] = [];

  recipeEdit?: Recipe;

  editFood(selectedFood: Food): void {
    const index = this.recipeEdit!.foods.findIndex((food) => {
      return food.id === selectedFood.id;
    });
    if (index > -1) {
      this.recipeEdit!.foods.splice(index, 1);
    } else {
      this.recipeEdit!.foods.push(selectedFood);
    }
  }

  selectFood(food: Food): void {
    const index = this.selectedFoods.indexOf(food);
    if (index > -1) {
      this.selectedFoods.splice(index, 1);
    } else {
      this.selectedFoods.push(food);
    }
  }

  addRecipe(): void {
    const recipeRequest: RecipeRequest = {
      name: this.recipeName,
      foods: this.selectedFoods
    }
    this.recipeService.addRecipe(recipeRequest).pipe(take(1)).subscribe({
      next: (recipe: Recipe) => {
        this.recipes().push(recipe);
      }
    });
  }

  editRecipe(recipe: Recipe): void {
    this.recipeEdit = JSON.parse(JSON.stringify(recipe));
  }

  deleteRecipe(id: number, index: number): void {
    this.recipeService.deleteRecipe(id).pipe(take(1)).subscribe({
      next: () => {
        this.recipes().splice(index, 1);
      }
    });
  }

  isEditFoodSelected(selectedFood: Food): boolean {
    let found = false;
    this.recipeEdit!.foods.forEach(food => {
      if (food.id === selectedFood.id) {
        found = true;
        return;
      }
    });
    return found;
  }

  updateRecipe(recipe: Recipe): void {
    const recipeRequest: RecipeRequest = {
      id: recipe.id,
      name: recipe.name,
      foods: recipe.foods
    }
    this.recipeService.updateRecipe(recipeRequest).pipe(take(1)).subscribe({
      next: (updatedRecipe: Recipe) => {
        const recipeToUpdate = this.recipes().find((recipe: Recipe) => {
          return recipe.id === updatedRecipe.id;
        });
        if (recipeToUpdate) {
          Object.assign(recipeToUpdate, updatedRecipe);
          this.closeEditRecipeModalButton?.nativeElement.click();
        }
      }
    });
  }

}
