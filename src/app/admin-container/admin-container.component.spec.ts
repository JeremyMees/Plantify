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
import { TranslateModule } from '@ngx-translate/core';

describe('AdminContainerComponent', () => {
  let component: AdminContainerComponent;
  let fixture: ComponentFixture<AdminContainerComponent>;
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

  const fakeFirebaseService = {
    getProductsFromDB: () => {
      return of([[mockPlant], ['stubID']]);
    },
    updateProductfromDB: (foo) => {
      return foo;
    },
    deleteProductfromDB: (foo) => {
      return foo;
    },
    addNewProductToDB: (foo) => {
      return foo;
    },
  };
  const fakeAuthService = {
    getAdminsFromDB: () => {
      return of([
        [
          { email: 'foo@example.com', id: 0 },
          { email: 'admin@example.com', id: 1 },
        ],
        ['stubID', 'fooID'],
      ]);
    },
    updateAdminDB: (foo) => {
      return foo;
    },
    addNewAdminToDB: (foo) => {
      return foo;
    },
    deleteAdminfromDB: (foo) => {
      return foo;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        TranslateModule.forRoot(),
      ],
      declarations: [AdminContainerComponent],
      providers: [
        { provide: FirebaseService, useValue: fakeFirebaseService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should send new product to firebase service', () => {
    spyOn(fakeFirebaseService, 'addNewProductToDB');
    component.addNewProduct([mockPlant]);
    expect(fakeFirebaseService.addNewProductToDB).toHaveBeenCalledWith([
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
    spyOn(fakeFirebaseService, 'deleteProductfromDB');
    component.deleteProduct(mockPlant);
    expect(fakeFirebaseService.deleteProductfromDB).toHaveBeenCalledWith(
      mockPlant.id
    );
  });

  it('should trigger function to update product', () => {
    spyOn(fakeFirebaseService, 'updateProductfromDB');
    component.chosenProductID = 'test';
    component.updateProduct([mockPlant]);
    expect(fakeFirebaseService.updateProductfromDB).toHaveBeenCalled();
  });

  it('should set product to update as chosenProduct', () => {
    component.productToUpdate(mockPlant);
    expect(component.chosenProduct).toEqual(mockPlant);
  });

  it('should change boolean switch to true', () => {
    component.switchContent(true);
    expect(component.switch).toBeTruthy();
  });

  it('should set the right admin to update', () => {
    component.adminToUpdate({ email: 'admin@example.com', id: 1 });
    expect(component.chosenAdmin).toEqual({
      email: 'admin@example.com',
      id: 1,
    });
  });

  it('should update admin', () => {
    spyOn(fakeAuthService, 'updateAdminDB');
    component.chosenAdminID = '1';
    component.updateAdmin('foo@example.com');
    expect(fakeAuthService.updateAdminDB).toHaveBeenCalled();
    // .toHaveBeenCalledWith(
    //   'foo@example.com',
    //   '1'
    // );
  });

  it('should add new admin', () => {
    spyOn(fakeAuthService, 'addNewAdminToDB');
    component.addNewAdmin('foo@example.com');
    expect(fakeAuthService.addNewAdminToDB).toHaveBeenCalledWith(
      'foo@example.com'
    );
  });

  it('should delete admin', () => {
    spyOn(fakeAuthService, 'deleteAdminfromDB');
    component.adminToDelete({ email: 'admin@example.com', id: 1 });
    expect(fakeAuthService.deleteAdminfromDB).toHaveBeenCalledWith(1);
  });
});
