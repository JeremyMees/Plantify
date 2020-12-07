import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlantContainerComponent } from './plant-container.component';
import { PlantService } from '../plant.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { PLANTS } from '../mock-plants';
import { CartService } from '../cart.service';

describe('PlantContainerComponent', () => {
  let component: PlantContainerComponent;
  let fixture: ComponentFixture<PlantContainerComponent>;
  let fakeService: jasmine.SpyObj<PlantService>;
  let fakeCartService: jasmine.SpyObj<CartService>;
  const mockPlant = {
    id: 1,
    latinName: 'Monstera Deliciosa',
    name: 'Alfredo',
    price: 28.69,
    quantity: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantContainerComponent],
      providers: [
        {
          provide: PlantService,
          useValue: jasmine.createSpyObj('PlantService', [
            'setSelectedPlant',
            'getSelectedPlant',
            'getPlants',
            'onPlantChange',
          ]),
        },
        {
          provide: CartService,
          useValue: jasmine.createSpyObj('CartService', ['addItemToCart']),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fakeService = TestBed.inject(PlantService) as jasmine.SpyObj<PlantService>;
    fakeCartService = TestBed.inject(
      CartService
    ) as jasmine.SpyObj<CartService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantContainerComponent);
    component = fixture.componentInstance;
    fakeService.getPlants.and.returnValue(PLANTS);
    fakeService.getSelectedPlant.and.returnValue(of(PLANTS[1]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should bind PLANTS`, () => {
    expect(component.plants).toEqual(PLANTS);
  });

  describe('given no plant is selected', () => {
    it('should not show details', () => {
      const plantDetail = fixture.debugElement.query(By.css('app-details'));
      expect(plantDetail).toBeNull();
    });

    it('should show the list', () => {
      const plantList = fixture.debugElement.query(By.css('app-list'));
      expect(plantList.properties.plants).toEqual(PLANTS);
    });
  });

  it('should call the function onPlantChange()', () => {
    component.onPlantChange(PLANTS[1]);
    expect(fakeService.setSelectedPlant).toHaveBeenCalledWith(PLANTS[1]);
    expect(component.chosenPlant).toEqual(PLANTS[1]);
  });

  it('should call cartService.additemToCart()', () => {
    component.productToCart(PLANTS[1]);
    expect(fakeCartService.addItemToCart).toHaveBeenCalledWith(PLANTS[1]);
  });

  describe('when onQuantityChange() is called', () => {
    it('should increment quantity', () => {
      component.plants = [mockPlant];
      component.onQuantityChange([1, mockPlant.id]);
      expect(component.plants[0].quantity).toEqual(2);
    });

    it('should not decrement quantity because cant go lower than zero', () => {
      component.plants = [mockPlant];
      component.onQuantityChange([0, mockPlant.id]);
      expect(component.plants[0].quantity).toEqual(1);
    });

    it('should decrement quantity', () => {
      component.products = [PLANTS[0], PLANTS[1], PLANTS[2]];
      component.onQuantityChange([1, mockPlant.id]);
      component.onQuantityChange([0, mockPlant.id]);
      expect(component.plants[0].quantity).toEqual(1);
    });
  });
});
