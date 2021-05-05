import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { RegisterComponent } from './register.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { TranslateModule } from '@ngx-translate/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let fakeService: jasmine.SpyObj<AuthService>;
  let fakeNotification: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['register']),
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
    fakeService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fakeNotification = TestBed.inject(
      NotificationService
    ) as jasmine.SpyObj<NotificationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('lengthPassword', () => {
    it('should set the input to green', () => {
      const event = { target: { value: { length: 6 } } };
      component.lengthPassword(event);
      expect(component.colorLengthPassword).toEqual('green');
    });

    it('should set the input to green', () => {
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

    it('should set the input to green', () => {
      const event = { target: { value: { length: 5 } } };
      component.checkName(event, 'foo');
      expect(component.colorLengthName).toEqual('red');
    });
  });

  describe('register', () => {
    it('should alert for invalid email address for not having .', () => {
      spyOn(window, 'alert');
      component.register('testen', 'testen@', 'testen', 'testen');
      expect(fakeNotification.setNotification).toHaveBeenCalledWith(
        'Please enter a valid email address',
        'bottom',
        2,
        'Timer'
      );
    });

    it('should alert for invalid email address for not having @', () => {
      spyOn(window, 'alert');
      component.register('testen', 'testen.', 'testen', 'testen');
      expect(fakeNotification.setNotification).toHaveBeenCalledWith(
        'Please enter a valid email address',
        'bottom',
        2,
        'Timer'
      );
    });

    it('should alert for two different passwords', () => {
      spyOn(window, 'alert');
      component.register('testen', 'foo@foo.com', 'foo', 'stub');
      expect(fakeNotification.setNotification).toHaveBeenCalledWith(
        'Passwords are not the same',
        'bottom',
        2,
        'Timer'
      );
    });

    it('should alert that username is to short', () => {
      spyOn(window, 'alert');
      component.register('test', 'foo@foo.com', 'testen', 'testen');
      expect(fakeNotification.setNotification).toHaveBeenCalledWith(
        'Username is to short',
        'bottom',
        2,
        'Timer'
      );
    });

    it('should register user', () => {
      component.register('testen', 'foo@foo.com', 'testen', 'testen');
      expect(fakeService.register).toHaveBeenCalledWith(
        'testen',
        'foo@foo.com',
        'testen'
      );
    });
  });
});
