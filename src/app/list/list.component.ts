import { Component, Input,Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { PLANTS} from '../mock-plants';
import { Plants } from '../plants';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent {
  plants = PLANTS;
  
  @Output() plantClick = new EventEmitter<Plants>();


  onSelect(plant: Plants): void {
    alert(`latin name : ${plant.latinName} name : ${plant.name} price : ${plant.price}`);
  }
}

