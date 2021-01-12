import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  forgot: boolean = false;
  constructor(private authService: AuthService) {}

  login(email: string, password: string) {
    this.authService.login(email, password);
  }

  forgotPassword(): void {
    this.forgot = true;
  }

  resetPassword(email: string): void {
    this.forgot = false;
    this.authService.resetPasswordWithEmail(email);
  }
}
