import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantService } from '../plant.service';
import { ModalContentComponent } from './modal-content.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('ModalContentComponent', () => {
  let component: ModalContentComponent;
  let fixture: ComponentFixture<ModalContentComponent>;
  let fakeService: jasmine.SpyObj<PlantService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalContentComponent],
      imports: [TranslateModule.forRoot()],
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  it('should call the plantservice to close the modal', () => {
    spyOn(component.redirectProductlist, 'emit');
    component.closeActiveModal();
    expect(component.redirectProductlist.emit).toHaveBeenCalled();
    expect(fakeService.closeModal).toHaveBeenCalled();
  });

  it('should redirect to shoppingcart and close modal', () => {
    spyOn(component.redirectShoppingCart, 'emit');
    component.redirectToShoppingcart();
    expect(component.redirectShoppingCart.emit).toHaveBeenCalled();
    expect(fakeService.closeModal).toHaveBeenCalled();
  });
});
