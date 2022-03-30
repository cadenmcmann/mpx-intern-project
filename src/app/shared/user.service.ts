import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../auth/user.model';

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
}
