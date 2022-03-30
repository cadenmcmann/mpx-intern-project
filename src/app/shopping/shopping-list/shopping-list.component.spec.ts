// import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ShoppingItem } from '../shoppingItem.model';
import { ShoppingListComponent } from './shopping-list.component';

describe('ShoppingListComponent', () => {
  let fixture: ShoppingListComponent;
  let activatedRouteMock: any;
  let shoppingItemsServiceMock: any;

  let testShopList: ShoppingItem[];
  let testParams: any;

  beforeAll(() => {
    testShopList = [new ShoppingItem('test', 'test', 'test', 0, 0, 0, 'test')];
    shoppingItemsServiceMock = {
      inventoryChanged: of(testShopList),
      getShoppingInventory: jest.fn(),
    };

    testParams = {
      category: 'testCategory',
    };
    activatedRouteMock = {
      params: of(testParams),
    };
    fixture = new ShoppingListComponent(
      activatedRouteMock,
      shoppingItemsServiceMock
    );
  });

  it('should set the items correctly', () => {
    fixture.ngOnInit();
    expect(fixture.items).toBe(testShopList);
  });

  it('should set the category correctly based on route params', () => {
    fixture.ngOnInit();
    expect(fixture.category).toBe('testCategory');
  });
});
