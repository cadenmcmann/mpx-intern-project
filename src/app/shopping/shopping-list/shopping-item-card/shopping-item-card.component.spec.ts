import { ShoppingItem } from '../../shoppingItem.model';
import { ShoppingItemCardComponent } from './shopping-item-card.component';

describe('ShoppingItemCardComponent', () => {
  let fixture: ShoppingItemCardComponent;
  let cartServiceMock: any;
  let testItem: ShoppingItem;

  beforeAll(() => {
    cartServiceMock = {
      addItemToCart: jest.fn(),
      removeItemFromCart: jest.fn(),
    };
    testItem = new ShoppingItem('test', 'test', 'test', 5, 5, 5, 'test');

    fixture = new ShoppingItemCardComponent(cartServiceMock);
    fixture.shoppingItem = testItem;
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create the right quantities list on init', () => {
    fixture.ngOnInit();
    let expectedList = [];
    for (let i = 1; i < testItem.quantity + 1; i++) {
      expectedList.push({ name: i.toString(), value: i });
    }
    expect(fixture.itemQuantityOptions).toEqual(expectedList);
  });

  it('should update the item quantity options when added or removed from cart', () => {
    fixture.ngOnInit();
    fixture.selectedQuantity = 2;

    let expectedList = [];
    for (let i = 1; i < 4; i++) {
      expectedList.push({ name: i.toString(), value: i });
    }

    fixture.onAddOrRemove();
    expect(fixture.itemQuantityOptions).toEqual(expectedList);
  });

  it('should call addItemToCart on cartService when not in cart mode', () => {
    fixture.ngOnInit();
    fixture.cartMode = false;
    fixture.onAddOrRemove();
    expect(cartServiceMock.addItemToCart).toHaveBeenCalledTimes(1);
  });

  it('should call removeItemFromCart on cartService when in cart mode', () => {
    fixture.ngOnInit();
    fixture.cartMode = true;
    fixture.onAddOrRemove();
    expect(cartServiceMock.removeItemFromCart).toHaveBeenCalledTimes(1);
  });
});
