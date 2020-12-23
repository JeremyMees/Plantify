import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseService } from '../firebase.service';
import { AdminContainerComponent } from './admin-container.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AdminContainerComponent', () => {
  let component: AdminContainerComponent;
  let fixture: ComponentFixture<AdminContainerComponent>;
  let fakeService: jasmine.SpyObj<FirebaseService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminContainerComponent],
      providers: [
        {
          provide: FirebaseService,
          useValue: jasmine.createSpyObj('FirebaseService', [
            'boughtProductsToDb',
            'getBoughtProducts',
            'addNewProductTooDB',
          ]),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fakeService = TestBed.inject(
      FirebaseService
    ) as jasmine.SpyObj<FirebaseService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send new product too firebase service', () => {
    component.addNewProduct(['test', 'testen', 12, 'testimage']);
    expect(fakeService.addNewProductTooDB).toHaveBeenCalledWith([
      'test',
      'testen',
      12,
      'testimage',
    ]);
  });
});
