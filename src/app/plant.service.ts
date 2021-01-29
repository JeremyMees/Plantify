import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { FirebaseService } from './firebase.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  chosenPlant: Product;
  modalRef: NgbModalRef;
  plants: Array<Product>;
  constructor(
    private modalService: NgbModal,
    private firebaseService: FirebaseService
  ) {}

  getPlants(): Observable<Array<Product>> {
    return this.firebaseService.getProductsFromDB();
  }

  setSelectedPlant(plant: Product): void {
    this.chosenPlant = plant;
  }

  getSelectedPlant(): Observable<Product> {
    return of(this.chosenPlant);
  }

  switchProductSorting(how: string) {
    this.getPlants().subscribe((value) => {
      const products: Array<Product> = value;
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
