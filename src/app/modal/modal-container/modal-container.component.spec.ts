import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../app-routing.module';
import { ModalContainerComponent } from './modal-container.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ModalContainerComponent', () => {
  let component: ModalContainerComponent;
  let fixture: ComponentFixture<ModalContainerComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ModalContainerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should redirect to /shopping-cart', () => {
    spyOn(router, 'navigateByUrl');
    component.redirectToShoppingcart();
    expect(router.navigateByUrl).toHaveBeenCalledWith(`/shopping-cart`);
  });

  it('should redirect to /product-list', () => {
    spyOn(router, 'navigateByUrl');
    component.redirectToProductList();
    expect(router.navigateByUrl).toHaveBeenCalledWith(`/product-list`);
  });
});
