import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { PlantService } from '../plant.service';
import { Plants } from '../plants';

@Component({
  selector: 'app-plant-container',
  templateUrl: './plant-container.component.html',
  styleUrls: ['./plant-container.component.scss']
})
export class PlantContainerComponent implements OnInit{
  plants: Array<Plants>;
  choosenPlant: Plants;
  
  constructor(
    private plantService: PlantService
  ) {}

  ngOnInit(){ 
    this.plants = this.plantService.getPlants();
  }

  onPlantChange(plant:Plants): void {
    this.plantService.setSelectedPlant(plant);
    this.getSelectedPlant()
  }

  getSelectedPlant(): void {
    this.plantService.getSelectedPlant().subscribe((plant)=>{
      this.choosenPlant = plant
    })
  }
}
