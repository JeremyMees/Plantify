import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    public translate: TranslateService,
    private firebaseAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  onSidenavClick(): void {
    this.isMenuOpen = false;
  }
}
