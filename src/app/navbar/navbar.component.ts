import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  authSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService
      .isUserLoggedIn()
      .subscribe((response: boolean) => {
        this.isLoggedIn = response;
      });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }

  onSidenavClick(): void {
    this.isMenuOpen = false;
  }
}
