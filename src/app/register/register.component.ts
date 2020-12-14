import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';

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
  constructor(private authService: AuthService) {}

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
    email.includes('@') === false || email.includes('.') === false
      ? (this.colorEmail = 'red')
      : (this.colorEmail = 'green');
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
    if (email.includes('@') === false || email.includes('.') === false) {
      alert('Please enter a valid email address.');
    } else if (password !== passwordc) {
      alert('Passwords are not the same');
    } else if (name.length < 6) {
      alert('Username is to short');
    } else {
      this.authService.register(name, email, password);
    }
  }
}
