import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { FirebaseService } from './firebase.service';
import { Product } from './product';

describe('CartService', () => {
  let service: CartService;
  let fakeFirebaseService: jasmine.SpyObj<FirebaseService>;
  const mockPlant: Product = {
    id: 1,
    latinName: 'Monstera Deliciosa',
    name: 'Alfredo',
    price: 28.69,
    quantity: 1,
    image: 'images',
    description: 'foo description',
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
      ],
    });
    service = TestBed.inject(CartService);
    fakeFirebaseService = TestBed.inject(
      FirebaseService
    ) as jasmine.SpyObj<FirebaseService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', () => {
    service.addItemToCart(mockPlant);
    expect(service.cartInventory).toEqual([mockPlant]);
  });

  it('should delete item from cart', () => {
    service.cartInventory.push(mockPlant);
    service.deleteItemFromCart(mockPlant);
    expect(service.cartInventory).toEqual([]);
  });

  it('should get cart inventory', () => {
    service.cartInventory.push(mockPlant);
    expect(service.getCartInventory()).toEqual([mockPlant]);
  });

  it('should get total price', () => {
    service.cartInventory.push(mockPlant);
    expect(service.getTotalPrice()).toEqual(28.69);
  });

  it('should pay products', () => {
    service.payProducts([mockPlant]);
    expect(service.cartInventory).toEqual([]);
  });
});
