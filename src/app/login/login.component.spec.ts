import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let fakeService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', [
            'login',
            'resetPasswordWithEmail',
          ]),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fakeService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call authService.login', () => {
    component.login('test', 'test');
    expect(fakeService.login).toHaveBeenCalledWith('test', 'test');
  });

  it('should set forgot to true', () => {
    expect(component.forgot).toEqual(false);
    component.forgotPassword();
    expect(component.forgot).toEqual(true);
  });

  it('should call authservice to send a reset email', () => {
    component.forgot = true;
    component.resetPassword('foo');
    expect(component.forgot).toEqual(false);
    expect(fakeService.resetPasswordWithEmail).toHaveBeenCalledWith('foo');
  });
});
