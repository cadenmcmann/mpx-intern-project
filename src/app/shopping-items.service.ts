import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ShoppingItem } from './shopping/shoppingItem.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class ShoppingItemsService {
  foodInventoryChanged = new Subject<ShoppingItem[]>();
  electronicsInventoryChanged = new Subject<ShoppingItem[]>();
  beveragesInventoryChanged = new Subject<ShoppingItem[]>();
  alcoholInventoryChanged = new Subject<ShoppingItem[]>();


  foodInventory: AngularFireList<ShoppingItem>;
  electronicsInventory: AngularFireList<ShoppingItem>;
  beveragesInventory: AngularFireList<ShoppingItem>;
  alcoholInventory: AngularFireList<ShoppingItem>;


  constructor(private db: AngularFireDatabase) {
    this.foodInventory = this.db.list('items/food')
    this.electronicsInventory = this.db.list('items/electronics')
    this.beveragesInventory = this.db.list('items/beverages')
    this.alcoholInventory = this.db.list('items/alcohol')
  }

  getShoppingInventory(category: string) {
    switch (category) {
      case 'food':
        return this.foodInventory.snapshotChanges();
      case 'electronics':
        return this.electronicsInventory.snapshotChanges();
      case 'beverages':
        return this.beveragesInventory.snapshotChanges();
      case 'alcohol':
        return this.alcoholInventory.snapshotChanges();
      default:
        return this.foodInventory.snapshotChanges();
    }
  }

  // updateItemQuantity(itemToUpdate: ShoppingItem, quantity: number) {
  //   let currentShoppingInventory = this.shoppingInventory.slice();
  //   currentShoppingInventory.forEach((shopItem: ShoppingItem) => {
  //     if (shopItem.name === itemToUpdate.name) {
  //       shopItem.quantity -= quantity;
  //     }
  //   })
  //   this.shoppingInventory = currentShoppingInventory;
  //   this.inventoryChanged.next(this.shoppingInventory.slice());
  // }
}
