import { Component, Input, Output, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Product } from '../product';
import { Stripe } from '../stripe';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss'],
})
export class ShoppingcartComponent implements OnInit {
  @Input() products: Array<Product>;
  @Input() totalPrice: number;
  @Output() quantityChanged = new EventEmitter<Array<any>>();
  @Output() deleteItemFromCart = new EventEmitter<Product>();
  @Output() productsToPay = new EventEmitter();
  stripeArray: Array<Stripe>;

  ngOnInit(): void {
    this.makeArrayStripe();
  }

  makeArrayStripe(): void {
    this.stripeArray = [];
    this.products.forEach((product) => {
      this.stripeArray.push({
        price: product.stripe,
        quantity: product.quantity,
      });
    });
  }

  inc(product: Product): void {
    this.changeQuantity([1, product]);
    this.makeArrayStripe();
  }

  dec(product: Product): void {
    this.changeQuantity([0, product]);
    this.makeArrayStripe();
  }

  changeQuantity(change: Array<any>): void {
    this.quantityChanged.emit(change);
  }

  deleteFromCart(plant: Product): void {
    this.deleteItemFromCart.emit(plant);
  }

  pay(): void {
    this.productsToPay.emit(this.stripeArray);
  }
}
