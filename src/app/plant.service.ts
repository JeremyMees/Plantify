import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { FirebaseService } from './firebase.service';
import { Product } from './product';
import { tap } from 'rxjs/internal/operators/tap';

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
    return this.firebaseService.getProductsFromDB().pipe(
      tap((value) => {
        console.log(value);
        console.log([...value]);

        this.plants = value;
      })
    );
  }

  setSelectedPlant(plant: Product): void {
    this.chosenPlant = plant;
  }

  getSelectedPlant(): Observable<Product> {
    return of(this.chosenPlant);
  }

  getPlantById(id: number): Observable<Product> {
    let plant = this.plants.find((obj) => obj.id === id);
    return of(plant);
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
