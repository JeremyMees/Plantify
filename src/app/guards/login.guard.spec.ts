import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { LoginGuard } from './login.guard';
import { of } from 'rxjs';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let fakeAuthService: AuthService;
  let router: Router;
  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {}, url: '/product-list' };
  let routerMock = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };
  let isUserLoggedInValue$ = true;
  let serviceStub = {
    isUserLoggedIn: () => of(isUserLoggedInValue$),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: AuthService,
          useValue: serviceStub,
        },
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

  it('should return true and not redirect the user to /login', () => {
    guard.canActivate(routeMock, routeStateMock).subscribe((data) => {
      expect(data).toBeTruthy();
    });
  });

  it('should return false and redirect the user to /login', () => {
    isUserLoggedInValue$ = false;
    guard.canActivate(routeMock, routeStateMock).subscribe((data) => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(`/login`);
      expect(data).toBeFalsy();
    });
  });
});
