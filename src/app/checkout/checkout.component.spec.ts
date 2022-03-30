// import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ShoppingItem } from '../shopping/shoppingItem.model';
import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let fixture: CheckoutComponent;
  let cartServiceMock: any;
  let testCartItems: ShoppingItem[];
  let testPurchased: boolean;

  beforeEach(() => {
    testCartItems = [
      new ShoppingItem('test', 'test', 'test', 5, 0.1, 5, 'test'),
    ];
    testPurchased = true;
    cartServiceMock = {
      cartInventoryChanged: of(testCartItems),
      itemsPurchased: of(testPurchased),
      getCartInventory: jest.fn(() => testCartItems),
      clearCart: jest.fn(),
    };

    fixture = new CheckoutComponent(cartServiceMock);
  });

  it('should set the inventory when cartService emits cartInventoryChanged observable', () => {
    fixture.ngOnInit();
    expect(fixture.cartItems).toBe(testCartItems);
  });

  it('should set purchased from cartService', () => {
    fixture.ngOnInit();
    expect(fixture.purchased).toBeTruthy();
  });

  it('should call checkout on init and perform cart calculations', () => {
    const checkoutSpy = jest.spyOn(fixture, 'checkout');
    fixture.ngOnInit();

    expect(checkoutSpy).toHaveBeenCalled();
    expect(fixture.totalCost).toBe(27.5);
  });

  it('should set modal display correctly', () => {
    fixture.ngOnInit();
    fixture.openModal();
    expect(fixture.display).toBe('block');
    fixture.onCloseHandled();
    expect(fixture.display).toBe('none');
  });

  it('should call cartService.clearCart() on cart clear', () => {
    fixture.ngOnInit();
    fixture.clearCart();
    expect(cartServiceMock.clearCart).toHaveBeenCalledTimes(1);
  });
});
