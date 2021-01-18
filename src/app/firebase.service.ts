import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  boughtProducts: Array<Product>;
  totalOfItems: number;
  productId: string;
  constructor(private firestore: AngularFirestore) {}

  getProductsFromDB(): Observable<Array<Product>> {
    let productsArray = [];
    this.firestore
      .collection('products')
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          productsArray.push(doc.data());
        });
        this.totalOfItems = Math.max(...productsArray.map(({ id }) => id));
      });
    return of(productsArray);
  }

  boughtProductsToDb(productsArray: Array<Product>): void {
    this.boughtProducts = productsArray;
  }

  getBoughtProducts(): Array<Product> {
    return this.boughtProducts;
  }

  addNewProductToDB(newProductArray: Array<Product>): void {
    this.getProductsFromDB();
    const newProduct = {
      latinName: newProductArray[0],
      name: newProductArray[1],
      price: newProductArray[2],
      image: newProductArray[3],
      id: this.totalOfItems + 1,
      quantity: 1,
    };
    this.firestore.collection('products').add(newProduct);
  }

  deleteProductfromDB(id: number): void {
    this.firestore
      .collection('products', (ref) => ref.where('id', '==', id))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.firestore.collection('products').doc(`${doc.id}`).delete();
          alert('Product deleted successfully');
        });
      });
  }

  updateProductfromDB(updateProduct: Array<any>): void {
    alert(updateProduct);
  }

  searchProductByName(string: string): void {
    alert(string);
  }
}
