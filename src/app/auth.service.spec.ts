import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
    });
    service = TestBed.inject(AuthService);
    activatedRouteSpy = TestBed.inject(
      ActivatedRoute
    ) as jasmine.SpyObj<ActivatedRoute>;
    router = TestBed.inject(Router);
  });

  it(`should login user`, () => {
    spyOn(router, 'navigateByUrl');
    service.login('test', 'test');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/product-list');
  });

  it(`should not login user`, () => {
    spyOn(window, 'alert');
    service.login('foo', 'foo');
    expect(window.alert).toHaveBeenCalledWith(
      'username or password is incorrect'
    );
  });
});
