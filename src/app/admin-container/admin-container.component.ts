import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { PlantService } from '../plant.service';
import { Cart } from '../cart';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss'],
})
export class AdminContainerComponent implements OnInit {
  @Input() plants: Array<Cart>;

  constructor(
    private firebaseService: FirebaseService,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {
    this.firebaseService.getProductsFromDB().subscribe((value: Array<Cart>) => {
      this.plants = value;
    });
  }

  addNewProduct(newProductArray: Array<any>): void {
    this.firebaseService.addNewProductTooDB(newProductArray);
  }

  deleteProduct(plant: any): void {
    this.firebaseService.deleteProductfromDB(plant.name);
  }
}
