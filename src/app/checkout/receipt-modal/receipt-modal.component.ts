import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { ShoppingItem } from 'src/app/shopping/shoppingItem.model';
import { ReceiptItem } from '../checkout.component';

@Component({
  selector: 'app-receipt-modal',
  templateUrl: './receipt-modal.component.html',
  styleUrls: ['./receipt-modal.component.css'],
})
export class ReceiptModalComponent implements OnInit {
  @Input() receiptItems: ReceiptItem[];
  @Input() display: string;
  @Input() totalCartCost: number;

  closeModal() {
    this.display = 'none';
  }

  handlePurchase() {
    this.closeModal();
    this.cartService.purchaseItems(true);
    this.cartService.clearCart();
  }

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
}
