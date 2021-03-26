import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseService } from '../firebase.service';
import { HomeComponent } from './home.component';
import { Product } from '../product';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
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
      imports: [
        RouterTestingModule.withRoutes(routes),
        TranslateModule.forRoot(),
      ],
      declarations: [HomeComponent],
      providers: [
        {
          provide: FirebaseService,
          useValue: jasmine.createSpyObj('FirebaseService', [
            'getProductsNewFour',
          ]),
        },
      ],
    }).compileComponents();
    fakeService = TestBed.inject(
      FirebaseService
    ) as jasmine.SpyObj<FirebaseService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fakeService.getProductsNewFour.and.returnValue(
      of([
        {
          data: () => {
            return 'foo';
          },
        },
        {
          data: () => {
            return 'stub';
          },
        },
      ])
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind the values', () => {
    expect(component.plants).toBeDefined();
  });

  it('should redirect to the product details', () => {
    spyOn(router, 'navigateByUrl');
    component.onSelect(mockPlant);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/product-list/1');
  });

  it('should redirect to the product list', () => {
    spyOn(router, 'navigateByUrl');
    component.redirectToProductList();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/product-list');
  });

  it('should redirect to mission page', () => {
    spyOn(router, 'navigateByUrl');
    component.redirectToMission();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/mission');
  });
});
