import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { of, Subject } from 'rxjs';
import { LoginGuard } from './login.guard';

fdescribe('LoginGuard', () => {
  let guard: LoginGuard;
  let fakeAuthService: AuthService;
  let router: Router;
  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {}, url: '/product-list' };
  let isUserLoggedInValue$ = new Subject<boolean>();
  let serviceStub = {
    isUserLoggedIn: () => isUserLoggedInValue$,
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

  it('should return false and redirect the user to /login', (done) => {
    isUserLoggedInValue$.next(false);
    spyOn(router, 'navigateByUrl');
    guard.canActivate(routeMock, routeStateMock).subscribe((data) => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(`/login`);
      done();
    });
  });

  // it('should return true and not redirect the user to /login', () => {
  //   isUserLoggedInValue$.next(true);
  //   spyOn(router, 'navigateByUrl');
  //   guard.canActivate(routeMock, routeStateMock).subscribe((data) => {
  //     expect(data).toBeTruthy();
  //   });
  // });
});
