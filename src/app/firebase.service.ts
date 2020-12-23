import { Injectable } from '@angular/core';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  boughtProducts: Array<Cart>;
  constructor() {}

  boughtProductsToDb(productsArray: Array<Cart>): void {
    this.boughtProducts = productsArray;
  }

  getBoughtProducts(): Array<Cart> {
    return this.boughtProducts;
  }

  addNewProductTooDB(newProductArray: Array<any>): void {
    alert(newProductArray);
  }
}
