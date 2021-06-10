import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Stripe } from '../models/stripe';
import { Product } from '../models/product';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductCookie } from '../models/productCookie';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartInventory: Array<Product> = [];
  cartInventoryIds: Array<ProductCookie> = [];
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
    if (this.cartInventory.find((obj) => obj.name == plant.name)) {
      const objIndex = this.cartInventory.findIndex(
        (product: Product) => product.id === plant.id
      );
      this.cartInventory[objIndex].quantity =
        this.cartInventory[objIndex].quantity + 1;
    } else {
      this.cartInventory.push(orderderdPlant);
    }
    this.cartInventoryIds = [];
    this.cartInventory.forEach((product) => {
      this.cartInventoryIds.push({
        id: product.id,
        quantity: product.quantity,
      });
    });
    const jsonInventory = JSON.stringify(this.cartInventoryIds);
    this.setCookie('cart', jsonInventory);
    this.getTotalPrice();
  }

  deleteItemFromCart(product: Product): void {
    const index = this.cartInventory.indexOf(product);
    this.cartInventory.splice(index, 1);
    const indexId = this.cartInventoryIds.indexOf(product);
    this.cartInventoryIds.splice(indexId, 1);
    let cartInventoryIdsSet = new Set(this.cartInventoryIds);
    const jsonInventory = JSON.stringify([...cartInventoryIdsSet]);
    this.setCookie('cart', jsonInventory);
    this.getTotalPrice();
  }

  getCartInventory(): Observable<Array<Product>> {
    this.getTotalPrice();
    if (!this.checkCookie('cart')) {
      this.setCookie('cart', '[]');
    }
    const cookie = JSON.parse(this.getCookie('cart'));
    let cookies: Array<Product> = cookie.map((cookie: ProductCookie) => {
      return this.firebaseService.getProductfromDBByID(cookie.id).pipe(
        map((result) => {
          result[0].quantity = cookie.quantity;
          return result[0];
        })
      );
    });
    return combineLatest(cookies).pipe(
      tap((result) => (this.cartInventory = result))
    );
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
