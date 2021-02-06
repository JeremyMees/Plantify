import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Input() colorLengthName: string;
  @Input() colorEmail: string;
  @Input() colorLengthPassword: string;
  @Input() colorCheck: string;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  lengthPassword(event: any) {
    event.target.value.length >= 6
      ? (this.colorLengthPassword = 'green')
      : (this.colorLengthPassword = 'red');
  }

  checkPassword(event: any, password: string) {
    event.target.value !== password
      ? (this.colorCheck = 'red')
      : (this.colorCheck = 'green');
  }

  checkEmail(event: any, email: string): void {
    const emailRegex: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    emailRegex.test(email)
      ? (this.colorEmail = 'green')
      : (this.colorEmail = 'red');
  }

  checkName(event: any, name: string): void {
    event.target.value.length >= 6
      ? (this.colorLengthName = 'green')
      : (this.colorLengthName = 'red');
  }

  register(
    name: string,
    email: string,
    password: string,
    passwordc: string
  ): void {
    const emailRegex: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (emailRegex.test(email) === false) {
      this.notificationService.setNotification(
        'Please enter a valid email address',
        'bottom',
        2,
        'Timer'
      );
    } else if (password !== passwordc) {
      this.notificationService.setNotification(
        'Passwords are not the same',
        'bottom',
        2,
        'Timer'
      );
    } else if (name.length < 6) {
      this.notificationService.setNotification(
        'Username is to short',
        'bottom',
        2,
        'Timer'
      );
    } else {
      this.authService.register(name, email, password);
    }
  }
}
