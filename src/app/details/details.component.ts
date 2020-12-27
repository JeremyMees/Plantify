import { Component, Input, Output } from '@angular/core';
import { Cart } from '../cart';
import { EventEmitter } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  @Input() plant: Cart;
  @Input() color: string;
  @Output() quantityChanged = new EventEmitter<Array<number>>();
  @Output() productToCart = new EventEmitter<Cart>();
  @Output() redirectToProductList = new EventEmitter<void>();

  quantityUp(plant: Cart): void {
    this.quantityChanged.emit([1, plant.id]);
  }

  quantityDown(plant: Cart): void {
    this.quantityChanged.emit([0, plant.id]);
  }

  addProductToCart(plant: Cart): void {
    this.productToCart.emit(plant);
  }

  backToProductList(): void {
    this.redirectToProductList.emit();
  }
}
