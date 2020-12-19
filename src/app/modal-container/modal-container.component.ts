import { Component } from '@angular/core';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
})
export class ModalContainerComponent {
  constructor(private plantService: PlantService) {}

  closeModal(): void {
    console.log('test container');
    this.plantService.closeModal();
  }
}
