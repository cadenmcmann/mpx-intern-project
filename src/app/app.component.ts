import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, Subscription } from 'rxjs';
import { ShoppingItem } from './shopping/shoppingItem.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mpx-dev-shop';

  // constructor(private db: AngularFireDatabase) { }

  // exampleItem: ShoppingItem = new ShoppingItem(
  //   'Local Wine',
  //   "For the wine lovers who aren't looking to break the bank on foreign goods.",
  //   'https://i5.peapod.com/c/NV/NVCRG.jpg',
  //   23.00,
  //   0.10,
  //   12,
  //   'alcohol'
  // );


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
