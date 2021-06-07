import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { AdminGuard } from './admin.guard';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { of } from 'rxjs';

fdescribe('AdminGuard', () => {
  let guard: AdminGuard;
  let fakeAuthService: AuthService;
  let router: Router;
  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {}, url: '/product-list' };
  let routerMock = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };
  let isUserAdmin$ = true;
  let serviceStub = {
    authGuardAdmin: () => of(isUserAdmin$),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: AuthService,
          useValue: serviceStub,
        },
        { provide: Router, useValue: routerMock },
      ],
    });
    guard = TestBed.inject(AdminGuard);
    fakeAuthService = TestBed.inject(
      AuthService
    ) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true', () => {
    guard.canActivate(routeMock, routeStateMock).subscribe((result) => {
      expect(result).toBeTruthy();
    });
  });

  it('should return false and redirect the user to /product-list', () => {
    isUserAdmin$ = false;
    guard.canActivate(routeMock, routeStateMock).subscribe((result) => {
      expect(result).toBeFalsy();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/product-list');
    });
  });
});
