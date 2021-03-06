import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product';
import { NotificationService } from '../notification.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart-container',
  templateUrl: './cart-container.component.html',
  styleUrls: ['./cart-container.component.scss'],
})
export class CartContainerComponent implements OnInit {
  products: Array<Product>;
  totalPrice: number;
  email: string;

  constructor(
    private cartService: CartService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.products = this.cartService.getCartInventory();
    this.totalPriceOfProducts();
    this.authService.getUserCredentials().then((credentials) => {
      this.email = credentials.email;
    });
  }

  onQuantityChange(change: Array<any>) {
    const objIndex = this.products.findIndex(
      (product: Product) => product.id === change[1].id
    );
    if (change[0] === 1) {
      this.products[objIndex].quantity = this.products[objIndex].quantity + 1;
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
        this.totalPriceOfProducts();
      }
    }
  }

  deleteFromCart(product: Product): void {
    this.cartService.deleteItemFromCart(product);
    this.products = this.cartService.getCartInventory();
    this.totalPriceOfProducts();
  }

  totalPriceOfProducts(): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  payForProducts(): void {
    this.cartService.payProducts(this.products, this.email);
    this.products = this.cartService.getCartInventory();
    this.totalPriceOfProducts();
  }
}
