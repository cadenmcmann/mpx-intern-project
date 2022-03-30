import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShoppingItem } from '../shoppingItem.model';
import { ShoppingItemsService } from '../../shared/shopping-items.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: [],
})
export class ShoppingListComponent implements OnInit {
  public category: string;
  public items: ShoppingItem[] = [];

  routeSubscription: Subscription;
  itemsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private shoppingItemsService: ShoppingItemsService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.category = params['category'];
    });
    this.itemsSubscription =
      this.shoppingItemsService.inventoryChanged.subscribe((items) => {
        this.items = items;
      });
    this.shoppingItemsService.getShoppingInventory(this.category);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.itemsSubscription.unsubscribe();
  }
}
