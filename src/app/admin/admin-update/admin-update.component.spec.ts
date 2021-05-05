import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUpdateComponent } from './admin-update.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AdminUpdateComponent', () => {
  let component: AdminUpdateComponent;
  let fixture: ComponentFixture<AdminUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUpdateComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateComponent);
    component = fixture.componentInstance;
    component.chosenProduct = {
      id: 1,
      latinName: 'test',
      name: 'foo',
      price: 69,
      quantity: 1,
      image: 'foo',
      description: 'foo description',
      stripe: 'UNDEFINED',
    };
    fixture.detectChanges();
  });

  it('should emit the product to update', () => {
    spyOn(component.updateClick, 'emit');
    component.updateProduct('test', 'foo', 69, 'stud', 'description');
    expect(component.updateClick.emit).toHaveBeenCalledWith([
      'test',
      'foo',
      69,
      'stud',
      'description',
    ]);
  });
});
