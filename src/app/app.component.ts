import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { ShoppingItem } from './shopping/shoppingItem.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'mpx-dev-shop';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }

  // postingItems: ShoppingItem[] = [
  //   new ShoppingItem(
  //     'Imported Vanilla-Hazelnut Coffee Bag',
  //     'Add a sweet, powerful boost to your mornings with our deluxe coffee.',
  //     'https://m.media-amazon.com/images/I/7185+V3dDzL._SY741_.jpg',
  //     11,
  //     0.05,
  //     5,
  //     'beverages'
  //   ),
  // ];

  // handleWrite() {
  //   this.http
  //     .put(
  //       'https://mpx-shop-default-rtdb.firebaseio.com/items/beverages.json',
  //       this.postingItems
  //     )
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }

  // handleRead() {}

  // handleWrite() {
  //   const ref = this.db.list('items/alcohol');
  //   ref.push(this.exampleItem)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  // items: AngularFireList<any>;
  // ngOnInit() {
  //   const foodRef = this.db.list('items/food');
  //   // this.items = this.db.list('items/food').valueChanges();
  // }

  // handleRead() {
  //   this.items = this.db.list('items/food');
  //   this.items.valueChanges().subscribe((item: any) => {
  //     console.log(item)
  //   })
  // }
}
