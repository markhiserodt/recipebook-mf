import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Inventory } from '../models/inventory.model';
import { InventoryRequest } from '../models/inventory-request.model';
import { Observable, take } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private http = inject(HttpClient);
  readonly inventory = signal<Inventory[]>([]);

  constructor() { 
    this.getInventory();
  }

  addInventory(inventoryRequest: InventoryRequest): Observable<Inventory> {
    return this.http.post<Inventory>(`${environment.apiUrl + 'api/inventory'}`, inventoryRequest);
  }

  getInventory(): void {
    if (this.inventory().length > 0) return;
    this.http.get<Inventory[]>(`${environment.apiUrl + 'api/inventory'}`).pipe(take(1)).subscribe({
      next: (inventory: Inventory[]) => {
        this.inventory.set(inventory);
      }
    });
  }

  updateInventory(inventoryRequest: InventoryRequest): Observable<Inventory> {
    return this.http.put<Inventory>(`${environment.apiUrl + 'api/inventory'}`, inventoryRequest);
  }

  deleteInventory(id: number): Observable<Inventory> {
    return this.http.delete<Inventory>(`${environment.apiUrl + 'api/inventory/' + id}`);
  }

}
