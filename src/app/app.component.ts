import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';
import { ShoppingItem } from './shopping/shoppingItem.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mpx-dev-shop';

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.authService.autoLogin();
  }

  ngOnDestroy() {
    localStorage.removeItem('cartData');
    localStorage.removeItem('shoppingData');
    localStorage.removeItem('userData');
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

  // user1 = new User('test1', 'test1', 'test1', new Date(), []);
  // user2 = new User('test2', 'test2', 'test2', new Date(), []);

  // postingItems = [this.user1, this.user2];

  // handleWrite() {
  //   this.http
  //     .put(
  //       'https://mpx-shop-default-rtdb.firebaseio.com/testUserList/test/userList.json?auth=AIzaSyAXT-2pUNxSUyRZW31VVBkLybVgGIeCpMc',
  //       this.postingItems
  //     )
  //     .subscribe((res: any) => {
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
