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
    // this.shoppingService.updateItemQuantity(addedItem, addedItemQty);
  }

  removeItemFromCart(removedItem: ShoppingItem) {
    // First, update cart inventory list
    let removeAll = false;
    let currentCart = this.cartInventory.slice();
    let newCart: ShoppingItem[] = []
    currentCart.forEach((item: ShoppingItem) => {
      // Case 1: Removing all of the item from the cart
      if (item.name === removedItem.name && item.quantity === removedItem.quantity) {
        removeAll = true;
        newCart = currentCart.filter((item: ShoppingItem) => (item.name !== removedItem.name))
      }
      // Case 2: Removing some of the item from the cart
      if (item.name === removedItem.name && item.quantity !== removedItem.quantity) {
        item.quantity -= removedItem.quantity;
      }
    })
    if (removeAll) {
      this.setCartInventory(newCart);
    } else {
      this.setCartInventory(currentCart);
    }
    // Now, update shopping list
    // this.shoppingService.updateItemQuantity(removedItem, -(removedItem.quantity));
  }

  clearCart() {
    this.cartInventory = [];
    this.cartInventoryChanged.next(this.cartInventory.slice());
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

  // helper function
  getItemQuantity(item: ShoppingItem) {
    let qty = -1;
    this.cartInventory.forEach((cartItem: ShoppingItem) => {
      if (cartItem.name === item.name) {
        qty = cartItem.quantity;
      }
    })
    return qty;
  }
}
