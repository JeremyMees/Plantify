import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { routes } from '../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let fakeService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', [
            'login',
            'logout',
            'checkCookie',
          ]),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fakeService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call authService.logout', () => {
    component.logout();
    expect(fakeService.logout).toHaveBeenCalled();
  });

  it('should check if current user is logged in and return true', () => {
    spyOn(router, 'navigateByUrl');
    fakeService.checkCookie.and.returnValue(true);
    component.checkLogin();
    expect(fakeService.checkCookie).toHaveBeenCalledWith('logged-in');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/account');
  });

  it('should check if current user is logged in and return false', () => {
    spyOn(window, 'alert');
    fakeService.checkCookie.and.returnValue(false);
    component.checkLogin();
    expect(fakeService.checkCookie).toHaveBeenCalledWith('logged-in');
    expect(window.alert).toHaveBeenCalledWith('log in first');
  });
});
