import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { routes } from '../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from '../notification.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let fakeService: jasmine.SpyObj<AuthService>;
  let fakeNotification: jasmine.SpyObj<NotificationService>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', [
            'login',
            'logout',
            'checkCookie',
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
    fixture.detectChanges();
  });

  it('should call authService.logout', () => {
    component.logout();
    expect(fakeService.logout).toHaveBeenCalled();
  });
});
