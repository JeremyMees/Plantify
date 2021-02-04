import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminAddComponent } from './admin-add.component';

describe('AdminAddComponent', () => {
  let component: AdminAddComponent;
  let fixture: ComponentFixture<AdminAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit values from new product', () => {
    spyOn(component.newProduct, 'emit');
    component.addProduct('test', 'testen', 12, 'testimage', 'foo description');
    expect(component.newProduct.emit).toHaveBeenCalledWith([
      'test',
      'testen',
      12,
      'testimage',
      'foo description',
    ]);
  });
});
