import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './products/list/list.component';
import { DetailsComponent } from './products/details/details.component';
import { PlantContainerComponent } from './products/plant-container/plant-container.component';
import { ShoppingcartComponent } from './cart/shoppingcart/shoppingcart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartContainerComponent } from './cart/cart-container/cart-container.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal/modal-content/modal-content.component';
import { ModalContainerComponent } from './modal/modal-container/modal-container.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminContainerComponent } from './admin/admin-container/admin-container.component';
import { AdminAddComponent } from './admin/admin-add/admin-add.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { AdminUpdateComponent } from './admin/admin-update/admin-update.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { NotificationComponent } from './notification/notification.component';
import { AdminUserListComponent } from './admin/admin-user-list/admin-user-list.component';
import { AdminUserUpdateComponent } from './admin/admin-user-update/admin-user-update.component';
import { AdminUserAddComponent } from './admin/admin-user-add/admin-user-add.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MissionComponent } from './mission/mission.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SuccesStripeComponent } from './cart/succes-stripe/succes-stripe.component';
import { FailureStripeComponent } from './cart/failure-stripe/failure-stripe.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

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
    AdminListComponent,
    AdminUpdateComponent,
    NotificationComponent,
    AdminUserListComponent,
    AdminUserUpdateComponent,
    AdminUserAddComponent,
    FooterComponent,
    HomeComponent,
    MissionComponent,
    SuccesStripeComponent,
    FailureStripeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireStorageModule,
    MatIconModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NoopAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [CookieService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [ModalContentComponent],
})
export class AppModule {}
