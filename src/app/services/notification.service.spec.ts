import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
    service.message = '';
    service.placement = '';
    service.seconds = null;
    service.clickable = '';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the value trough a observable', () => {
    service.message = 'test';
    service.placement = 'top';
    service.seconds = 3;
    service.clickable = 'Timer';
    service.returnValues().subscribe((data) => {
      expect(data).toEqual({
        message: 'test',
        placement: 'top',
        seconds: 3,
        clickable: 'Timer',
      });
    });
  });

  describe('Set the notification', () => {
    it('should set the notification values', () => {
      spyOn(service.subject, 'next');
      service.setNotification('foo', 'bottom', 2, 'Onclick');
      expect(service.subject.next).toHaveBeenCalledWith({
        message: 'foo',
        placement: 'bottom',
        seconds: 2,
        clickable: 'Onclick',
      });
    });

    it('should set the notification values and a timer', () => {
      spyOn(service.subject, 'next');
      spyOn(service, 'setTimer');
      service.setNotification('foo', 'bottom', 2, 'Timer');
      expect(service.subject.next).toHaveBeenCalledWith({
        message: 'foo',
        placement: 'bottom',
        seconds: 2,
        clickable: 'Timer',
      });
      expect(service.setTimer).toHaveBeenCalled();
    });
  });

  it('should close the notification', () => {
    spyOn(service.subject, 'next');
    service.closeNotification();
    expect(service.subject.next).toHaveBeenCalledWith({
      message: null,
      placement: null,
      seconds: null,
      clickable: null,
    });
  });

  describe('timer', () => {
    it('should reset the timer', () => {
      spyOn(service.subject, 'next');
      service.resetTimer();
      expect(service.subject.next).toHaveBeenCalledWith({
        message: null,
        placement: null,
        seconds: null,
        clickable: null,
      });
    });

    it('should set the timer', () => {
      spyOn(service, 'resetTimer');
      service.seconds = 3;
      jasmine.clock().install();
      service.setTimer();
      jasmine.clock().tick(5000);
      expect(service.resetTimer).toHaveBeenCalled();
      jasmine.clock().uninstall();
    });
  });
});
