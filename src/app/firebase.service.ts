import { Injectable } from '@angular/core';
import { Cart } from './cart';
import { PLANTS } from './mock-plants';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  boughtProducts: Array<Cart>;
  constructor() {}

  getProductsFromDB(): Observable<Array<Cart>> {
    return of(PLANTS);
  }

  boughtProductsToDb(productsArray: Array<Cart>): void {
    this.boughtProducts = productsArray;
  }

  getBoughtProducts(): Array<Cart> {
    return this.boughtProducts;
  }

  addNewProductTooDB(newProductArray: Array<any>): void {
    alert(newProductArray);
  }

  deleteProductfromDB(plant: Cart): void {
    alert(plant);
  }
}
