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

  describe('login', () => {
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

  it(`should logout user`, () => {
    spyOn(service, 'deleteCookie');
    document.cookie = 'email=stub';
    service.logout();
    expect(service.deleteCookie).toHaveBeenCalledWith('email');
  });

  it('should get the cookie', () => {
    spyOn(service, 'getCookie');
    document.cookie = 'email=stub';
    service.getCookie('email');
    expect(service.getCookie).toHaveBeenCalledWith('email');
  });

  it('should chek if the cookie exists', () => {
    document.cookie = 'email=stub';
    let boolean = service.chekCookie('email');
    expect(boolean).toBeTruthy();
  });

  it('should delete cookie', () => {
    document.cookie = 'email=stub';
    service.deleteCookie('email');
    let boolean = service.chekCookie('email');
    expect(boolean).toBeFalse();
  });

  it('should get the cookie', () => {
    document.cookie = 'email=stub';
    let cookie = service.getCookie('email');
    expect(cookie).toEqual('stub');
  });
});
