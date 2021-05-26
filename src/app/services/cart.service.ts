import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Stripe } from '../models/stripe';
import { Product } from '../models/product';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartInventory: Array<Product> = [];
  totalPriceArray: Array<number> = [];
  totalPrice: number;
  stripePromise = loadStripe(environment.stripe_key);
  constructor(
    private firebaseService: FirebaseService,
    private cookieService: CookieService
  ) {}

  getCookie(name: string): string {
    return this.cookieService.get(name);
  }

  deleteCookie(name: string): void {
    this.cookieService.delete(name);
  }

  setCookie(name: string, value: any): void {
    this.cookieService.set(name, value);
  }

  checkCookie(name: string): boolean {
    return this.cookieService.check(name);
  }

  addItemToCart(plant: Product): void {
    let orderderdPlant: Product = {
      id: plant.id,
      latinName: plant.latinName,
      name: plant.name,
      price: plant.price,
      quantity: plant.quantity,
      image: plant.image,
      description: plant.description,
      stripe: plant.stripe,
    };
    this.cartInventory.push(orderderdPlant);
    const jsonInventory = JSON.stringify(this.cartInventory);
    this.setCookie('cart', jsonInventory);
    this.getTotalPrice();
  }

  deleteItemFromCart(product: Product): void {
    const index = this.cartInventory.indexOf(product);
    this.cartInventory.splice(index, 1);
    const jsonInventory = JSON.stringify(this.cartInventory);
    this.setCookie('cart', jsonInventory);
    this.getTotalPrice();
  }

  getCartInventory(): Array<Product> {
    this.getTotalPrice();
    const cookie: Array<Product> = JSON.parse(this.getCookie('cart'));
    this.cartInventory = cookie;
    return this.cartInventory;
  }

  getTotalPrice(): number {
    this.totalPrice = 0;
    this.totalPriceArray = [];
    this.cartInventory.forEach((product: Product) => {
      this.totalPriceArray.push(product.price * product.quantity);
    });
    this.totalPriceArray.forEach((result: number) => {
      this.totalPrice += result;
    });
    return this.roundTo(this.totalPrice, 2);
  }

  async payProducts(
    stripeArray: Array<Stripe>,
    productArray: Array<Product>,
    email: string
  ): Promise<void> {
    this.firebaseService.boughtProductsToDb(productArray, email);
    const stripe = await this.stripePromise;
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: stripeArray,
      successUrl: `${window.location.href}/payment-success`,
      cancelUrl: `${window.location.href}/payment-failure`,
    });
  }

  resetStripe() {
    this.cartInventory = [];
  }

  roundTo(num: number, places: number): number {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  }
}
