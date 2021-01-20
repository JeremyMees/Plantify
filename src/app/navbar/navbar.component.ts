import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isNavbarCollapsed = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  logout(): void {
    this.authService.logout();
  }

  checkLogin(): void {
    this.authService.checkCookie('logged-in')
      ? this.router.navigateByUrl('/account')
      : this.notificationService.setNotification(
          'Log in first',
          'bottom',
          2,
          'Timer'
        );
  }
}
