import { Injectable } from '@angular/core';
import { Cart } from './cart';
import { Observable, of } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  chosenPlant: Cart;
  modalRef: NgbModalRef;
  plants: Array<Cart>;
  constructor(
    private modalService: NgbModal,
    private firebaseService: FirebaseService
  ) {}

  getPlants(): Observable<Array<Cart>> {
    this.firebaseService.getProductsFromDB().subscribe((data) => {
      this.plants = data;
    });
    return of(this.plants);
  }

  setSelectedPlant(plant: Cart): void {
    this.chosenPlant = plant;
  }

  getSelectedPlant(): Observable<Cart> {
    return of(this.chosenPlant);
  }

  getPlantById(id: number): Observable<Cart> {
    this.getPlants();
    const plant = this.plants.find((p) => p.id === id);
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
    /* istanbul ignore next*/
    this.modalRef.close();
  }
}
