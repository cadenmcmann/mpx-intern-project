import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';
import { ShoppingItem } from './shopping/shoppingItem.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  async postUserData(user: User) {
    const userList = await this.http
      .get<User[]>(
        `https://mpx-shop-default-rtdb.firebaseio.com/users.json?auth=${user.token}`
      )
      .toPromise();
    userList.push(user);
    this.http
      .put<User[]>(
        `https://mpx-shop-default-rtdb.firebaseio.com/users.json?auth=${user.token}`,
        userList
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  async getUserCart(email: string): Promise<ShoppingItem[]> {
    return [new ShoppingItem('a', 'a', 'a', 0, 0, 0, 'a')];
  }
}
