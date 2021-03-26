import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingcartComponent } from './shoppingcart.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ShoppingcartComponent', () => {
  let component: ShoppingcartComponent;
  let fixture: ComponentFixture<ShoppingcartComponent>;
  let spy: any;
  const mockPlant = {
    id: 1,
    latinName: 'Monstera Deliciosa',
    name: 'Alfredo',
    price: 28.69,
    quantity: 1,
    image: 'foo',
    description: 'foo description',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingcartComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call inc()', () => {
    spy = spyOn(component, 'inc').and.callThrough();
    component.inc(mockPlant);
    expect(spy).toHaveBeenCalledWith(mockPlant);
  });

  it('should call dec()', () => {
    spy = spyOn(component, 'dec').and.callThrough();
    component.dec(mockPlant);
    expect(spy).toHaveBeenCalledWith(mockPlant);
  });

  it('should delete product from shoppingcart', () => {
    spy = spyOn(component, 'deleteFromCart').and.callThrough();
    component.deleteFromCart(mockPlant);
    expect(spy).toHaveBeenCalledWith(mockPlant);
  });

  it('should call pay()', () => {
    spy = spyOn(component, 'pay').and.callThrough();
    component.pay();
    expect(spy).toHaveBeenCalled();
  });
});
