import { Injectable } from '@angular/core';
import { Cart } from './cart';
import { Observable, of } from 'rxjs';
import { PLANTS } from './mock-plants';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  chosenPlant: Cart;

  getPlants(): Array<Cart> {
    return PLANTS;
  }

  setSelectedPlant(plant: Cart): void {
    this.chosenPlant = plant;
  }

  getSelectedPlant(): Observable<Cart> {
    return of(this.chosenPlant);
  }

  switchProductSorting(how: string) {
    const products: Array<Cart> = this.getPlants();
    if (how === 'high') {
      alert('high');
    } else if (how === 'low') {
      alert('low');
    } else alert('new');
  }
}
