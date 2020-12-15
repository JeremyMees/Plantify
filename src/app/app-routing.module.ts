import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantContainerComponent } from './plant-container/plant-container.component';
import { CartContainerComponent } from './cart-container/cart-container.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
  { path: 'product-list', component: PlantContainerComponent },
  { path: 'shopping-cart', component: CartContainerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
