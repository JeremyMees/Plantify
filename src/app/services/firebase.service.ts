import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationService } from './notification.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  boughtProducts: Array<Product>;
  totalOfItems: number;
  productId: string;
  productsArray: Array<Product>;
  idArray: Array<string>;
  url: Observable<string>;

  constructor(
    private router: Router,
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
      .valueChanges();
  }

  getIdFromProductByName(name: string): Observable<any> {
    return this.firestore
      .collection('products', (ref) => ref.where('name', '==', name))
      .valueChanges();
  }

  boughtProductsToDb(productsArray: Array<Product>, email: string): void {
    productsArray.forEach((product) => {
      const data = {
        email: email,
        latinName: product.latinName,
        name: product.name,
        price: Number(product.price),
        description: product.description,
        image: product.image,
        id: product.id,
        quantity: product.quantity,
        bought_at: new Date(),
      };
      this.firestore.collection('bought').add(data);
    });
  }

  getBoughtProducts(email: string): any {
    return this.firestore
      .collection('bought', (ref) => ref.where('email', '==', email).limit(4))
      .get();
  }

  addNewProductToDB(newProductArray: Array<Product>): void {
    this.uploadImage(newProductArray[1], newProductArray[3]);
    const imagePath = `products/${newProductArray[1]}.png`;
    this.getProductsFromDB();
    const newProduct = {
      latinName: newProductArray[0],
      name: newProductArray[1],
      price: Number(newProductArray[2]),
      description: newProductArray[4],
      image: imagePath,
      id: this.totalOfItems + 1,
      quantity: 1,
      created_at: new Date(),
    };
    this.firestore.collection('products').add(newProduct);
  }

  uploadImage(imageName: any, image: any): void {
    const filePath = `/products/${imageName}.png`;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, image.files[0]);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.updateImageUrl(url, imageName);
          });
        })
      )
      .subscribe();
  }

  updateImageUrl(url: string, name: string): void {
    this.getIdFromProductByName(name).subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.firestore.collection('products').doc(doc.id).update({
          image: url,
        });
      });
    });
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
    this.uploadImage(updateProduct[1], updateProduct[3]);
    this.firestore.collection('products').doc(id).update({
      latinName: updateProduct[0],
      name: updateProduct[1],
      price: updateProduct[2],
      image: 'foo',
      description: updateProduct[4],
    });
  }

  searchProductByName(name: string): void {
    name.toLowerCase;
    const uppercaseName = name.charAt(0).toUpperCase() + name.slice(1);
    this.firestore
      .collection('products', (ref) => ref.where('name', '==', uppercaseName))
      .valueChanges()
      .subscribe((plant: Array<Product>) => {
        if (plant) {
          this.router.navigateByUrl(`/product-list/${plant[0].id}`);
        }
      });
  }

  getProductsHighAll(): Observable<any> {
    return this.firestore
      .collection('products', (ref) => ref.orderBy('price', 'desc'))
      .valueChanges();
  }

  getProductsLowAll(): Observable<any> {
    return this.firestore
      .collection('products', (ref) => ref.orderBy('price', 'asc'))
      .valueChanges();
  }

  getProductsNewAll(): Observable<any> {
    return this.firestore
      .collection('products', (ref) => ref.orderBy('created_at', 'desc'))
      .valueChanges();
  }

  getProductsNewFour(): Observable<any> {
    return this.firestore
      .collection('products', (ref) =>
        ref.orderBy('created_at', 'desc').limit(4)
      )
      .valueChanges();
  }
}
