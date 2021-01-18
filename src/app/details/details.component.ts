import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Product } from '../product';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  @Input() plant: Product;
  @Input() color: string;
  @Output() quantityChanged = new EventEmitter<Array<number>>();
  @Output() productToCart = new EventEmitter<Product>();
  @Output() redirectToProductList = new EventEmitter<void>();

  quantityUp(plant: Product): void {
    this.quantityChanged.emit([1, plant.id]);
    console.log('details', plant.quantity);
  }

  quantityDown(plant: Product): void {
    this.quantityChanged.emit([0, plant.id]);
  }

  addProductToCart(plant: Product): void {
    this.productToCart.emit(plant);
  }

  backToProductList(): void {
    this.redirectToProductList.emit();
  }
}
