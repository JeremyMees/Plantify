import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartContainerComponent } from './cart-container.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

describe('CartContainerComponent', () => {
  let component: CartContainerComponent;
  let fixture: ComponentFixture<CartContainerComponent>;
  let fakeService: jasmine.SpyObj<CartService>;
  let fakeAuthService: jasmine.SpyObj<AuthService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let spy: any;
  let user$ = new BehaviorSubject(undefined);
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
            'getCookie',
            'setCookie',
            'deleteCookie',
            'checkCookie',
          ]),
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['getUserCredentials']),
        },
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('NotificationService', [
            'setNotification',
          ]),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fakeService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    fakeAuthService = TestBed.inject(
      AuthService
    ) as jasmine.SpyObj<AuthService>;
    notificationService = TestBed.inject(
      NotificationService
    ) as jasmine.SpyObj<NotificationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartContainerComponent);
    component = fixture.componentInstance;
    fakeAuthService.getUserCredentials.and.returnValue(user$);
    fakeService.getCartInventory.and.returnValue(of([mockPlant]));
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
    user$.next({ email: 'foo@mail.com' });
    fixture.detectChanges();
    component.payForProducts([{ price: 'foo', quantity: 1 }]);
    expect(fakeService.payProducts).toHaveBeenCalled();
    expect(fakeService.getCartInventory).toHaveBeenCalled();
  });

  describe('when onQuantityChange() is called', () => {
    beforeEach(() => {
      fakeService.getCookie.and.returnValue('[{"id" : 1, "quantity": 2}]');
    });

    it('should increment quantity', () => {
      component.products = [mockPlant];
      component.onQuantityChange([1, mockPlant]);
      expect(component.products[0].quantity).toEqual(2);
      expect(fakeService.setCookie).toHaveBeenCalledWith(
        'cart',
        '[{"id":1,"quantity":3}]'
      );
    });

    it('should not decrement quantity because cant go lower than zero', () => {
      component.products = [mockPlant];
      component.onQuantityChange([0, mockPlant]);
      expect(component.products[0].quantity).toEqual(1);
    });

    it('should decrement quantity', () => {
      mockPlant.quantity = 2;
      component.products = [mockPlant];
      component.onQuantityChange([0, mockPlant]);
      expect(component.products[0].quantity).toEqual(1);
      expect(fakeService.setCookie).toHaveBeenCalledWith(
        'cart',
        '[{"id":1,"quantity":1}]'
      );
    });
  });

  it('should cancel the payment if user is not logged in', () => {
    user$.next(undefined);
    fixture.detectChanges();
    // component.email = undefined;
    component.payForProducts([{ price: 'foo', quantity: 1 }]);
    expect(notificationService.setNotification).toHaveBeenCalledWith(
      'Please log in first',
      'top',
      2,
      'Clickable'
    );
  });
});
