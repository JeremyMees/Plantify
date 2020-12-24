import { TestBed } from '@angular/core/testing';
import { Cart } from './cart';
import { FirebaseService } from './firebase.service';
import { PLANTS } from './mock-plants';

describe('FirebaseService', () => {
  let service: FirebaseService;
  const mockPlant: Cart = {
    id: 1,
    latinName: 'Monstera Deliciosa',
    name: 'Alfredo',
    price: 28.69,
    quantity: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the bought products', () => {
    service.boughtProductsToDb([mockPlant]);
    const boughtProducts = service.getBoughtProducts();
    expect(boughtProducts).toEqual([mockPlant]);
  });

  it('should add new product too the database', () => {
    spyOn(window, 'alert');
    service.addNewProductTooDB(['test']);
    expect(window.alert).toHaveBeenCalledWith(['test']);
  });

  it('should get produts from database', () => {
    service.getProductsFromDB().subscribe((products) => {
      expect(products).toEqual(PLANTS);
    });
  });

  it('should delete product from database', () => {
    spyOn(window, 'alert');
    service.deleteProductfromDB(mockPlant);
    expect(window.alert).toHaveBeenCalledWith(mockPlant);
  });

  it('should update product', () => {
    spyOn(window, 'alert');
    service.updateProductfromDB([mockPlant]);
    expect(window.alert).toHaveBeenCalledWith([mockPlant]);
  });
});
