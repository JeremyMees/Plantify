import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantContainerComponent } from './plant-container/plant-container.component';
import { CartContainerComponent } from './cart-container/cart-container.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { AdminGuard } from './admin.guard';
import { LoginGuard } from './login.guard';
import { HomeComponent } from './home/home.component';
import { MissionComponent } from './mission/mission.component';
import { SuccesStripeComponent } from './succes-stripe/succes-stripe.component';
import { FailureStripeComponent } from './failure-stripe/failure-stripe.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product-list', component: PlantContainerComponent },
  { path: 'product-list/:id', component: PlantContainerComponent },
  { path: 'shopping-cart', component: CartContainerComponent },
  { path: 'shopping-cart/payment-success', component: SuccesStripeComponent },
  { path: 'shopping-cart/payment-failure', component: FailureStripeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminContainerComponent,
    canActivate: [AdminGuard],
  },
  { path: 'mission', component: MissionComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
