import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() plants: Array<Product>;
  @Output() plantClick = new EventEmitter<Product>();
  @Output() sortProducts = new EventEmitter<string>();
  @Output() searchProduct = new EventEmitter<string>();
  howSort: string = 'new';
  page = 1;
  pageSize = 8;

  onSelect(plant: Product): void {
    this.plantClick.emit(plant);
  }

  sort(how: string): void {
    this.howSort = how;
    this.sortProducts.emit(how);
  }

  searchByString(string: string): void {
    this.searchProduct.emit(string);
  }
}
