// import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptModalComponent } from './receipt-modal.component';

describe('ReceiptModalComponent', () => {
  let fixture: ReceiptModalComponent;
  let cartServiceMock: any;

  beforeEach(() => {
    cartServiceMock = {
      purchaseItems: jest.fn(),
      clearCart: jest.fn(),
    };

    fixture = new ReceiptModalComponent(cartServiceMock);
  });

  it('should close modal, call cartService.purchaseItems, and cartService.clearCart when an item is purchased', () => {
    const closeModalSpy = jest.spyOn(fixture, 'closeModal');
    fixture.handlePurchase();

    expect(closeModalSpy).toHaveBeenCalledTimes(1);
    expect(cartServiceMock.purchaseItems).toHaveBeenCalledWith(true);
    expect(cartServiceMock.clearCart).toHaveBeenCalledTimes(1);
  });
});
