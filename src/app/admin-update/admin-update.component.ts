import { Component, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.scss'],
})
export class AdminUpdateComponent {
  @Input() choosenProduct: Product;
  @Output() updateClick = new EventEmitter<any>();
  constructor() {}

  updateProduct(
    latinName: string,
    name: string,
    price: number,
    image: string
  ): void {
    this.updateClick.emit([latinName, name, price, image]);
  }
}
