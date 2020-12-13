import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

describe('AuthService', () => {
  let service: AuthService;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let router: Router;
  let fakeService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: CookieService,
          useValue: jasmine.createSpyObj('CookieService', [
            'get',
            'delete',
            'set',
            'check',
          ]),
        },
      ],
    });
    service = TestBed.inject(AuthService);
    fakeService = TestBed.inject(
      CookieService
    ) as jasmine.SpyObj<CookieService>;
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

  describe('set, get, delete & check cookies', () => {
    it('should get the cookie', () => {
      document.cookie = 'email=stub';
      service.getCookie('email');
      expect(fakeService.get).toHaveBeenCalledWith('email');
    });

    it('should chek if the cookie exists', () => {
      document.cookie = 'email=stub';
      service.checkCookie('email');
      expect(fakeService.check).toHaveBeenCalledWith('email');
    });

    it('should delete cookie', () => {
      document.cookie = 'email=stub';
      service.deleteCookie('email');
      expect(fakeService.delete).toHaveBeenCalledWith('email');
    });

    it('should get cookie', () => {
      document.cookie = 'email=stub';
      service.getCookie('email');
      expect(fakeService.get).toHaveBeenCalledWith('email');
    });
  });
});
