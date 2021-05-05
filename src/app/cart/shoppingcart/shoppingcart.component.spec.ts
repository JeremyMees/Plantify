import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingcartComponent } from './shoppingcart.component';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from '../../services/notification.service';

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
    stripe: 'UNDEFINED',
  };
  let fakeNotification: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingcartComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('NotificationService', [
            'setNotification',
          ]),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fakeNotification = TestBed.inject(
      NotificationService
    ) as jasmine.SpyObj<NotificationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingcartComponent);
    component = fixture.componentInstance;
    component.products = [mockPlant];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('increment or decrement quantity', () => {
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
  });

  it('should delete product from shoppingcart', () => {
    spy = spyOn(component, 'deleteFromCart').and.callThrough();
    component.deleteFromCart(mockPlant);
    expect(spy).toHaveBeenCalledWith(mockPlant);
  });

  describe('pay', () => {
    it('should call pay() with valid values', () => {
      spy = spyOn(component, 'pay').and.callThrough();
      component.pay(['foo']);
      expect(spy).toHaveBeenCalled();
    });

    it('should call pay() with unvalid values', () => {
      spy = spyOn(component, 'pay').and.callThrough();
      component.pay(['']);
      expect(fakeNotification.setNotification).toHaveBeenCalledWith(
        'Please fill the form correct',
        'top',
        3,
        'Timer'
      );
    });
  });

  describe('validatino input fields', () => {
    describe('name', () => {
      it('should set the input to green', () => {
        const event = { target: { value: { length: 6 } } };
        component.checkName(event);
        expect(component.colorName).toEqual('green');
      });

      it('should set the input to red', () => {
        const event = { target: { value: { length: 1 } } };
        component.checkName(event);
        expect(component.colorName).toEqual('red');
      });
    });

    describe('frontname', () => {
      it('should set the input to green', () => {
        const event = { target: { value: { length: 6 } } };
        component.checkFrontname(event);
        expect(component.colorFrontname).toEqual('green');
      });

      it('should set the input to red', () => {
        const event = { target: { value: { length: 1 } } };
        component.checkFrontname(event);
        expect(component.colorFrontname).toEqual('red');
      });
    });

    describe('streetname', () => {
      it('should set the input to green', () => {
        const event = { target: { value: { length: 6 } } };
        component.checkStreetname(event);
        expect(component.colorStreetname).toEqual('green');
      });

      it('should set the input to red', () => {
        const event = { target: { value: { length: 1 } } };
        component.checkStreetname(event);
        expect(component.colorStreetname).toEqual('red');
      });
    });

    describe('housenumber', () => {
      it('should set the input to green', () => {
        const event = { target: { value: { length: 6 } } };
        component.checkHousenumber(event);
        expect(component.colorHousenumber).toEqual('green');
      });

      it('should set the input to red', () => {
        const event = { target: { value: { length: 0 } } };
        component.checkHousenumber(event);
        expect(component.colorHousenumber).toEqual('red');
      });
    });

    describe('zipcode', () => {
      it('should set the input to green', () => {
        const event = { target: { value: { length: 6 } } };
        component.checkZipcode(event);
        expect(component.colorZipcode).toEqual('green');
      });

      it('should set the input to red', () => {
        const event = { target: { value: { length: 0 } } };
        component.checkZipcode(event);
        expect(component.colorZipcode).toEqual('red');
      });
    });

    describe('city', () => {
      it('should set the input to green', () => {
        const event = { target: { value: { length: 6 } } };
        component.checkCity(event);
        expect(component.colorCity).toEqual('green');
      });

      it('should set the input to red', () => {
        const event = { target: { value: { length: 0 } } };
        component.checkCity(event);
        expect(component.colorCity).toEqual('red');
      });
    });

    describe('email', () => {
      it('should set the input to green', () => {
        const event = { target: { value: 'jeremy@test.com' } };
        component.checkEmail(event);
        expect(component.colorEmail).toEqual('green');
      });

      it('should set the input to red', () => {
        const event = { target: { value: 'foo' } };
        component.checkEmail(event);
        expect(component.colorEmail).toEqual('red');
      });
    });

    describe('phone number', () => {
      it('should set the input to green', () => {
        const event = { target: { value: { length: 10 } } };
        component.checkNumber(event);
        expect(component.colorNumber).toEqual('green');
      });

      it('should set the input to red', () => {
        const event = { target: { value: { length: 1 } } };
        component.checkNumber(event);
        expect(component.colorNumber).toEqual('red');
      });
    });
  });
});
