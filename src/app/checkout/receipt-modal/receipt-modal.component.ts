import { Component, Input } from '@angular/core';
import { CartService } from '../../shared/cart.service';
import { ReceiptItem } from '../checkout.component';

@Component({
  selector: 'app-receipt-modal',
  templateUrl: './receipt-modal.component.html',
  styleUrls: ['./receipt-modal.component.css'],
})
export class ReceiptModalComponent {
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

  // ngOnInit(): void {}
}
