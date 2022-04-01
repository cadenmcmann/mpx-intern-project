import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { ShoppingItem } from '../shopping/shoppingItem.model';
import { Subscription } from 'rxjs';

export type ReceiptItem = {
  name: string;
  quantity: number;
  standardPrice: number;
  costPer: number;
  totalPrice: number;
  salesTaxPrice?: number;
  importTaxPrice?: number;
};

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [],
})
export class CheckoutComponent implements OnInit {
  cartItems: ShoppingItem[] = [];
  cartItemsSubscription: Subscription;
  receiptSummary: ReceiptItem[] = [];
  totalCost = 0;
  purchased = false;
  display = 'none';

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItemsSubscription =
      this.cartService.cartInventoryChanged.subscribe(
        (cartItems: ShoppingItem[]) => {
          this.cartItems = cartItems;
        }
      );
    this.cartItems = this.cartService.getCartInventory();
    this.cartService.itemsPurchased.subscribe((purchased) => {
      if (purchased) {
        this.purchased = true;
      }
    });
    this.checkout();
  }

  openModal() {
    this.display = 'block';
  }
  onCloseHandled() {
    this.display = 'none';
  }

  ngOnDestroy() {
    this.cartItemsSubscription.unsubscribe();
  }

  clearCart() {
    this.cartService.clearCart();
  }

  checkout() {
    this.cartItems.forEach((item: ShoppingItem) => {
      let tax = 1 + item.tax;
      let currItemCost = item.price * item.quantity * tax;
      this.totalCost = parseFloat((this.totalCost + currItemCost).toFixed(2));
      this.receiptSummary = this.checkoutHelper(this.receiptSummary, item);
    });
  }

  private checkoutHelper(receiptCosts: ReceiptItem[], item: ShoppingItem) {
    let receiptItem: ReceiptItem = {
      name: item.name,
      quantity: item.quantity,
      standardPrice: parseFloat((item.price * item.quantity).toFixed(2)),
      costPer: item.price,
      totalPrice: 0,
      salesTaxPrice: 0,
      importTaxPrice: 0,
    };

    switch (item.tax) {
      case 0.05:
        receiptItem.importTaxPrice = this.taxHelper(
          item.quantity * item.price * 0.05
        );
        break;
      case 0.1:
        receiptItem.salesTaxPrice = this.taxHelper(
          item.quantity * item.price * 0.1
        );
        break;
      case 0.15:
        receiptItem.salesTaxPrice = this.taxHelper(
          item.quantity * item.price * 0.1
        );
        receiptItem.importTaxPrice = this.taxHelper(
          item.quantity * item.price * 0.05
        );
        break;
    }

    receiptItem.totalPrice = parseFloat(
      (
        receiptItem.standardPrice +
        receiptItem.salesTaxPrice +
        receiptItem.importTaxPrice
      ).toFixed(2)
    );

    receiptCosts.push(receiptItem);
    return receiptCosts;
  }

  // rounds tax numbers to the nearest 0.05
  private taxHelper(cost: number): number {
    return parseFloat((Math.ceil(cost * 20) / 20).toFixed(2));
  }
}
