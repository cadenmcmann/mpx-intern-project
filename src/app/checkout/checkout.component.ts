import { Component, OnInit } from '@angular/core';
import { ShoppingItem } from '../shopping/shoppingItem.model';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: ShoppingItem[] = [];
  cartItemsSubscription: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItemsSubscription = this.cartService.cartInventoryChanged
      .subscribe(
        (cartItems: ShoppingItem[]) => {
          this.cartItems = cartItems;
        }
      );
    this.cartItems = this.cartService.getCartInventory();
  }

  ngOnDestroy() {
    this.cartItemsSubscription.unsubscribe();
  }
}
