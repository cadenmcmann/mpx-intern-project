import { Component, OnInit } from '@angular/core';
import { ShoppingItem } from '../shopping/shoppingItem.model';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems: ShoppingItem[] = [];
  cartItemsSubscription: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItemsSubscription =
      this.cartService.cartInventoryChanged.subscribe(
        (cartItems: ShoppingItem[]) => {
          this.cartItems = cartItems;
        }
      );
    this.cartItems = this.cartService.getCartInventory();
    if (localStorage.getItem('cartData')) {
      this.cartService.setCartInventory(
        JSON.parse(localStorage.getItem('cartData'))
      );
    }
  }

  ngOnDestroy() {
    this.cartItemsSubscription.unsubscribe();
  }

  clearCart() {
    this.cartService.clearCart();
  }

  checkout() {
    // calculation
    let itemizedCosts = [];
    let totalCost = 0;

    this.cartItems.forEach((item: ShoppingItem) => {
      let tax = 1 + item.tax;
      let currItemCost = item.price * item.quantity * tax;
      totalCost += currItemCost;
      itemizedCosts.push({
        name: item.name,
        quantity: item.quantity,
        cost: currItemCost,
      });
    });

    console.log(totalCost);
  }
}
