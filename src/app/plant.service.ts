import { Injectable } from '@angular/core';
import { Cart } from './cart';
import { Observable, of } from 'rxjs';
import { PLANTS } from './mock-plants';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalContainerComponent } from './modal-container/modal-container.component';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  chosenPlant: Cart;
  modalRef: NgbModalRef;
  constructor(private modalService: NgbModal) {}

  getPlants(): Observable<Array<Cart>> {
    return of(PLANTS);
  }

  setSelectedPlant(plant: Cart): void {
    this.chosenPlant = plant;
  }

  getSelectedPlant(): Observable<Cart> {
    return of(this.chosenPlant);
  }

  getPlantById(id: number): Observable<Cart> {
    const plant = PLANTS.find((p) => p.id === id);
    return of(plant);
  }

  switchProductSorting(how: string) {
    this.getPlants().subscribe((value) => {
      const products: Array<Cart> = value;
    });
    if (how === 'high') {
      alert('high');
    } else if (how === 'low') {
      alert('low');
    } else alert('new');
  }

  openModal(): void {
    this.modalRef = this.modalService.open(ModalContainerComponent, {
      centered: true,
    });
  }

  closeModal(): void {
    this.modalRef.close();
  }
}
