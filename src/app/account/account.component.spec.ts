import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import { FirebaseService } from '../firebase.service';
import { AccountComponent } from './account.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { NotificationService } from '../notification.service';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let fakeAuthService: jasmine.SpyObj<AuthService>;
  let fakeFirebaseService: jasmine.SpyObj<FirebaseService>;
  let router: Router;
  let fakeNotification: jasmine.SpyObj<NotificationService>;
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
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AccountComponent],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', [
            'getUserCredentials',
            'register',
            'login',
            'logout',
            'updateUsername',
            'getCookie',
            'setCookie',
            'deleteCookie',
            'checkCookie',
            'updateUserCredentials',
            'checkAdmin',
          ]),
        },
        {
          provide: FirebaseService,
          useValue: jasmine.createSpyObj('FirebaseService', [
            'getBoughtProducts',
          ]),
        },
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('NotificationService', [
            'setNotification',
          ]),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fakeAuthService = TestBed.inject(
      AuthService
    ) as jasmine.SpyObj<AuthService>;
    fakeFirebaseService = TestBed.inject(
      FirebaseService
    ) as jasmine.SpyObj<FirebaseService>;
    fakeNotification = TestBed.inject(
      NotificationService
    ) as jasmine.SpyObj<NotificationService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fakeAuthService.getUserCredentials.and.returnValue(
      Promise.resolve({
        credentials: { displayName: 'Testname', email: 'Testemail' },
      })
    );
    fixture.detectChanges();
  });

  it('should replace text with inputs', () => {
    component.updateToInputs();
    expect(component.input).toEqual(true);
  });

  describe('update the credentials', () => {
    it('should alert for invalid email address for not having .', () => {
      spyOn(window, 'alert');
      component.updateInputsNewValue('testen', 'testen@', 'testen', 'testen');
      expect(fakeNotification.setNotification).toHaveBeenCalledWith(
        'Please enter a valid email address',
        'bottom',
        2,
        'Timer'
      );
    });

    it('should alert for invalid email address for not having @', () => {
      spyOn(window, 'alert');
      component.updateInputsNewValue('testen', 'testen.', 'testen', 'testen');
      expect(fakeNotification.setNotification).toHaveBeenCalledWith(
        'Please enter a valid email address',
        'bottom',
        2,
        'Timer'
      );
    });

    it('should alert for two different passwords', () => {
      spyOn(window, 'alert');
      component.updateInputsNewValue('testen', 'foo@foo.com', 'foo', 'stub');
      expect(fakeNotification.setNotification).toHaveBeenCalledWith(
        'Passwords are not the same',
        'bottom',
        2,
        'Timer'
      );
    });

    it('should alert that username is to short', () => {
      spyOn(window, 'alert');
      component.updateInputsNewValue('test', 'foo@foo.com', 'testen', 'testen');
      expect(fakeNotification.setNotification).toHaveBeenCalledWith(
        'Username is to short',
        'bottom',
        2,
        'Timer'
      );
    });

    it('should update the credentials from user', () => {
      component.updateInputsNewValue(
        'foofoo',
        'foo@foo.com',
        'foofoofoo',
        'foofoofoo'
      );
      expect(component.name).toEqual('foofoo');
      expect(component.email).toEqual('foo@foo.com');
      expect(component.password).toEqual('foofoofoo');
      expect(component.input).toEqual(false);
      expect(fakeAuthService.updateUserCredentials).toHaveBeenCalledWith(
        'foofoo',
        'foo@foo.com',
        'foofoofoo'
      );
    });
  });

  describe('lengthPassword', () => {
    it('should set the input to green', () => {
      const event = { target: { value: { length: 6 } } };
      component.lengthPassword(event);
      expect(component.colorLengthPassword).toEqual('green');
    });

    it('should set the input to red', () => {
      const event = { target: { value: { length: 5 } } };
      component.lengthPassword(event);
      expect(component.colorLengthPassword).toEqual('red');
    });
  });

  describe('checkPassword', () => {
    it('should set the input to green', () => {
      const event = { target: { value: 'foo' } };
      component.checkPassword(event, 'foo');
      expect(component.colorCheck).toEqual('green');
    });

    it('should set the input to red', () => {
      const event = { target: { value: 'foo' } };
      component.checkPassword(event, 'stub');
      expect(component.colorCheck).toEqual('red');
    });
  });

  describe('checkEmail', () => {
    it('should set the input to green', () => {
      component.checkEmail('stub', 'foo@foo.com');
      expect(component.colorEmail).toEqual('green');
    });

    it('should set the input to red', () => {
      component.checkEmail('stub', 'foo');
      expect(component.colorEmail).toEqual('red');
    });
  });

  describe('checkName', () => {
    it('should set the input to green', () => {
      const event = { target: { value: { length: 6 } } };
      component.checkName(event, 'foo@foo.com');
      expect(component.colorLengthName).toEqual('green');
    });

    it('should set the input to red', () => {
      const event = { target: { value: { length: 5 } } };
      component.checkName(event, 'foo');
      expect(component.colorLengthName).toEqual('red');
    });
  });

  it('should redirect user to the details of the product', () => {
    spyOn(router, 'navigateByUrl');
    component.redirectToProductDetails(mockPlant);
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      `/product-list/${mockPlant.id}`
    );
  });

  it('should redirect user to the admin page', () => {
    spyOn(router, 'navigateByUrl');
    component.toAdminPage();
    expect(router.navigateByUrl).toHaveBeenCalledWith(`/admin`);
  });
});
