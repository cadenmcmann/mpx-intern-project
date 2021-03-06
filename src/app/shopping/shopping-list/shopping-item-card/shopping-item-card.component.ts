import { Component, Input, OnInit } from '@angular/core';
// import { CartService } from 'src/app/shared/cart.service';
import { CartService } from '../../../shared/cart.service';
import { ShoppingItem } from '../../shoppingItem.model';
// import { ShoppingItemsService } from 'src/app/shared/shopping-items.service';

@Component({
  selector: 'app-shopping-item-card',
  templateUrl: './shopping-item-card.component.html',
  styleUrls: [],
})
export class ShoppingItemCardComponent implements OnInit {
  @Input() shoppingItem: ShoppingItem;
  itemQuantityOptions: any[] = [];
  @Input() cartMode: boolean;
  selectedQuantity: number = 0;
  constructor(
    private cartService: CartService // private shoppingService: ShoppingItemsService
  ) {}

  /**
   * Need to...
   * 1. Use Cart Service to add the item to the cart
   * 2. Use the shopping list service to update the quantity of the shopping item
   */
  onAddOrRemove() {
    // make new shopping item with selected quantity to be added/removed
    let newItem = { ...this.shoppingItem, quantity: this.selectedQuantity };
    // update quantity remaining for item
    let remainingQuantity = this.shoppingItem.quantity - this.selectedQuantity;
    this.itemQuantityOptions = [];
    for (let i = 1; i < remainingQuantity + 1; i++) {
      this.itemQuantityOptions.push({ name: i.toString(), value: i });
    }

    // if in shopping mode, add to cart
    if (!this.cartMode) {
      this.cartService.addItemToCart(newItem);
    } else {
      // if in cart mode, remove from cart
      this.cartService.removeItemFromCart(newItem);
    }
  }

  onSelectQuantity(event: Event) {
    this.selectedQuantity = parseInt((event.target as HTMLSelectElement).value);
  }

  ngOnInit(): void {
    for (let i = 1; i < this.shoppingItem.quantity + 1; i++) {
      this.itemQuantityOptions.push({ name: i.toString(), value: i });
    }
  }
}
