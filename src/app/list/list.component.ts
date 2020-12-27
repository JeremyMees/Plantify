import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Cart } from '../cart';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() plants: Array<Cart>;
  @Input() color: string;
  @Output() plantClick = new EventEmitter<Cart>();
  @Output() sortProducts = new EventEmitter<string>();
  @Output() searchProduct = new EventEmitter<string>();

  onSelect(plant: Cart): void {
    this.plantClick.emit(plant);
  }

  sort(how: string): void {
    this.sortProducts.emit(how);
  }

  searchByString(string: string): void {
    this.searchProduct.emit(string);
  }
}
