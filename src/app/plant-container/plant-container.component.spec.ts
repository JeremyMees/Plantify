import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlantContainerComponent } from './plant-container.component';
import { PlantService } from '../plant.service';
import { of, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { By } from '@angular/platform-browser';
import { PLANTS } from '../mock-plants';
import { CartService } from '../cart.service';
import { FirebaseService } from '../firebase.service';

describe('PlantContainerComponent', () => {
  let component: PlantContainerComponent;
  let fixture: ComponentFixture<PlantContainerComponent>;
  let fakeService: jasmine.SpyObj<PlantService>;
  let fakeCartService: jasmine.SpyObj<CartService>;
  let fakeFirebaseService: jasmine.SpyObj<FirebaseService>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let router: Router;
  const params$ = new Subject<{ id?: string }>();
  const mockPlant = {
    id: 1,
    latinName: 'Monstera Deliciosa',
    name: 'Alfredo',
    price: 28.69,
    quantity: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [PlantContainerComponent],
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
        {
          provide: FirebaseService,
          useValue: jasmine.createSpyObj('FirebaseService', [
            'getProductsFromDB',
            'boughtProductsToDb',
            'getBoughtProducts',
            'addNewProductToDB',
            'deleteProductFromDB',
            'updateProductfromDB',
            'searchProductByName',
          ]),
        },
        {
          provide: CartService,
          useValue: jasmine.createSpyObj('CartService', ['addItemToCart']),
        },
        {
          provide: ActivatedRoute,
          useValue: { params: params$ },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fakeService = TestBed.inject(PlantService) as jasmine.SpyObj<PlantService>;
    fakeCartService = TestBed.inject(
      CartService
    ) as jasmine.SpyObj<CartService>;
    fakeFirebaseService = TestBed.inject(
      FirebaseService
    ) as jasmine.SpyObj<FirebaseService>;
    activatedRouteSpy = TestBed.inject(
      ActivatedRoute
    ) as jasmine.SpyObj<ActivatedRoute>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantContainerComponent);
    component = fixture.componentInstance;
    fakeService.getPlants.and.returnValue(of(PLANTS));
    fakeService.getSelectedPlant.and.returnValue(of(PLANTS[1]));
    params$.next({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should bind PLANTS`, () => {
    expect(component.plants).toEqual(PLANTS);
  });

  describe('given no plant is selected', () => {
    beforeEach(() => {
      fixture.detectChanges();
      fakeService.getPlantById.and.returnValue(of(PLANTS[1]));
      params$.next({});
      fixture.detectChanges();
    });

    it('should not show details', () => {
      const plantDetail = fixture.debugElement.query(By.css('app-details'));
      expect(plantDetail).toBeNull();
    });

    it('should show the list', () => {
      const plantList = fixture.debugElement.query(By.css('app-list'));
      expect(plantList.properties.plants).toEqual(PLANTS);
    });
  });

  describe('given a plant is clicked in the list', () => {
    it('should navigate to that plant', () => {
      spyOn(router, 'navigateByUrl');
      const stubPlant = PLANTS[1];
      fixture.detectChanges();
      const plantList = fixture.debugElement.query(By.css('app-list'));
      plantList.triggerEventHandler('plantClick', stubPlant);

      expect(router.navigateByUrl).toHaveBeenCalledWith(
        `/product-list/${stubPlant.id}`
      );
    });
  });

  describe('when a plant is selected', () => {
    beforeEach(() => {
      fixture.detectChanges();
      fakeService.getPlantById.and.returnValue(of(PLANTS[1]));
      params$.next({ id: '1' });
      fixture.detectChanges();
    });

    it('should show the details of the selected gym', () => {
      const plantDetail = fixture.debugElement.query(By.css('app-details'));
      expect(plantDetail.properties.plant).toEqual(component.chosenPlant);
    });
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

  it('should call the service to sort the products different', () => {
    component.onSortChange('high');
    expect(fakeService.switchProductSorting).toHaveBeenCalledWith('high');
  });

  it('should redirect the user to the productlist', () => {
    spyOn(router, 'navigateByUrl');
    component.redirectToProductList();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/product-list');
  });

  describe('search function', () => {
    it('should call firebaseService to search the product in the database', () => {
      component.searchProduct('foo');
      expect(fakeFirebaseService.searchProductByName).toHaveBeenCalledWith(
        'foo'
      );
    });

    it('should alert that a name is needed for searching a product', () => {
      spyOn(window, 'alert');
      component.searchProduct('');
      expect(window.alert).toHaveBeenCalledWith('Need name to search');
    });
  });
});
