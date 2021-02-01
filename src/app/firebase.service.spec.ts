import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './product';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';

describe('FirebaseService', () => {
  let service: FirebaseService;
  let fakeFirestore: jasmine.SpyObj<AngularFirestore>;
  let fakeStorage: jasmine.SpyObj<AngularFireStorage>;
  let router: Router;
  const mockPlant: Product = {
    id: 1,
    latinName: 'Monstera Deliciosa',
    name: 'Alfredo',
    price: 28.69,
    quantity: 1,
    image: 'images',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: AngularFirestore,
          useValue: jasmine.createSpyObj('AngularFirestore', [
            'collection.get',
            'collection.delete',
          ]),
        },
        {
          provide: AngularFireStorage,
          useValue: jasmine.createSpyObj('AngularFireStorage', [
            'upload',
            'ref',
          ]),
        },
      ],
    });
    service = TestBed.inject(FirebaseService);
    fakeFirestore = TestBed.inject(
      AngularFirestore
    ) as jasmine.SpyObj<AngularFirestore>;
    fakeStorage = TestBed.inject(
      AngularFireStorage
    ) as jasmine.SpyObj<AngularFireStorage>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the bought products', () => {
    service.boughtProductsToDb([mockPlant]);
    const boughtProducts = service.getBoughtProducts();
    expect(boughtProducts).toEqual([mockPlant]);
  });

  /* it('should add new product to the database', () => {
    spyOn(window, 'alert');
    service.addNewProductToDB(['test', 'test', 9, 'test']);
    expect(fakeFirestore.collection).toHaveBeenCalledWith('products');
  });*/

  /*it('should get products from database', () => {
    service.getProductsFromDB().subscribe((products) => {
      expect(products).toEqual([mockPlant]);
    });
  });*/

  /*it('should delete product from database', () => {
    spyOn(window, 'alert');
    service.deleteProductfromDB(mockPlant.id);
    expect(window.alert).toHaveBeenCalledWith('Product deleted successfully');
  });*/

  // it('should update product', () => {
  //   spyOn(window, 'alert');
  //   service.updateProductfromDB([mockPlant],'stubID');
  // });

  // it('should upload image to firebase storage', () => {
  //   const mockFile = {
  //     files: ['stub'],
  //   };
  //   service.uploadImage('foo', mockFile);
  //   expect(fakeStorage.upload).toHaveBeenCalledWith(
  //     '/products/foo.png',
  //     'stub'
  //   );
  //});
});
