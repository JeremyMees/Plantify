import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart-container',
  templateUrl: './cart-container.component.html',
  styleUrls: ['./cart-container.component.scss'],
})
export class CartContainerComponent implements OnInit {
  products: Array<Product>;
  totalPrice: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.products = this.cartService.getCartInventory();
    this.totalPriceOfProducts();
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
        alert('kan niet minder dan 1');
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
    this.cartService.payProducts(this.products);
    this.products = this.cartService.getCartInventory();
    this.totalPriceOfProducts();
  }
}
