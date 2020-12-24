import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Cart } from '../cart';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent {
  @Input() plants: Array<Cart>;
  @Output() deleteClick = new EventEmitter<Cart>();

  selectForDelete(plant: Cart): void {
    this.deleteClick.emit(plant);
  }
}
