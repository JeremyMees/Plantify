import { TestBed } from '@angular/core/testing';
import { PlantService } from './plant.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { FirebaseService } from './firebase.service';
import { Observable, of } from 'rxjs';
import { Product } from './product';

describe('PlantService', () => {
  let service: PlantService;
  let fakeService: jasmine.SpyObj<NgbModal>;
  let fakeFirebaseService: jasmine.SpyObj<FirebaseService>;
  const mockPlant: Product = {
    id: 1,
    latinName: 'Monstera Deliciosa',
    name: 'Alfredo',
    price: 28.69,
    quantity: 1,
    image: 'images',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FirebaseService,
          useValue: jasmine.createSpyObj('FirebaseService', [
            'getProductsFromDB',
            'boughtProductsToDb',
            'getBoughtProducts',
            'addNewProductToDB',
            'deleteProductfromDB',
          ]),
        },
        {
          provide: NgbModal,
          useValue: jasmine.createSpyObj('NgbModal', ['open', 'close']),
        },
      ],
    });
    service = TestBed.inject(PlantService);
    fakeService = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
    fakeFirebaseService = TestBed.inject(
      FirebaseService
    ) as jasmine.SpyObj<FirebaseService>;
    fakeFirebaseService.getProductsFromDB.and.returnValue(
      of([[mockPlant], ['stubID']])
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get plants', () => {
    service.getPlants().subscribe((value) => {
      expect(value).toEqual([[mockPlant], ['stubID']]);
    });
  });

  it('should get the slected plant', () => {
    service.setSelectedPlant(mockPlant);
    service.getSelectedPlant().subscribe((result) => {
      expect(result).toEqual(mockPlant);
    });
  });

  it('should trigger the service to open the modal', () => {
    service.openModal();
    expect(fakeService.open).toHaveBeenCalledWith(ModalContainerComponent, {
      centered: true,
    });
  });

  /*it('should trigger the service to close the modal', (done: DoneFn) => {
    service.openModal();
    spyOn(service.modalRef, 'close');
    service.closeModal();
    expect(service.modalRef.close).toHaveBeenCalled();
  });*/
});
