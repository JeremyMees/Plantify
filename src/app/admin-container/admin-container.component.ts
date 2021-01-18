import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Product } from '../product';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss'],
})
export class AdminContainerComponent implements OnInit {
  plants: Array<Product>;
  choosenProduct: Product;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getProductsFromDB().subscribe((value: Array<any>) => {
      this.plants = value;
    });
  }

  addNewProduct(newProductArray: Array<Product>): void {
    this.firebaseService.addNewProductToDB(newProductArray);
  }

  deleteProduct(plant: any): void {
    this.firebaseService.deleteProductfromDB(plant.id);
  }

  updateProduct(updateArray: Array<any>): void {
    this.firebaseService.updateProductfromDB(updateArray);
  }

  productToUpdate(product: Product): void {
    this.choosenProduct = product;
  }
}
