import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DetailsComponent } from './details.component';
import { By } from '@angular/platform-browser';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let mockPlant = {
    id: 1,
    latinName: 'Monstera Deliciosa',
    name: 'Alfredo',
    price: 28.69,
    quantity: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should send plant to shoppingcart', () => {
    spyOn(component.productToCart, 'emit');
    component.addProductToCart(mockPlant);
    expect(component.productToCart.emit).toHaveBeenCalledWith(mockPlant);
  });

  it('should emit when the quantity increments', () => {
    spyOn(component.quantityChanged, 'emit');
    component.quantityUp(mockPlant);
    expect(component.quantityChanged.emit).toHaveBeenCalledWith([
      1,
      mockPlant.id,
    ]);
  });

  it('should emit when the quantity decrements', () => {
    spyOn(component.quantityChanged, 'emit');
    component.quantityDown(mockPlant);
    expect(component.quantityChanged.emit).toHaveBeenCalledWith([
      0,
      mockPlant.id,
    ]);
  });

  it('should emit when the user wants too go back', () => {
    spyOn(component.redirectTooProductList, 'emit');
    component.backTooProductList();
    expect(component.redirectTooProductList.emit).toHaveBeenCalled();
  });
});
