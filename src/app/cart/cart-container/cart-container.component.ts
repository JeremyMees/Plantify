import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { Stripe } from '../../models/stripe';
import { ProductCookie } from 'src/app/models/productCookie';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart-container',
  templateUrl: './cart-container.component.html',
  styleUrls: ['./cart-container.component.scss'],
})
export class CartContainerComponent implements OnInit {
  products: Array<Product> = [];
  totalPrice: number;
  email: string | undefined;
  products$ = new Subject<Array<Product>>();

  constructor(
    private cartService: CartService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartInventory().subscribe((data: Array<Product>) => {
      this.products = data;
      this.products$.next(this.products);
      this.totalPriceOfProducts();
    });

    this.authService.getUserCredentials().subscribe((user: any) => {
      if (user) {
        this.email = user.email;
      } else {
        this.email = undefined;
      }
    });
  }

  onQuantityChange(change: Array<any>) {
    const objIndex = this.products.findIndex(
      (product: Product) => product.id === change[1].id
    );
    if (change[0] === 1) {
      this.products[objIndex].quantity = this.products[objIndex].quantity + 1;
      const cookie = JSON.parse(this.cartService.getCookie('cart'));
      const cookieIndex = cookie.findIndex(
        (value: ProductCookie) => value.id === this.products[objIndex].id
      );
      cookie[cookieIndex].quantity = cookie[cookieIndex].quantity + 1;
      this.cartService.setCookie('cart', JSON.stringify(cookie));
      this.totalPriceOfProducts();
    } else {
      /* istanbul ignore if  */
      if (this.products[objIndex].quantity <= 1) {
        this.notificationService.setNotification(
          "Can't go lower than one",
          'top',
          2,
          'Timer'
        );
      } else {
        this.products[objIndex].quantity = this.products[objIndex].quantity - 1;
        const cookie = JSON.parse(this.cartService.getCookie('cart'));
        const cookieIndex = cookie.findIndex(
          (value: ProductCookie) => value.id === this.products[objIndex].id
        );
        cookie[cookieIndex].quantity = cookie[cookieIndex].quantity - 1;
        this.cartService.setCookie('cart', JSON.stringify(cookie));
        this.totalPriceOfProducts();
      }
    }
  }

  deleteFromCart(product: Product): void {
    this.cartService.deleteItemFromCart(product);

    this.totalPriceOfProducts();
  }

  totalPriceOfProducts(): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  payForProducts(stripeArray: Array<Stripe>): void {
    if (this.email !== undefined) {
      console.log('if');

      this.cartService.payProducts(stripeArray, this.products, this.email);
    } else {
      console.log('else');
      this.notificationService.setNotification(
        'Please log in first',
        'top',
        2,
        'Clickable'
      );
    }

    this.totalPriceOfProducts();
  }
}
