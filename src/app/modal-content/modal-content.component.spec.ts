import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantService } from '../plant.service';
import { ModalContentComponent } from './modal-content.component';

describe('ModalContentComponent', () => {
  let component: ModalContentComponent;
  let fixture: ComponentFixture<ModalContentComponent>;
  let fakeService: jasmine.SpyObj<PlantService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalContentComponent],
      providers: [
        {
          provide: PlantService,
          useValue: jasmine.createSpyObj('PlantService', [
            'setSelectedPlant',
            'getSelectedPlant',
            'getPlants',
            'getPlantById',
            'switchProductSorting',
            'openModal',
            'closeModal',
          ]),
        },
      ],
    }).compileComponents();
    fakeService = TestBed.inject(PlantService) as jasmine.SpyObj<PlantService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the plantservice too close the modal', () => {
    spyOn(component.redirectProductlist, 'emit');
    component.closeActiveModal();
    expect(component.redirectProductlist.emit).toHaveBeenCalled();
    expect(fakeService.closeModal).toHaveBeenCalled();
  });

  it('should redirect too shoppingcart and close modal', () => {
    spyOn(component.redirectShoppingCart, 'emit');
    component.redirectTooShoppingcart();
    expect(component.redirectShoppingCart.emit).toHaveBeenCalled();
    expect(fakeService.closeModal).toHaveBeenCalled();
  });
});
