import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //cookieExists: boolean = this.authService.chekCookie('email');

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
