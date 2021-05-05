import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { NotificationService } from '../services/notification.service';
import { of } from 'rxjs';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let fakeNotification: jasmine.SpyObj<NotificationService>;
  let mockNotification = {
    message: 'stub',
    placement: 'top',
    seconds: 3,
    clickable: 'Timer',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      providers: [
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('NotificationService', [
            'setNotification',
            'closeNotification',
            'returnValues',
          ]),
        },
      ],
    }).compileComponents();
    fakeNotification = TestBed.inject(
      NotificationService
    ) as jasmine.SpyObj<NotificationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fakeNotification.returnValues.and.returnValue(of(mockNotification));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to the notification values', () => {
    component.ngOnInit();
    expect(component.message).toEqual(mockNotification.message);
    expect(component.placement).toEqual(mockNotification.placement);
    expect(component.seconds).toEqual(mockNotification.seconds);
    expect(component.clickable).toEqual(mockNotification.clickable);
  });

  it('should call the service to close the notification', () => {
    component.closeNotification();
    expect(fakeNotification.closeNotification).toHaveBeenCalled();
  });
});
