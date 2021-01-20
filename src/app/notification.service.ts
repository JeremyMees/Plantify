import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notification } from './notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  placement: string;
  seconds: number;
  message: string;
  clickable: string;
  timer: any;
  public subject = new Subject<Notification>();

  returnValues(): Observable<Notification> {
    return this.subject.asObservable();
  }

  setNotification(
    message: string,
    placement: string,
    seconds: number,
    clickable: string
  ): void {
    this.message = message;
    this.placement = placement;
    this.seconds = seconds;
    this.clickable = clickable;
    if (clickable == 'Timer') {
      this.setTimer();
    }
    this.subject.next({
      message: this.message,
      placement: this.placement,
      seconds: this.seconds,
      clickable: this.clickable,
    });
  }

  closeNotification(): void {
    this.subject.next({
      message: null,
      placement: null,
      seconds: null,
      clickable: null,
    });
  }

  resetTimer(): void {
    this.subject.next({
      message: null,
      placement: null,
      seconds: null,
      clickable: null,
    });
    clearTimeout(this.timer);
  }

  setTimer(): void {
    this.timer = setTimeout(() => {
      this.resetTimer();
    }, this.seconds * 1000);
  }
}
