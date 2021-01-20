import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  placement: string;
  seconds: number;
  message: string;
  clickable: string;
  timer: any;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.returnValues().subscribe((data) => {
      this.message = data.message;
      this.placement = data.placement;
      this.seconds = data.seconds;
      this.clickable = data.clickable;
    });
  }

  closeNotification(): void {
    this.notificationService.closeNotification();
  }
}
