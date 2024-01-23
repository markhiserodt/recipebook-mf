import { Food } from "./food.model";
import { RecipeComment } from "./recipe-comment.model";

export interface Recipe {
  id: number,
  name: string,
  foods: Food[]
  comments: RecipeComment[]
}