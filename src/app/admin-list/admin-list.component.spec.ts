import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminListComponent } from './admin-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('AdminListComponent', () => {
  let component: AdminListComponent;
  let fixture: ComponentFixture<AdminListComponent>;
  const mockPlant: any = {
    id: 1,
    latinName: 'Monstera Deliciosa',
    name: 'Alfredo',
    price: 28.69,
    quantity: 1,
    description: 'foo description',
    stripe: 'UNDEFINED',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListComponent);
    component = fixture.componentInstance;
    component.plants = [mockPlant];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete event', () => {
    spyOn(component.deleteClick, 'emit');
    component.selectForDelete(mockPlant);
    expect(component.deleteClick.emit).toHaveBeenCalledWith(mockPlant);
  });

  it('should update delete event', () => {
    spyOn(component.editClick, 'emit');
    component.selectForUpdate(mockPlant);
    expect(component.editClick.emit).toHaveBeenCalledWith(mockPlant);
  });
});
