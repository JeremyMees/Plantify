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
  @Output() plantClick = new EventEmitter<Cart>();

  onSelect(plant: Cart): void {
    this.plantClick.emit(plant);
  }
}
