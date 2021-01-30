import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss'],
})
export class AdminAddComponent {
  @Output() newProduct = new EventEmitter<Array<any>>();
  @Output() newImage = new EventEmitter<Event>();
  constructor() {}

  addProduct(latinName: string, name: string, price: number, image: any): void {
    this.newProduct.emit([latinName, name, price, image]);
  }
}
