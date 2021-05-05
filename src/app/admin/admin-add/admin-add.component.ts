import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss'],
})
export class AdminAddComponent {
  @Output() newProduct = new EventEmitter<Array<any>>();
  constructor() {}

  addProduct(
    latinName: string,
    name: string,
    price: number,
    image: any,
    description: string
  ): void {
    this.newProduct.emit([latinName, name, price, image, description]);
  }
}
