import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ShoppingItem } from './shopping/shoppingItem.model';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

interface ServerItemsResponseData {
  key: {
    category: string;
    description: string;
    imagePath: string;
    name: string;
    price: number;
    quantity: number;
    tax: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingItemsService {
  userSubscription: Subscription;
  userToken: string;

  inventoryChanged = new Subject<ShoppingItem[]>();
  inventory: ShoppingItem[] = [];

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.userToken = user.token;
    });
  }

  getShoppingInventory(category: string) {
    this.http
      .get<ShoppingItem[]>(
        `https://mpx-shop-default-rtdb.firebaseio.com/items/${category}.json?auth=${this.userToken}`
      )
      .subscribe((items) => {
        this.inventory = items;
        this.inventoryChanged.next(items);
      });
  }

  updateItemQuantity(itemToUpdate: ShoppingItem, quantity: number) {
    let currentShoppingInventory = this.inventory.slice();
    currentShoppingInventory.forEach((shopItem: ShoppingItem) => {
      if (shopItem.name === itemToUpdate.name) {
        shopItem.quantity -= quantity;
      }
    });
    this.inventory = currentShoppingInventory;
    this.inventoryChanged.next(this.inventory.slice());
  }
}
