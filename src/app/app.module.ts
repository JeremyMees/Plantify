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
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { AdminAddComponent } from './admin-add/admin-add.component';

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
    RegisterComponent,
    ModalContentComponent,
    ModalContainerComponent,
    NavbarComponent,
    AdminContainerComponent,
    AdminAddComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
  entryComponents: [ModalContentComponent],
})
export class AppModule {}
