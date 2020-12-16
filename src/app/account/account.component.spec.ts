import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import { FirebaseService } from '../firebase.service';
import { AccountComponent } from './account.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let fakeAuthService: jasmine.SpyObj<AuthService>;
  let fakeFirebaseService: jasmine.SpyObj<FirebaseService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountComponent],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['getUserCredentials']),
        },
        {
          provide: FirebaseService,
          useValue: jasmine.createSpyObj('FirebaseService', [
            'getBoughtProducts',
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fakeAuthService.getUserCredentials.and.returnValue({
      username: 'testname',
      email: 'test@email.com',
      password: 'testpassword',
    });
    fixture.detectChanges();
  });

  it('should replace text with inputs', () => {
    component.updateToInputs();
    expect(component.input).toEqual(true);
  });

  it('should update the credentials from user', () => {
    component.updateInputsNewValue('foofoo', 'foo@foo.com', 'foofoofoo');
    expect(component.name).toEqual('foofoo');
    expect(component.email).toEqual('foo@foo.com');
    expect(component.password).toEqual('foofoofoo');
    expect(component.input).toEqual(false);
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
});
