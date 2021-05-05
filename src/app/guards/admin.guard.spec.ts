import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { AdminGuard } from './admin.guard';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { of } from 'rxjs';

describe('AdminGuard', () => {
  let guard: AdminGuard;
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
          useValue: jasmine.createSpyObj('AuthService', ['authGaurdAdmin']),
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

  // it('should return true', () => {
  //   fakeAuthService.authGaurdAdmin.and.returnValue(of(true));
  //   expect(guard.canActivate(routeMock, routeStateMock)).toEqual(of(true));
  // });

  // it('should return false ans redirect the user to /product-list', () => {
  //   fakeAuthService.authGaurdAdmin.and.returnValue(of(false));
  //   expect(guard.canActivate(routeMock, routeStateMock)).toEqual(of(false));
  // });
});
