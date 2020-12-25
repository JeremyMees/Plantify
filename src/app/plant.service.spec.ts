import { TestBed } from '@angular/core/testing';
import { PlantService } from './plant.service';
import { PLANTS } from './mock-plants';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { FirebaseService } from './firebase.service';
import { Observable, of } from 'rxjs';

describe('PlantService', () => {
  let service: PlantService;
  let fakeService: jasmine.SpyObj<NgbModal>;
  let fakeFirebaseService: jasmine.SpyObj<FirebaseService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FirebaseService,
          useValue: jasmine.createSpyObj('FirebaseService', [
            'getProductsFromDB',
            'boughtProductsToDb',
            'getBoughtProducts',
            'addNewProductTooDB',
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
    fakeFirebaseService.getProductsFromDB.and.returnValue(of(PLANTS));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get plants', () => {
    service.getPlants().subscribe((value) => {
      expect(value).toEqual(PLANTS);
    });
  });

  it('should get the slected plant', () => {
    const mockPlant = {
      id: 1,
      latinName: 'Monstera Deliciosa',
      name: 'Alfredo',
      price: 28.69,
      quantity: 1,
    };
    service.setSelectedPlant(mockPlant);
    service.getSelectedPlant().subscribe((result) => {
      expect(result).toEqual(mockPlant);
    });
  });

  it('should get the plant by id', () => {
    service.getPlantById(PLANTS[1].id).subscribe((plant) => {
      expect(plant).toEqual(PLANTS[1]);
    });
  });

  describe('switchProductSorting', () => {
    it('should alert high', () => {
      spyOn(window, 'alert');
      service.switchProductSorting('high');
      expect(window.alert).toHaveBeenCalledWith('high');
    });

    it('should alert low', () => {
      spyOn(window, 'alert');
      service.switchProductSorting('low');
      expect(window.alert).toHaveBeenCalledWith('low');
    });

    it('should alert new', () => {
      spyOn(window, 'alert');
      service.switchProductSorting('new');
      expect(window.alert).toHaveBeenCalledWith('new');
    });
  });

  it('should trigger the service too open the modal', () => {
    service.openModal();
    expect(fakeService.open).toHaveBeenCalledWith(ModalContainerComponent, {
      centered: true,
    });
  });

  /*it('should trigger the service too close the modal', (done: DoneFn) => {
    service.openModal();
    spyOn(service.modalRef, 'close');
    service.closeModal();
    expect(service.modalRef.close).toHaveBeenCalled();
  });*/
});
