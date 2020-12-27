import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Cart } from '../cart';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss'],
})
export class AdminContainerComponent implements OnInit {
  plants: Array<Cart>;
  choosenProduct: Cart;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getProductsFromDB().subscribe((value: Array<Cart>) => {
      this.plants = value;
    });
  }

  addNewProduct(newProductArray: Array<any>): void {
    this.firebaseService.addNewProductToDB(newProductArray);
  }

  deleteProduct(plant: any): void {
    this.firebaseService.deleteProductfromDB(plant.name);
  }

  updateProduct(updateArray: Array<any>): void {
    this.firebaseService.updateProductfromDB(updateArray);
  }

  productToUpdate(product: Cart): void {
    this.choosenProduct = product;
  }
}
