import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShoppingItem } from './shopping/shoppingItem.model';
import { ShoppingItemsService } from './shopping-items.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartInventoryChanged = new Subject<ShoppingItem[]>();

  private cartInventory: ShoppingItem[] = [];

  constructor(private shoppingService: ShoppingItemsService) { }

  setCartInventory(cartInv: ShoppingItem[]) {
    this.cartInventory = cartInv;
    this.cartInventoryChanged.next(this.cartInventory.slice());
  }

  getCartInventory() {
    return this.cartInventory;
  }

  addItemToCart(addedItem: ShoppingItem) {
    let addedItemQty = addedItem.quantity;
    // If the item is not in the cart, add it
    if (!this.itemInCart(addedItem)) {
      this.cartInventory.push(addedItem);
      this.cartInventoryChanged.next(this.cartInventory.slice());
    }
    // If item is in cart, update its quantity
    else {
      let currentCartInventory = this.cartInventory.slice()
      currentCartInventory.forEach((cartItem: ShoppingItem) => {
        if (cartItem.name === addedItem.name) {
          cartItem.quantity += addedItemQty;
        }
      })
      this.cartInventory = currentCartInventory;
      this.cartInventoryChanged.next(this.cartInventory.slice());
    }

    // Call shopping-items service to update quantity of item remaining on shopping page
    this.shoppingService.updateItemQuantity(addedItem, addedItemQty);
  }

  // helper function
  itemInCart(item: ShoppingItem): boolean {
    let itemFound = false;
    this.cartInventory.forEach((cartItem: ShoppingItem) => {
      if (cartItem.name === item.name) {
        itemFound = true;
      }
    });
    return itemFound;
  }
}
