import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
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
  userToken: string;

  routeSubscription: Subscription;
  itemsSubscription: Subscription;
  authSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private shoppingItemsService: ShoppingItemsService,
    private authService: AuthService
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
    // this.itemsSubscription.unsubscribe();
  }
}
