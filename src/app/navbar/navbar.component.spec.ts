import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { routes } from '../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from '../services/notification.service';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let fakeService: jasmine.SpyObj<AuthService>;
  let fakeNotification: jasmine.SpyObj<NotificationService>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', [
            'login',
            'logout',
            'checkCookie',
            'isUserLoggedIn',
          ]),
        },
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('NotificationService', [
            'setNotification',
          ]),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fakeService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fakeNotification = TestBed.inject(
      NotificationService
    ) as jasmine.SpyObj<NotificationService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fakeService.isUserLoggedIn.and.returnValue(of(true));
    fixture.detectChanges();
  });

  describe('ngOnDestroy()', () => {
    it('should unsubscribe to observables', () => {
      spyOn(component.authSubscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(component.authSubscription.unsubscribe).toHaveBeenCalled();
    });
  });

  it('should call authService.logout', () => {
    component.logout();
    expect(fakeService.logout).toHaveBeenCalled();
  });

  it('should set isMenuOpen to false', () => {
    component.isMenuOpen = true;
    expect(component.isMenuOpen).toBeTruthy();
    component.onSidenavClick();
    expect(component.isMenuOpen).toBeFalsy();
  });
});
