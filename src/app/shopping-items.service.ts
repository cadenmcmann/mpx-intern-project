import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShoppingItem } from './shopping/shoppingItem.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingItemsService {
  inventoryChanged = new Subject<ShoppingItem[]>();
  private shoppingInventory: ShoppingItem[] = [
    new ShoppingItem(
      '16lb bag of skittles',
      'A big, flavorful bag of candy',
      'https://m.media-amazon.com/images/I/61Fs9NpNXkL._SL1000_.jpg',
      20,
      0.0,
      2
    ),
    new ShoppingItem(
      'Samsung TV',
      'For the big games in the man cave',
      'https://img.us.news.samsung.com/us/wp-content/uploads/2019/01/14103848/Samsung-TV_iTunes-Movies-and-TV-shows.jpg',
      20,
      0.1,
      5
    ),
    new ShoppingItem(
      'Pasta Box',
      'The backbone of your italian meals',
      'https://bjs.scene7.com/is/image/bjs/240871?$bjs-Zoom$',
      20,
      0.1,
      7
    ),
    new ShoppingItem(
      'Imported Wine',
      'Great for all wine lovers out there',
      'https://image.made-in-china.com/2f0j00ECGfhZSzaUbe/Creative-Glass-Wine-Bottle-Foreign-Wine-Bottle-750ml500ml-Clear-Ice-Wine-Bottle-Empty-Wholesale.jpg',
      20,
      0.15,
      4
    ),
  ];

  constructor() { }

  getShoppingInventory() {
    return this.shoppingInventory;
  }

  updateItemQuantity(itemToUpdate: ShoppingItem, quantity: number) {
    let currentShoppingInventory = this.shoppingInventory.slice();
    currentShoppingInventory.forEach((shopItem: ShoppingItem) => {
      if (shopItem.name === itemToUpdate.name) {
        shopItem.quantity -= quantity;
      }
    })
    this.shoppingInventory = currentShoppingInventory;
    this.inventoryChanged.next(this.shoppingInventory.slice());
  }
}
