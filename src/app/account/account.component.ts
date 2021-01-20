import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';
import { Product } from '../product';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  passwordc: string;
  colorLengthName: string;
  colorEmail: string;
  colorLengthPassword: string;
  colorCheck: string;
  boughtProducts: Array<Product>;
  credentials: any;
  input: boolean = false;

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    public router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.boughtProducts = this.firebaseService.getBoughtProducts();
    this.authService.getUserCredentials().then((credentials) => {
      this.name = credentials.displayName;
      this.email = credentials.email;
    });
  }

  updateToInputs() {
    this.input = true;
  }

  updateInputsNewValue(
    newName: string,
    newEmail: string,
    newPassword: string,
    newPasswordc: string
  ): void {
    if (newEmail.includes('@') === false || newEmail.includes('.') === false) {
      this.notificationService.setNotification(
        'Please enter a valid email address',
        'bottom',
        2,
        'Timer'
      );
    } else if (newPassword !== newPasswordc) {
      this.notificationService.setNotification(
        'Passwords are not the same',
        'bottom',
        2,
        'Timer'
      );
    } else if (newName.length < 6) {
      this.notificationService.setNotification(
        'Username is to short',
        'bottom',
        2,
        'Timer'
      );
    } else {
      this.name = newName;
      this.email = newEmail;
      this.password = newPassword;
      this.input = false;
      this.authService.updateUserCredentials(newName, newEmail, newPassword);
    }
  }

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

  redirectToProductDetails(product: Product): void {
    this.router.navigateByUrl(`/product-list/${product.id}`);
  }
}
