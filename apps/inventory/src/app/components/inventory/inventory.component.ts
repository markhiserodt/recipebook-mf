import { Component, ElementRef, Signal, ViewChild, inject } from '@angular/core';
import { Inventory } from '../../models/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { InventoryRequest } from '../../models/inventory-request.model';
import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'inv-inventory',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {
  inventoryService = inject(InventoryService);

  @ViewChild('closeEditInventoryModalButton') closeEditInventoryModalButton?: ElementRef;
  
  inventory: Signal<Inventory[]> = this.inventoryService.inventory.asReadonly();
  
  inventoryName = '';
  inventoryQuantity = 0;

  inventoryEdit?: Inventory;

  addInventory(name: string, quantity: number): void {
    const inventoryRequest: InventoryRequest = {
      name: name,
      quantity: quantity
    };
    this.inventoryService.addInventory(inventoryRequest).pipe(take(1)).subscribe({
      next: (inventory) => {
        this.inventory().push(inventory);
      }
    });
  }

  deleteInventory(id: number, index: number): void {
    this.inventoryService.deleteInventory(id).pipe(take(1)).subscribe({
      next: () => {
        this.inventory().splice(index, 1);
      }
    });
  }

  editInventory(inventory: Inventory): void {
    this.inventoryEdit = Object.assign({}, inventory);
  }

  updateInventory(inventory: Inventory): void {
    const inventoryRequest: InventoryRequest = {
      id: inventory.id,
      name: inventory.name,
      quantity: inventory.quantity
    };
    this.inventoryService.updateInventory(inventoryRequest).pipe(take(1)).subscribe({
      next: (updatedInventory: Inventory) => {
        const inventoryToUpdate = this.inventory().find((inventory: Inventory) => inventory.id === updatedInventory.id);
        if (inventoryToUpdate) {
          Object.assign(inventoryToUpdate, updatedInventory);
          this.closeEditInventoryModalButton?.nativeElement.click();
        }
      }
    });
  }
  
}
