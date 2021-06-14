import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login.component';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let fakeService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
      ],
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
    router = TestBed.inject(Router);
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

  it('should redirect user to /register', () => {
    spyOn(router, 'navigateByUrl');
    component.navigateToRegister();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/register');
  });
});
