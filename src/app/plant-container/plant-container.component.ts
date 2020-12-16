import { Component, OnInit } from '@angular/core';
import { PlantService } from '../plant.service';
import { CartService } from '../cart.service';
import { Cart } from '../cart';

@Component({
  selector: 'app-plant-container',
  templateUrl: './plant-container.component.html',
  styleUrls: ['./plant-container.component.scss'],
})
export class PlantContainerComponent implements OnInit {
  plants: Array<Cart>;
  chosenPlant: Cart;
  products: Array<Cart>;

  constructor(
    private plantService: PlantService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.plants = this.plantService.getPlants();
  }

  onPlantChange(plant: Cart): void {
    this.plantService.setSelectedPlant(plant);
    this.plantService.getSelectedPlant().subscribe((plant) => {
      this.chosenPlant = plant;
    });
  }

  onQuantityChange(change: Array<number>) {
    const objIndex = this.plants.findIndex(
      (plant: Cart) => plant.id === change[1]
    );
    if (change[0] === 1) {
      this.plants[objIndex].quantity = this.plants[objIndex].quantity + 1;
    } else {
      /* istanbul ignore if  */
      if (this.plants[objIndex].quantity <= 1) {
        alert('kan niet minder dan 1');
      } else {
        this.plants[objIndex].quantity = this.plants[objIndex].quantity - 1;
      }
    }
  }

  productToCart(product: Cart) {
    this.cartService.addItemToCart(product);
  }

  onSortChange(how: string): void {
    this.plantService.switchProductSorting(how);
  }
}
