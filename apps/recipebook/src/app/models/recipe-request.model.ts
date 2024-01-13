import { Food } from "./food.model";

export interface RecipeRequest {
  id?: number,
  name: string,
  foods: Food[]
}