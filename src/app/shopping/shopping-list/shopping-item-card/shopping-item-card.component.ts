import { Component, Input, OnInit, Output } from '@angular/core';
import { ShoppingItem } from '../../shoppingItem.model';
import { CartService } from 'src/app/cart.service';
import { Subscription } from 'rxjs';
import { ShoppingItemsService } from 'src/app/shopping-items.service';

@Component({
  selector: 'app-shopping-item-card',
  templateUrl: './shopping-item-card.component.html',
  styleUrls: ['./shopping-item-card.component.css'],
})
export class ShoppingItemCardComponent implements OnInit {
  @Input() shoppingItem: ShoppingItem;
  itemQuantityOptions: any[] = [];
  @Input() cartMode: boolean;
  selectedQuantity: number = 0;
  constructor(private cartService: CartService, private shoppingService: ShoppingItemsService) { }

  /**
   * Need to...
   * 1. Use Cart Service to add the item to the cart
   * 2. Use the shopping list service to update the quantity of the shopping item
   */
  onAddItemToCart() {
    // this.cartService.addItemToCart(this.shoppingItem);
    let cartItem = { ...this.shoppingItem, quantity: this.selectedQuantity }
    let newQuantity = this.shoppingItem.quantity - this.selectedQuantity;
    this.itemQuantityOptions = []
    for (let i = 1; i < newQuantity + 1; i++) {
      this.itemQuantityOptions.push({ name: i.toString(), value: i });
    }
    this.cartService.addItemToCart(cartItem)

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
