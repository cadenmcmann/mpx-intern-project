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
  itemsSubscription: Subscription;


  constructor(private route: ActivatedRoute, private shoppingItemsService: ShoppingItemsService) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.category = params['category'];
    });
    // this.shoppingItemsSubscription = this.shoppingItemsService.inventoryChanged.subscribe((items: ShoppingItem[]) => {
    //   this.items = items;
    // })
    // this.items = this.shoppingItemsService.getShoppingInventory(this.category);
    this.itemsSubscription = this.shoppingItemsService.getShoppingInventory(this.category).subscribe((items) => {
      items.forEach((item) => {
        let shoppingItem = item.payload.val() as ShoppingItem;
        this.items.push({ ...shoppingItem, id: item.payload.key as string })
      })
      console.log(this.items);
    })
  }


  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.itemsSubscription.unsubscribe();
  }
}
