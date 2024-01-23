import { ResolveFn } from "@angular/router";
import { Food } from "../models/food.model";
import { FoodService } from "../services/food/food.service";
import { WritableSignal, inject } from "@angular/core";

export const FoodResolver: ResolveFn<WritableSignal<Food[]>> = () => {
  return inject(FoodService).foods;
};