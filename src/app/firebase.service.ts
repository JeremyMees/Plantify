import { Injectable } from '@angular/core';
import { Cart } from './cart';
import { Product } from './product';
import { PLANTS } from './mock-plants';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  boughtProducts: Array<Cart>;
  constructor(private firestore: AngularFirestore) {}

  getProductsFromDB(): Observable<Array<Cart>> {
    return of(PLANTS);
  }

  boughtProductsToDb(productsArray: Array<Cart>): void {
    this.boughtProducts = productsArray;
  }

  getBoughtProducts(): Array<Cart> {
    return this.boughtProducts;
  }

  addNewProductToDB(newProductArray: Array<any>): void {
    const newProduct = {
      latinName: newProductArray[0],
      name: newProductArray[1],
      price: newProductArray[2],
      image: newProductArray[3],
    };
    this.firestore.collection('products').add(newProduct);
  }

  deleteProductfromDB(plant: Cart): void {
    alert(plant);
  }

  updateProductfromDB(updateProduct: Array<any>): void {
    alert(updateProduct);
  }

  searchProductByName(string: string): void {
    alert(string);
  }
}
