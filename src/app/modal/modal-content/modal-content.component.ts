import { Component, EventEmitter, Output } from '@angular/core';
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent {
  @Output() redirectShoppingCart = new EventEmitter<void>();
  @Output() redirectProductlist = new EventEmitter<void>();
  constructor(private plantService: PlantService) {}

  closeActiveModal(): void {
    this.redirectProductlist.emit();
    this.plantService.closeModal();
  }

  redirectToShoppingcart(): void {
    this.redirectShoppingCart.emit();
    this.plantService.closeModal();
  }
}
