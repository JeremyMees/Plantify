import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { of } from 'rxjs';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let fakeAuthService: AuthService;
  let router: Router;
  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {}, url: '/product-list' };
  let routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['isUserLoggedIn']),
        },
        { provide: Router, useValue: routerMock },
      ],
    });
    guard = TestBed.inject(LoginGuard);
    fakeAuthService = TestBed.inject(
      AuthService
    ) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // it('should return true', () => {
  //   fakeAuthService.isUserLoggedIn.and.returnValue(of(true));
  //   expect(guard.canActivate(routeMock, routeStateMock)).toEqual(of(true));
  // });

  // it('should return false ans redirect the user to /login', () => {
  //   fakeAuthService.isUserLoggedIn.and.returnValue(of(false));
  //   expect(guard.canActivate(routeMock, routeStateMock)).toEqual(of(false));
  // });
});
