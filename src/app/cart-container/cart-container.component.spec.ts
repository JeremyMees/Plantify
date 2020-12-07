import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartContainerComponent } from './cart-container.component';
import { CartService } from '../cart.service';

describe('CartContainerComponent', () => {
  let component: CartContainerComponent;
  let fixture: ComponentFixture<CartContainerComponent>;
  let fakeService: jasmine.SpyObj<CartService>;
  let spy: any;
  const mockPlant = {
    id: 1,
    latinName: 'Monstera Deliciosa',
    name: 'Alfredo',
    price: 28.69,
    quantity: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartContainerComponent],
      providers: [
        {
          provide: CartService,
          useValue: jasmine.createSpyObj('CartService', [
            'addItemToCart',
            'deleteItemFromCart',
            'getCartInventory',
            'getTotalPrice',
            'payProducts',
          ]),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fakeService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit()', () => {
    spy = spyOn(component, 'totalPriceOfProducts').and.callThrough();
    component.ngOnInit();
    expect(fakeService.getCartInventory).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should call cartService.deleteFromCart() with the correct value', () => {
    component.deleteFromCart(mockPlant);
    expect(fakeService.deleteItemFromCart).toHaveBeenCalledWith(mockPlant);
    expect(fakeService.getCartInventory).toHaveBeenCalled();
  });

  it('should call cartService.payForProducts() with the correct value', () => {
    component.payForProducts();
    expect(fakeService.payProducts).toHaveBeenCalled();
    expect(fakeService.getCartInventory).toHaveBeenCalled();
  });

  describe('when onQuantityChange() is called', () => {
    it('should increment quantity', () => {
      component.products = [mockPlant];
      component.onQuantityChange([1, mockPlant]);
      expect(component.products[0].quantity).toEqual(2);
    });

    it('should not decrement quantity because cant go lower than zero', () => {
      component.products = [mockPlant];
      component.onQuantityChange([0, mockPlant]);
      expect(component.products[0].quantity).toEqual(1);
    });

    it('should decrement quantity', () => {
      component.products = [mockPlant];
      component.onQuantityChange([1, mockPlant]);
      component.onQuantityChange([0, mockPlant]);
      expect(component.products[0].quantity).toEqual(1);
    });
  });
});
