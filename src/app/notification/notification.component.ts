import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  placement: string;
  seconds: number;
  message: string;
  clickable: string;
  timer: any;
  notificationSubscription: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService
      .returnValues()
      .subscribe((data) => {
        this.message = data.message;
        this.placement = data.placement;
        this.seconds = data.seconds;
        this.clickable = data.clickable;
      });
  }

  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
  }

  closeNotification(): void {
    this.notificationService.closeNotification();
  }
}
