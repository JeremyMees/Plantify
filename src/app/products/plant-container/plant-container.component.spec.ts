import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlantContainerComponent } from './plant-container.component';
import { PlantService } from '../../services/plant.service';
import { of, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../app-routing.module';
import { By } from '@angular/platform-browser';
import { CartService } from '../../services/cart.service';
import { FirebaseService } from '../../services/firebase.service';
import { Product } from '../../models/product';

describe('PlantContainerComponent', () => {
  let component: PlantContainerComponent;
  let fixture: ComponentFixture<PlantContainerComponent>;
  let fakeCartService: jasmine.SpyObj<CartService>;
  let fakeFirebaseService: jasmine.SpyObj<FirebaseService>;
  let router: Router;
  const params$ = new Subject<{ id?: number }>();
  const mockPlant: Product = {
    id: 1,
    latinName: 'Monstera Deliciosa',
    name: 'Alfredo',
    price: 28.69,
    quantity: 1,
    image: 'images',
    description: 'foo description',
    stripe: 'UNDEFINED',
  };

  beforeEach(async () => {
    const serviceStub = {
      getProductfromDBByID: (id: number) => {
        return of([id]);
      },
      searchProductByName: (stub: string) => {
        return stub;
      },
      getProductsHighAll: () => {
        return of([mockPlant]);
      },
      getProductsLowAll: () => {
        return of([mockPlant]);
      },
      getProductsNewAll: () => {
        return of([mockPlant]);
      },
    };
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
            'openModal',
            'closeModal',
          ]),
        },
        {
          provide: FirebaseService,
          useValue: serviceStub,
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
    fakeCartService = TestBed.inject(
      CartService
    ) as jasmine.SpyObj<CartService>;
    fakeFirebaseService = TestBed.inject(
      FirebaseService
    ) as jasmine.SpyObj<FirebaseService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantContainerComponent);
    component = fixture.componentInstance;
    params$.next({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnDestroy()', () => {
    it('should unsubscribe to observables', () => {
      spyOn(component.firebaseSubscription, 'unsubscribe');
      spyOn(component.destroy$, 'next');
      component.ngOnDestroy();
      expect(component.firebaseSubscription.unsubscribe).toHaveBeenCalled();
      expect(component.destroy$.next).toHaveBeenCalledWith(true);
    });
  });

  it(`should bind PLANTS`, () => {
    expect(component.plants).toEqual([mockPlant]);
  });

  describe('given no plant is selected', () => {
    beforeEach(() => {
      fixture.detectChanges();
      params$.next({});
      fixture.detectChanges();
    });

    it('should not show details', () => {
      const plantDetail = fixture.debugElement.query(By.css('app-details'));
      expect(plantDetail).toBeNull();
    });

    it('should show the list', () => {
      const plantList = fixture.debugElement.query(By.css('app-list'));
      expect(plantList.properties.plants).toEqual([mockPlant]);
    });
  });

  describe('given a plant is clicked in the list', () => {
    beforeEach(() => {
      fixture.detectChanges();
      component.chosenPlant = mockPlant;
      params$.next({ id: 0 });
      fixture.detectChanges();
    });

    it('should navigate to that plant', () => {
      spyOn(router, 'navigateByUrl');
      component.chosenPlant = null;
      component.plants = [mockPlant];
      fixture.detectChanges();
      const plantList = fixture.debugElement.query(By.css('app-list'));
      plantList.triggerEventHandler('plantClick', mockPlant);

      expect(router.navigateByUrl).toHaveBeenCalledWith(
        `/product-list/${mockPlant.id}`
      );
    });

    it('should get the plant from the database', () => {
      spyOn(fakeFirebaseService, 'getProductfromDBByID');
      fakeFirebaseService.getProductfromDBByID(1);
      expect(fakeFirebaseService.getProductfromDBByID).toHaveBeenCalled();
    });
  });

  it('should call cartService.additemToCart()', () => {
    component.productToCart(mockPlant);
    expect(fakeCartService.addItemToCart).toHaveBeenCalledWith(mockPlant);
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
      component.products = [mockPlant, mockPlant, mockPlant];
      component.onQuantityChange([1, mockPlant.id]);
      component.onQuantityChange([0, mockPlant.id]);
      expect(component.plants[0].quantity).toEqual(1);
    });
  });

  it('should redirect the user to the productlist', () => {
    spyOn(router, 'navigateByUrl');
    component.redirectToProductList();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/product-list');
  });

  describe('search function', () => {
    it('should call firebaseService to search the product in the database', () => {
      spyOn(fakeFirebaseService, 'searchProductByName');
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

  describe('on sort change', () => {
    it('should sort plants with the highest price first', () => {
      spyOn(router, 'navigate');
      component.onSortChange('high');
      expect(router.navigate).toHaveBeenCalledWith(['/product-list']);
      expect(component.plants).toEqual([mockPlant]);
    });

    it('should sort plants with the lowest price first', () => {
      spyOn(router, 'navigate');
      component.onSortChange('low');
      expect(router.navigate).toHaveBeenCalledWith(['/product-list']);
      expect(component.plants).toEqual([mockPlant]);
    });

    it('should sort plants with the newest first', () => {
      spyOn(router, 'navigate');
      component.onSortChange('new');
      expect(router.navigate).toHaveBeenCalledWith(['/product-list']);
      expect(component.plants).toEqual([mockPlant]);
    });
  });
});
