import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { Product } from '../product';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss'],
})
export class AdminContainerComponent implements OnInit {
  plants: Array<Product>;
  ids: Array<string>;
  choosenProduct: Product;
  choosenProductID: string;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getProductsFromDB().subscribe((value: Array<any>) => {
      this.plants = value[0];
      this.ids = value[1];
    });
  }

  addNewProduct(newProductArray: Array<Product>): void {
    this.firebaseService.addNewProductToDB(newProductArray);
  }

  deleteProduct(plant: Product): void {
    this.firebaseService.deleteProductfromDB(plant.id);
  }

  updateProduct(updateArray: Array<Product>): void {
    this.firebaseService.updateProductfromDB(
      updateArray,
      this.choosenProductID
    );
  }

  productToUpdate(product: Product): void {
    this.choosenProduct = product;
    const arrIndex = this.plants.findIndex(
      (plant: Product) => plant === product
    );
    this.choosenProductID = this.ids[arrIndex];
  }
}
