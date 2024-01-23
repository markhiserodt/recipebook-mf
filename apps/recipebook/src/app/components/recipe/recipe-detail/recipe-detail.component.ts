import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Recipe } from '../../../models/recipe.model';
import { Observable, take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { RecipeCommentRequest } from '../../../models/recipe-comment-request.model';

@Component({
  selector: 'rb-recipe-detail',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);

  recipe: Recipe = {} as Recipe;

  comment: string = '';
  
  ngOnInit(): void {
    (this.activatedRoute.data as Observable<{ recipe: Recipe }>).subscribe(({ recipe }) => {
      this.recipe = recipe;
    });
  }

  addComment(comment: string): void {
    const recipeComment: RecipeCommentRequest = {
      recipeId: this.recipe.id,
      // timeStamp: new Date(),
      comment: comment
    };
    this.recipeService.addComment(recipeComment).pipe(take(1)).subscribe({
      next: () => {
        this.recipe.comments.push(recipeComment);
      }
    });
  }
}
