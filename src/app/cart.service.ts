import { Injectable } from '@angular/core';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartInventory: Array<Cart> = [];
  totalPriceArray: Array<number> = [];
  totalPrice: number;

  addItemToCart(plant: Cart): void {
    let orderderdPlant: Cart = {
      id: plant.id,
      latinName: plant.latinName,
      name: plant.name,
      price: plant.price,
      quantity: plant.quantity,
    };
    this.cartInventory.push(orderderdPlant);
    this.getTotalPrice();
  }

  deleteItemFromCart(product: Cart): void {
    const index = this.cartInventory.indexOf(product);
    /* istanbul ignore else  */
    if (index > -1) {
      this.cartInventory.splice(index, 1);
    }
    this.getTotalPrice();
  }

  getCartInventory(): Array<Cart> {
    this.getTotalPrice();
    return this.cartInventory;
  }

  getTotalPrice(): number {
    this.totalPrice = 0;
    this.totalPriceArray = [];
    console.log(this.cartInventory);
    this.cartInventory.forEach((product: Cart) => {
      this.totalPriceArray.push(product.price * product.quantity);
    });
    this.totalPriceArray.forEach((result: number) => {
      this.totalPrice += result;
    });
    return this.totalPrice;
  }

  payProducts(productsArray: Array<Cart>): void {
    this.cartInventory = [];
    alert('shoppingcart is getting emptied now');
  }
}
