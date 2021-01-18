import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartInventory: Array<Product> = [];
  totalPriceArray: Array<number> = [];
  totalPrice: number;
  constructor(private firebaseService: FirebaseService) {}

  addItemToCart(plant: Product): void {
    let orderderdPlant: Product = {
      id: plant.id,
      latinName: plant.latinName,
      name: plant.name,
      price: plant.price,
      quantity: plant.quantity,
      image: plant.image,
    };
    this.cartInventory.push(orderderdPlant);
    this.getTotalPrice();
  }

  deleteItemFromCart(product: Product): void {
    const index = this.cartInventory.indexOf(product);
    /* istanbul ignore else  */
    if (index > -1) {
      this.cartInventory.splice(index, 1);
    }
    this.getTotalPrice();
  }

  getCartInventory(): Array<Product> {
    this.getTotalPrice();
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

  payProducts(productsArray: Array<Product>): void {
    this.firebaseService.boughtProductsToDb(productsArray);
    this.cartInventory = [];
    alert('shoppingcart is getting emptied now');
  }

  roundTo(num: number, places: number): number {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  }
}
