import { Component, Input, Output } from '@angular/core';
import { Cart } from '../cart';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss'],
})
export class ShoppingcartComponent {
  @Input() products: Array<Cart>;
  @Input() totalPrice: number;
  @Output() quantityChanged = new EventEmitter<Array<any>>();
  @Output() deleteItemFromCart = new EventEmitter<Cart>();
  @Output() productsToPay = new EventEmitter();

  inc(product: Cart): void {
    this.changeQuantity([1, product]);
  }

  dec(product: Cart): void {
    this.changeQuantity([0, product]);
  }

  changeQuantity(change: Array<any>): void {
    this.quantityChanged.emit(change);
  }

  deleteFromCart(plant: Cart): void {
    this.deleteItemFromCart.emit(plant);
  }

  pay(): void {
    this.productsToPay.emit();
  }
}
