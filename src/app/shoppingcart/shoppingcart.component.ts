import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss'],
})
export class ShoppingcartComponent {
  @Input() products: Array<Product>;
  @Input() totalPrice: number;
  @Output() quantityChanged = new EventEmitter<Array<any>>();
  @Output() deleteItemFromCart = new EventEmitter<Product>();
  @Output() productsToPay = new EventEmitter();

  inc(product: Product): void {
    this.changeQuantity([1, product]);
  }

  dec(product: Product): void {
    this.changeQuantity([0, product]);
  }

  changeQuantity(change: Array<any>): void {
    this.quantityChanged.emit(change);
  }

  deleteFromCart(plant: Product): void {
    this.deleteItemFromCart.emit(plant);
  }

  pay(): void {
    this.productsToPay.emit();
  }
}
