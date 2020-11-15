import { Injectable } from '@angular/core';
import { Plants } from './plants';
import { Observable, of } from 'rxjs';
import { PLANTS} from './mock-plants';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  choosenPlant: Plants;

  getPlants(): Observable<Array<Plants>> {
    return of(PLANTS);
  }

  setSelectedPlant(plant: Plants):void{
    this.choosenPlant = plant;
  }

  getSelectedPlant(): Observable<Plants>{
      return of (this.choosenPlant)
  }
}
