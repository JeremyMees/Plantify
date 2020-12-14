import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import { RegisterComponent } from './register.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let fakeService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['register']),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fakeService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
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

    it('should set the input to green', () => {
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

    it('should set the input to green', () => {
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
      expect(window.alert).toHaveBeenCalledWith(
        'Please enter a valid email address.'
      );
    });

    it('should alert for invalid email address for not having @', () => {
      spyOn(window, 'alert');
      component.register('testen', 'testen.', 'testen', 'testen');
      expect(window.alert).toHaveBeenCalledWith(
        'Please enter a valid email address.'
      );
    });

    it('should alert for two different passwords', () => {
      spyOn(window, 'alert');
      component.register('testen', 'foo@foo.com', 'foo', 'stub');
      expect(window.alert).toHaveBeenCalledWith('Passwords are not the same');
    });

    it('should alert that username is to short', () => {
      spyOn(window, 'alert');
      component.register('test', 'foo@foo.com', 'testen', 'testen');
      expect(window.alert).toHaveBeenCalledWith('Username is to short');
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
