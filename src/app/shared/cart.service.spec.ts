import { ShoppingItem } from '../shopping/shoppingItem.model';
import { CartService } from './cart.service';

describe('CartService', () => {
  let fixture: CartService;
  let shoppingServiceMock: any;

  beforeEach(() => {
    shoppingServiceMock = {
      updateItemQuantity: jest.fn(),
    };
    fixture = new CartService(shoppingServiceMock);
  });

  it('should set the cart inventory', () => {
    let testInv = [new ShoppingItem('test', 'test', 'test', 0, 0, 0, 'test')];
    fixture.setCartInventory(testInv);
    expect(fixture.cartInventory).toBe(testInv);
    fixture.cartInventoryChanged.subscribe((inventory) => {
      expect(inventory).toBe(testInv);
    });
  });

  it('should get the cart inventory', () => {
    let testInv = [new ShoppingItem('test', 'test', 'test', 0, 0, 0, 'test')];
    fixture.setCartInventory(testInv);
    expect(fixture.getCartInventory()).toBe(testInv);
  });

  it('should add a new item to cart', () => {
    let testItem = new ShoppingItem('test', 'test', 'test', 0, 0, 0, 'test');
    fixture.addItemToCart(testItem);
    expect(fixture.cartInventory).toEqual([testItem]);
  });

  it('should update an existing cart items quantity on add', () => {
    let testItem = new ShoppingItem('test', 'test', 'test', 0, 0, 2, 'test');
    fixture.addItemToCart(testItem);
    fixture.addItemToCart(testItem);
    testItem.quantity = 4;
    expect(fixture.cartInventory).toEqual([testItem]);
  });

  it('should remove all of an item from cart', () => {
    let testItem = new ShoppingItem('test', 'test', 'test', 0, 0, 2, 'test');
    let testItem2 = new ShoppingItem(
      'test2',
      'test2',
      'test2',
      0,
      0,
      2,
      'test2'
    );
    fixture.addItemToCart(testItem);
    fixture.addItemToCart(testItem2);
    fixture.removeItemFromCart(testItem);
    expect(fixture.cartInventory).toEqual([testItem2]);
  });

  it('should remove some of an item from cart', () => {
    let testItem = new ShoppingItem('test', 'test', 'test', 0, 0, 4, 'test');
    fixture.addItemToCart(testItem);
    let testItem2 = new ShoppingItem('test', 'test', 'test', 0, 0, 2, 'test');
    fixture.removeItemFromCart(testItem2);
    expect(fixture.cartInventory).toEqual([testItem2]);
  });

  it('should clear the cart', () => {
    let testItem = new ShoppingItem('test', 'test', 'test', 0, 0, 4, 'test');
    let testItem2 = new ShoppingItem('test', 'test', 'test', 0, 0, 2, 'test');
    fixture.addItemToCart(testItem);
    fixture.addItemToCart(testItem2);
    fixture.clearCart();
    expect(fixture.cartInventory).toEqual([]);
  });
});
