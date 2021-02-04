import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseService } from '../firebase.service';
import { AdminContainerComponent } from './admin-container.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Product } from '../product';

describe('AdminContainerComponent', () => {
  let component: AdminContainerComponent;
  let fixture: ComponentFixture<AdminContainerComponent>;
  let fakeService: jasmine.SpyObj<FirebaseService>;
  const mockPlant: Product = {
    id: 1,
    latinName: 'Monstera Deliciosa',
    name: 'Alfredo',
    price: 28.69,
    quantity: 1,
    image: 'images',
    description: 'foo description',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminContainerComponent],
      providers: [
        {
          provide: FirebaseService,
          useValue: jasmine.createSpyObj('FirebaseService', [
            'boughtProductsToDb',
            'getBoughtProducts',
            'addNewProductToDB',
            'getProductsFromDB',
            'deleteProductfromDB',
            'updateProductfromDB',
          ]),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fakeService = TestBed.inject(
      FirebaseService
    ) as jasmine.SpyObj<FirebaseService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContainerComponent);
    component = fixture.componentInstance;
    fakeService.getProductsFromDB.and.returnValue(of([[mockPlant], ['fooID']]));
    fixture.detectChanges();
  });

  it('should send new product to firebase service', () => {
    component.addNewProduct([mockPlant]);
    expect(fakeService.addNewProductToDB).toHaveBeenCalledWith([
      {
        id: 1,
        latinName: 'Monstera Deliciosa',
        name: 'Alfredo',
        price: 28.69,
        quantity: 1,
        image: 'images',
        description: 'foo description',
      },
    ]);
  });

  it('should trigger function to delete product', () => {
    component.deleteProduct(mockPlant);
    expect(fakeService.deleteProductfromDB).toHaveBeenCalledWith(mockPlant.id);
  });

  it('should trigger function to update product', () => {
    component.choosenProductID = 'fooId';
    component.updateProduct([mockPlant]);
    expect(fakeService.updateProductfromDB).toHaveBeenCalledWith(
      [mockPlant],
      'fooId'
    );
  });

  it('should set product to update as choosenProduct', () => {
    component.productToUpdate(mockPlant);
    expect(component.choosenProduct).toEqual(mockPlant);
  });
});
