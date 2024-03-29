import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { FirebaseService } from './firebase.service';
import { Product } from '../models/product';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';

describe('CartService', () => {
  let service: CartService;
  let fakeCookie: jasmine.SpyObj<CookieService>;
  let fakeFirebaseService: jasmine.SpyObj<FirebaseService>;
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
            'getProductfromDBByID',
          ]),
        },
        {
          provide: CookieService,
          useValue: jasmine.createSpyObj('CookieService', [
            'get',
            'delete',
            'set',
            'check',
          ]),
        },
      ],
    });
    service = TestBed.inject(CartService);
    fakeFirebaseService = TestBed.inject(
      FirebaseService
    ) as jasmine.SpyObj<FirebaseService>;
    fakeCookie = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('set, get, delete & check cookies', () => {
    it('should get the cookie', () => {
      document.cookie = 'email=stub';
      service.getCookie('email');
      expect(fakeCookie.get).toHaveBeenCalledWith('email');
    });

    it('should chek if the cookie exists', () => {
      document.cookie = 'email=stub';
      service.checkCookie('email');
      expect(fakeCookie.check).toHaveBeenCalledWith('email');
    });

    it('should delete cookie', () => {
      document.cookie = 'email=stub';
      service.deleteCookie('email');
      expect(fakeCookie.delete).toHaveBeenCalledWith('email');
    });

    it('should get cookie', () => {
      document.cookie = 'email=stub';
      service.setCookie('email', 'stub');
      expect(fakeCookie.set).toHaveBeenCalledWith('email', 'stub');
    });
  });

  it('should increment the quantity of the product when the same product is added to the inventory', () => {
    service.cartInventory = [mockPlant];
    service.addItemToCart(mockPlant);
    expect(service.cartInventory).toEqual([
      {
        id: 1,
        latinName: 'Monstera Deliciosa',
        name: 'Alfredo',
        price: 28.69,
        quantity: 2,
        image: 'images',
        description: 'foo description',
        stripe: 'UNDEFINED',
      },
    ]);
  });

  it('should add product to inventory', () => {
    service.addItemToCart(mockPlant);
    expect(service.cartInventory).toEqual([mockPlant]);
  });

  it('should delete item from cart', () => {
    service.cartInventory.push(mockPlant);
    service.deleteItemFromCart(mockPlant);
    expect(service.cartInventory).toEqual([]);
  });

  it('should get and return cart inventory', () => {
    fakeCookie.get.and.returnValue(JSON.stringify([mockPlant]));
    fakeFirebaseService.getProductfromDBByID.and.returnValue(of([mockPlant]));
    service.getCartInventory().subscribe((result) => {
      expect(result).toEqual([mockPlant]);
    });
  });

  it('should get and return empty cart inventory and set a empty cookie', () => {
    spyOn(service, 'setCookie');
    fakeCookie.check.and.returnValue(false);
    fakeCookie.get.and.returnValue('[]');
    fakeFirebaseService.getProductfromDBByID.and.returnValue(of([mockPlant]));
    service.getCartInventory().subscribe((result) => {
      expect(result).toEqual([mockPlant]);
    });
  });

  it('should get total price', () => {
    service.cartInventory = [
      {
        id: 1,
        latinName: 'Monstera Deliciosa',
        name: 'Alfredo',
        price: 28.69,
        quantity: 1,
        image: 'images',
        description: 'foo description',
        stripe: 'UNDEFINED',
      },
    ];
    expect(service.getTotalPrice()).toEqual(28.69);
  });

  it('should pay products', () => {
    service.payProducts(
      [{ price: 'foo', quantity: 1 }],
      [mockPlant],
      'stubemail'
    );
    expect(fakeFirebaseService.boughtProductsToDb).toHaveBeenCalledWith(
      [mockPlant],
      'stubemail'
    );
    expect(service.cartInventory).toEqual([]);
  });

  it('should reset the cart inventory', () => {
    service.cartInventory = [mockPlant];
    expect(service.cartInventory).toEqual([mockPlant]);
    service.resetStripe();
    expect(service.cartInventory).toEqual([]);
  });
});
