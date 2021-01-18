import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent {
  @Input() plants: Array<Product>;
  @Output() deleteClick = new EventEmitter<Product>();
  @Output() editClick = new EventEmitter<Product>();

  selectForDelete(plant: Product): void {
    this.deleteClick.emit(plant);
  }

  selectForUpdate(plant: Product): void {
    this.editClick.emit(plant);
  }
}
