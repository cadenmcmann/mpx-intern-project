import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingComponent } from './shopping/shopping.component';

const routes: Routes = [
  { path: '', redirectTo: '/shopping', pathMatch: 'full' },
  { path: 'shopping', component: ShoppingComponent, pathMatch: 'full' },
  { path: 'shopping/:category', component: ShoppingListComponent },
  { path: 'checkout', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
