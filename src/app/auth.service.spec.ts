import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

describe('AuthService', () => {
  let service: AuthService;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let router: Router;
  let fakeService: jasmine.SpyObj<CookieService>;
  let fakeAuthService: jasmine.SpyObj<AngularFireAuth>;
  let fakeNotification: jasmine.SpyObj<NotificationService>;

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
            'signInWithEmailAndPassword',
            'signOut',
            'currentUser',
            'onAuthStateChanged',
          ]),
        },
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('NotificationService', [
            'setNotification',
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
    fakeNotification = TestBed.inject(
      NotificationService
    ) as jasmine.SpyObj<NotificationService>;
    router = TestBed.inject(Router);
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
      service.setCookie('email', 'stub');
      expect(fakeService.set).toHaveBeenCalledWith('email', 'stub');
    });
  });

  describe('firebase', () => {
    const mockValue = {
      additionalUserInfo: null,
      credential: null,
      operationType: null,
      user: { email: 'stubemail', password: 'stubpassword' },
    };
    const user = { email: 'stubemail', password: 'stubpassword' };
    /*fakeAuthService.createUserWithEmailAndPassword.and.returnValue(
      <any>Promise.resolve({ user })
    );

    it(`should register user`, () => {
      spyOn(router, 'navigateByUrl');
      spyOn(console, 'log');
      service.register('stubname', 'stubemail', 'stubpassword');

      expect(service.setCookie).toHaveBeenCalledWith('name', 'stubname');
      expect(service.setCookie).toHaveBeenCalledWith('email', 'stubemail');
      expect(
        fakeAuthService.createUserWithEmailAndPassword
      ).toHaveBeenCalledWith('stubemail', 'stubpassword');
      expect(service.updateUsername).toHaveBeenCalledWith(user, 'stubname');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/product-list');
    });*/

    /* it(`should logout user`, () => {
      spyOn(service, 'deleteCookie');
      spyOn(window, 'alert');
      document.cookie = 'logged-in=true';
      service.logout();
      expect(fakeAuthService.signOut).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith(`logged test1@test.com out`);
      expect(service.deleteCookie).toHaveBeenCalledWith('logged-in');
    });

    it(`should login user`, () => {
      spyOn(router, 'navigateByUrl');
      service.login('test', 'test');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/product-list');
      expect(fakeNotification.setNotification).toHaveBeenCalledWith('Username or password is incorrect',
          'top',
          2,
          'Clickable');
    });

    it(`should not login user`, () => {
      spyOn(window, 'alert');
      service.login('foo', 'foo');
      expect(window.alert).toHaveBeenCalledWith(
        'username or password is incorrect'
      );
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

    /*it('should get the user credentials', () => {
      fakeAuthService.currentUser.and.returnValue(Promise.resolve('foo'));
      expect(service.getUserCredentials).toEqual('foo');
    });*/
  });
});
