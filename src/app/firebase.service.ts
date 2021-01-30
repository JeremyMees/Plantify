import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationService } from './notification.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  boughtProducts: Array<Product>;
  totalOfItems: number;
  productId: string;
  productsArray: Array<Product>;
  idArray: Array<string>;

  constructor(
    private firestore: AngularFirestore,
    private notificationService: NotificationService,
    private afStorage: AngularFireStorage
  ) {}

  getProductsFromDB(): Observable<Array<Array<Product> | Array<string>>> {
    let productsArray = [];
    let idArray = [];
    this.firestore
      .collection('products')
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          productsArray.push(doc.data());
          idArray.push(doc.id);
        });
        this.totalOfItems = Math.max(...productsArray.map(({ id }) => id));
        this.productsArray = productsArray;
      });
    return of([productsArray, idArray]);
  }

  getProductfromDBByID(id: number): Observable<any> {
    return this.firestore
      .collection('products', (ref) => ref.where('id', '==', id))
      .get();
  }

  boughtProductsToDb(productsArray: Array<Product>): void {
    this.boughtProducts = productsArray;
  }

  getBoughtProducts(): Array<Product> {
    return this.boughtProducts;
  }

  addNewProductToDB(newProductArray: Array<Product>): void {
    this.uploadImage(newProductArray[1], newProductArray[3]);
    const imagePath = `products/${newProductArray[1]}.png`;
    this.getProductsFromDB();
    const newProduct = {
      latinName: newProductArray[0],
      name: newProductArray[1],
      price: newProductArray[2],
      image: imagePath,
      id: this.totalOfItems + 1,
      quantity: 1,
    };
    this.firestore.collection('products').add(newProduct);
  }

  uploadImage(imageName: any, image: any) {
    this.afStorage.upload(`/products/${imageName}.png`, image.files[0]);
  }

  deleteProductfromDB(id: number): void {
    this.firestore
      .collection('products', (ref) => ref.where('id', '==', id))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.firestore.collection('products').doc(`${doc.id}`).delete();
          this.notificationService.setNotification(
            'Product was deleted successfully',
            'bottom',
            2,
            'Timer'
          );
        });
      });
  }

  updateProductfromDB(updateProduct: Array<Product>, id: string): void {
    this.firestore.collection('products').doc(id).update({
      latinName: updateProduct[0],
      name: updateProduct[1],
      price: updateProduct[2],
      image: updateProduct[3],
    });
  }

  searchProductByName(string: string): void {
    alert(string);
  }
}
