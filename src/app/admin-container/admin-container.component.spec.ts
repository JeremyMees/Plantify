import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseService } from '../firebase.service';
import { AdminContainerComponent } from './admin-container.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Product } from '../product';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { AuthService } from '../auth.service';
import { Admin } from '../admin';

describe('AdminContainerComponent', () => {
  let component: AdminContainerComponent;
  let fixture: ComponentFixture<AdminContainerComponent>;
  let fakeService: jasmine.SpyObj<FirebaseService>;
  let fakeAuthService: jasmine.SpyObj<AuthService>;
  let router: Router;
  const mockPlant: Product = {
    id: 1,
    latinName: 'Monstera Deliciosa',
    name: 'Alfredo',
    price: 28.69,
    quantity: 1,
    image: 'images',
    description: 'foo description',
  };
  const mockAdmin: Admin = {
    email: 'admin@example.com',
    id: 0,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
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
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', [
            'login',
            'getUserCredentials',
            'checkAdmin',
            'getAdminsFromDB',
          ]),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fakeService = TestBed.inject(
      FirebaseService
    ) as jasmine.SpyObj<FirebaseService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContainerComponent);
    component = fixture.componentInstance;
    fakeService.getProductsFromDB.and.returnValue(of([[mockPlant], ['fooID']]));
    fakeAuthService.getUserCredentials.and.returnValue(
      Promise.resolve({ email: 'foo' })
    );
    fakeAuthService.checkAdmin.and.returnValue(
      of([
        {
          empty: false,
          data: () => {
            return mockPlant;
          },
        },
      ])
    );
    fakeAuthService.getAdminsFromDB.and.returnValue(
      of([[mockAdmin], ['fooID']])
    );
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
    component.chosenProductID = 'fooId';
    component.updateProduct([mockPlant]);
    expect(fakeService.updateProductfromDB).toHaveBeenCalledWith(
      [mockPlant],
      'fooId'
    );
  });

  it('should set product to update as chosenProduct', () => {
    component.productToUpdate(mockPlant);
    expect(component.chosenProduct).toEqual(mockPlant);
  });
});
