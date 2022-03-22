import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingItemCardComponent } from './shopping/shopping-list/shopping-item-card/shopping-item-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingComponent,
    CheckoutComponent,
    ShoppingListComponent,
    ShoppingItemCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
