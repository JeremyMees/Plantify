import { Component, EventEmitter, Output } from '@angular/core';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent {
  @Output() redirect = new EventEmitter<void>();
  constructor(private plantService: PlantService) {}

  closeActiveModal(): void {
    this.plantService.closeModal();
  }

  redirectTooShoppingcart(): void {
    this.redirect.emit();
    this.plantService.closeModal();
  }
}
