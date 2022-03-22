import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingItemsService } from 'src/app/shopping-items.service';
import { ShoppingItem } from '../shoppingItem.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  public category: string;
  public items: ShoppingItem[] = [];
  routeSubscription: Subscription;
  shoppingItemsSubscription: Subscription;
  constructor(private route: ActivatedRoute, private shoppingItemsService: ShoppingItemsService) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.category = params['category'];
    });
    this.shoppingItemsSubscription = this.shoppingItemsService.inventoryChanged.subscribe((items: ShoppingItem[]) => {
      this.items = items;
    })
    this.items = this.shoppingItemsService.getShoppingInventory();
  }


  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.shoppingItemsSubscription.unsubscribe();
  }
}
