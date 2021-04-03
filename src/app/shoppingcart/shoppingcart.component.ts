import { Component, Input, Output, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Product } from '../product';
import { Stripe } from '../stripe';
import { NotificationService } from '../notification.service';

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
  @Input() colorName: string;
  @Input() colorFrontname: string;
  @Input() colorStreetname: string;
  @Input() colorHousenumber: string;
  @Input() colorZipcode: string;
  @Input() colorCity: string;
  @Input() colorEmail: string;
  @Input() colorNumber: string;

  constructor(private notificationService: NotificationService) {}

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

  pay(userInformation: Array<string>): void {
    userInformation.includes('')
      ? this.notificationService.setNotification(
          'Please fill the form correct',
          'top',
          3,
          'Timer'
        )
      : this.productsToPay.emit(this.stripeArray);
  }

  checkName(event: any): void {
    event.target.value.length >= 3
      ? (this.colorName = 'green')
      : (this.colorName = 'red');
  }

  checkFrontname(event: any): void {
    event.target.value.length >= 3
      ? (this.colorFrontname = 'green')
      : (this.colorFrontname = 'red');
  }

  checkStreetname(event: any): void {
    event.target.value.length >= 6
      ? (this.colorStreetname = 'green')
      : (this.colorStreetname = 'red');
  }

  checkHousenumber(event: any): void {
    event.target.value.length >= 1
      ? (this.colorHousenumber = 'green')
      : (this.colorHousenumber = 'red');
  }

  checkZipcode(event: any): void {
    event.target.value.length >= 4
      ? (this.colorZipcode = 'green')
      : (this.colorZipcode = 'red');
  }

  checkCity(event: any): void {
    event.target.value.length >= 4
      ? (this.colorCity = 'green')
      : (this.colorCity = 'red');
  }

  checkEmail(event: any): void {
    const emailRegex: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    emailRegex.test(event.target.value)
      ? (this.colorEmail = 'green')
      : (this.colorEmail = 'red');
  }

  checkNumber(event: any): void {
    console.log(event.value);
    event.target.value.length == 10
      ? (this.colorNumber = 'green')
      : (this.colorNumber = 'red');
  }
}
