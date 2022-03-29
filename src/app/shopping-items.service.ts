import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ShoppingItem } from './shopping/shoppingItem.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShoppingItemsService {
  userSubscription: Subscription;
  userToken: string;

  inventoryChanged = new Subject<ShoppingItem[]>();
  inventory: ShoppingItem[] = [];

  foodInventory: ShoppingItem[];
  electronicsInventory: ShoppingItem[];
  beveragesInventory: ShoppingItem[];
  alcoholInventory: ShoppingItem[];

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user === null) {
        this.inventory = [];
      }
      this.userToken = user.token;
    });
  }

  async getShoppingInventory(category: string) {
    switch (category) {
      case 'food':
        if (this.foodInventory !== undefined) {
          this.inventory = this.foodInventory;
        } else {
          this.foodInventory = await this.getItemsFromDatabase(category);
          this.inventory = this.foodInventory;
        }
        break;
      case 'electronics':
        if (this.electronicsInventory !== undefined) {
          this.inventory = this.electronicsInventory;
        } else {
          this.electronicsInventory = await this.getItemsFromDatabase(category);
          this.inventory = this.electronicsInventory;
        }
        break;
      case 'beverages':
        if (this.beveragesInventory !== undefined) {
          this.inventory = this.beveragesInventory;
        } else {
          this.beveragesInventory = await this.getItemsFromDatabase(category);
          this.inventory = this.beveragesInventory;
        }
        break;
      case 'alcohol':
        if (this.alcoholInventory !== undefined) {
          this.inventory = this.alcoholInventory;
        } else {
          this.alcoholInventory = await this.getItemsFromDatabase(category);
          this.inventory = this.alcoholInventory;
        }
        break;
    }

    this.inventoryChanged.next(this.inventory.slice());
  }

  async getItemsFromDatabase(category: string): Promise<ShoppingItem[]> {
    const items = await this.http
      .get<ShoppingItem[]>(
        `https://mpx-shop-default-rtdb.firebaseio.com/items/${category}.json?auth=${this.userToken}`
      )
      .toPromise();
    return items;
  }

  updateItemQuantity(itemToUpdate: ShoppingItem, quantity: number) {
    let category = itemToUpdate.category;

    switch (category) {
      case 'food':
        this.updateQuantityHelper(this.foodInventory, itemToUpdate, quantity);
        break;
      case 'electronics':
        this.updateQuantityHelper(
          this.electronicsInventory,
          itemToUpdate,
          quantity
        );
        break;
      case 'beverages':
        this.updateQuantityHelper(
          this.beveragesInventory,
          itemToUpdate,
          quantity
        );
        break;
      case 'alcohol':
        this.updateQuantityHelper(
          this.alcoholInventory,
          itemToUpdate,
          quantity
        );
        break;
    }
  }

  private updateQuantityHelper(
    categoryList: ShoppingItem[],
    updateItem: ShoppingItem,
    quantity: number
  ) {
    categoryList.forEach((item) => {
      if (item.name === updateItem.name) {
        item.quantity -= quantity;
      }
    });

    // switch (categoryList) {
    //   case this.foodInventory:
    //     localStorage.setItem(
    //       'foodInventory',
    //       JSON.stringify(this.foodInventory)
    //     );
    //     break;
    //   case this.electronicsInventory:
    //     localStorage.setItem(
    //       'electronicsInventory',
    //       JSON.stringify(this.electronicsInventory)
    //     );
    //     break;
    //   case this.beveragesInventory:
    //     localStorage.setItem(
    //       'beveragesInventory',
    //       JSON.stringify(this.beveragesInventory)
    //     );
    //     break;
    //   case this.alcoholInventory:
    //     localStorage.setItem(
    //       'alcoholInventory',
    //       JSON.stringify(this.alcoholInventory)
    //     );
    //     break;
    // }
  }
}
