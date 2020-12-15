import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { PlantContainerComponent } from './plant-container/plant-container.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartContainerComponent } from './cart-container/cart-container.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailsComponent,
    PlantContainerComponent,
    ShoppingcartComponent,
    PageNotFoundComponent,
    CartContainerComponent,
    LoginComponent,
    AccountComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
