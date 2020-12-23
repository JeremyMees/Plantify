import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss'],
})
export class AdminContainerComponent {
  constructor(private firebaseService: FirebaseService) {}

  addNewProduct(newProductArray: Array<any>): void {
    this.firebaseService.addNewProductTooDB(newProductArray);
  }
}
