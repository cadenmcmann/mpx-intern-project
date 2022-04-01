import { of } from 'rxjs';
import { ShoppingItem } from '../shopping/shoppingItem.model';
import { ShoppingItemsService } from './shopping-items.service';

describe('ShoppingItemsService', () => {
  let fixture: ShoppingItemsService;
  let authServiceMock: any;
  let httpMock: any;

  beforeEach(() => {
    authServiceMock = {
      user: of({ token: 'validToken' }),
    };
    httpMock = {
      get: jest.fn(),
    };
    fixture = new ShoppingItemsService(authServiceMock, httpMock);
  });

  it('should set the user token on construction', () => {
    expect(fixture.userToken).toBe('validToken');
  });

  it('should call the database for inventory if it has not already', () => {
    const databaseCallSpy = jest.spyOn(fixture, 'getItemsFromDatabase');
    httpMock.get.mockImplementationOnce(() => ({
      toPromise: () => {
        ['items'];
      },
    }));
    fixture.getShoppingInventory('food');
    fixture.getShoppingInventory('electronics');
    fixture.getShoppingInventory('beverages');
    fixture.getShoppingInventory('alcohol');
    expect(databaseCallSpy).toHaveBeenCalledTimes(4);
  });

  it('should not call database if it has already set the inventory in memory', () => {
    const databaseCallSpy = jest.spyOn(fixture, 'getItemsFromDatabase');
    fixture.foodInventory = [
      new ShoppingItem('test', 'test', 'test', 0, 0, 0, 'food'),
    ];
    fixture.electronicsInventory = [
      new ShoppingItem('test', 'test', 'test', 0, 0, 0, 'electronics'),
    ];
    fixture.beveragesInventory = [
      new ShoppingItem('test', 'test', 'test', 0, 0, 0, 'beverages'),
    ];
    fixture.alcoholInventory = [
      new ShoppingItem('test', 'test', 'test', 0, 0, 0, 'alcohol'),
    ];
    fixture.getShoppingInventory('food');
    fixture.getShoppingInventory('electronics');
    fixture.getShoppingInventory('beverages');
    fixture.getShoppingInventory('alcohol');

    expect(databaseCallSpy).not.toHaveBeenCalled();
  });

  it('should update a shopping items quantity', () => {
    let testItemFood = new ShoppingItem(
      'test',
      'test',
      'test',
      0,
      0,
      3,
      'food'
    );
    let testItemElectronics = new ShoppingItem(
      'test',
      'test',
      'test',
      0,
      0,
      3,
      'electronics'
    );
    let testItemBeverages = new ShoppingItem(
      'test',
      'test',
      'test',
      0,
      0,
      3,
      'beverages'
    );
    let testItemAlcohol = new ShoppingItem(
      'test',
      'test',
      'test',
      0,
      0,
      3,
      'alcohol'
    );

    fixture.foodInventory = [testItemFood];
    fixture.electronicsInventory = [testItemElectronics];
    fixture.beveragesInventory = [testItemBeverages];
    fixture.alcoholInventory = [testItemAlcohol];

    fixture.updateItemQuantity(testItemFood, 2);
    fixture.updateItemQuantity(testItemElectronics, 2);
    fixture.updateItemQuantity(testItemBeverages, 2);
    fixture.updateItemQuantity(testItemAlcohol, 2);

    let testItemFood2 = new ShoppingItem(
      'test',
      'test',
      'test',
      0,
      0,
      1,
      'food'
    );
    let testItemElectronics2 = new ShoppingItem(
      'test',
      'test',
      'test',
      0,
      0,
      1,
      'electronics'
    );
    let testItemBeverages2 = new ShoppingItem(
      'test',
      'test',
      'test',
      0,
      0,
      1,
      'beverages'
    );
    let testItemAlcohol2 = new ShoppingItem(
      'test',
      'test',
      'test',
      0,
      0,
      1,
      'alcohol'
    );

    expect(fixture.foodInventory).toEqual([testItemFood2]);
    expect(fixture.electronicsInventory).toEqual([testItemElectronics2]);
    expect(fixture.beveragesInventory).toEqual([testItemBeverages2]);
    expect(fixture.alcoholInventory).toEqual([testItemAlcohol2]);
  });

  it('should set the main inventory', () => {
    fixture.foodInventory = [
      new ShoppingItem('test', 'test', 'test', 0, 0, 0, 'food'),
    ];
    fixture.electronicsInventory = [
      new ShoppingItem('test', 'test', 'test', 0, 0, 0, 'electronics'),
    ];
    fixture.beveragesInventory = [
      new ShoppingItem('test', 'test', 'test', 0, 0, 0, 'beverages'),
    ];
    fixture.alcoholInventory = [
      new ShoppingItem('test', 'test', 'test', 0, 0, 0, 'alcohol'),
    ];

    fixture.getShoppingInventory('food');
    expect(fixture.inventory).toEqual(fixture.foodInventory);

    fixture.getShoppingInventory('electronics');
    expect(fixture.inventory).toEqual(fixture.electronicsInventory);

    fixture.getShoppingInventory('beverages');
    expect(fixture.inventory).toEqual(fixture.beveragesInventory);

    fixture.getShoppingInventory('alcohol');
    expect(fixture.inventory).toEqual(fixture.alcoholInventory);
  });
});
