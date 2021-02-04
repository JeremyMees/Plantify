import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
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
      declarations: [ListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value when clicked on the list', () => {
    spyOn(component.plantClick, 'emit');
    component.onSelect(mockPlant);
    expect(component.plantClick.emit).toHaveBeenCalledWith(mockPlant);
  });

  it('should emit value to sort by', () => {
    spyOn(component.sortProducts, 'emit');
    component.sort('high');
    expect(component.sortProducts.emit).toHaveBeenCalledWith('high');
  });

  it('should emit value to search by', () => {
    spyOn(component.searchProduct, 'emit');
    component.searchByString('foo');
    expect(component.searchProduct.emit).toHaveBeenCalledWith('foo');
  });
});
