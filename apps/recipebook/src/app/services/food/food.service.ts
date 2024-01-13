import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, take } from 'rxjs';
import { FoodRequest } from '../../models/food-request.model';
import { Food } from '../../models/food.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private http = inject(HttpClient);

  readonly foods = signal<Food[]>([]);

  constructor() {
    this.getFoods();
  }

  addFood(foodRequest: FoodRequest): Observable<Food> {
    return this.http.post<Food>(`${environment.apiUrl + 'api/food'}`, foodRequest);
  }

  getFoods(): void {
    if (this.foods().length > 0) return;
    this.http.get<Food[]>(`${environment.apiUrl + 'api/food'}`).pipe(take(1)).subscribe({
      next: (foods: Food[]) => {
        this.foods.set(foods);
      }
    });
  }

  updateFood(foodRequest: FoodRequest): Observable<Food> {
    return this.http.put<Food>(`${environment.apiUrl + 'api/food'}`, foodRequest);
  }

  deleteFood(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl + 'api/food/' + id}`);
  }
}
