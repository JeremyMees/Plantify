import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let router: Router;
  let fakeService: jasmine.SpyObj<CookieService>;
  let fakeAuthService: jasmine.SpyObj<AngularFireAuth>;

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
        {
          provide: AngularFireAuth,
          useValue: jasmine.createSpyObj('AngularFireAuth', [
            'createUserWithEmailAndPassword',
          ]),
        },
      ],
    });
    service = TestBed.inject(AuthService);
    fakeService = TestBed.inject(
      CookieService
    ) as jasmine.SpyObj<CookieService>;
    fakeAuthService = TestBed.inject(
      AngularFireAuth
    ) as jasmine.SpyObj<AngularFireAuth>;
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

  describe('firebase', () => {
    const mockValue = {
      additionalUserInfo: null,
      credential: null,
      operationType: null,
      user: { email: 'stubemail', password: 'stubpassword' },
    };

    /*it(`should register user`, () => {
      spyOn(router, 'navigateByUrl');
      spyOn(console, 'log');
      service.register('stubname', 'stubemail', 'stubpassword');

      expect(service.setCookie).toHaveBeenCalledWith('name', 'stubname');
      expect(service.setCookie).toHaveBeenCalledWith('email', 'stubemail');
      expect(
        fakeAuthService.createUserWithEmailAndPassword
      ).toHaveBeenCalledWith('stubemail', 'stubpassword');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/product-list');
    });*/

    it('should update the username', () => {
      let mockuser = {
        email: 'stubemail',
        password: 'stubpassword',
        updateProfile: (foo) => {
          alert(foo);
        },
      };
      spyOn(mockuser, 'updateProfile');

      service.updateUsername(mockuser, 'stubname');
      expect(mockuser.updateProfile).toHaveBeenCalledWith({
        displayName: 'stubname',
      });
    });
  });

  it('should get the user credentials', () => {
    const credentials = service.getUserCredentials();
    expect(credentials).toEqual({
      username: 'testname',
      email: 'test@email.com',
      password: 'testpassword',
    });
  });
});
