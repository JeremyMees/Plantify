import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { NotificationService } from '../services/notification.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  name: string;
  email: string;
  password: string;
  passwordc: string;
  colorLengthName: string;
  colorEmail: string;
  colorLengthPassword: string;
  colorCheck: string;
  boughtProducts: Array<any>;
  credentials: any;
  input: boolean = false;
  authSubscription: Subscription;
  firebaseSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    public router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    let boughtArray: Array<any> = [];
    this.authSubscription = this.authService
      .getUserCredentials()
      .subscribe((credentials: any) => {
        this.name = credentials.displayName;
        this.email = credentials.email;
        this.firebaseSubscription = this.firebaseService
          .getBoughtProducts(credentials.email)
          .subscribe((querySnapshot) => {
            querySnapshot.forEach((doc: any) => {
              boughtArray.push(doc.data());
            });
            this.boughtProducts = boughtArray;
          });
      });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.firebaseSubscription.unsubscribe();
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
    const emailRegex: RegExp =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (emailRegex.test(newEmail) === false) {
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
    const emailRegex: RegExp =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    emailRegex.test(email)
      ? (this.colorEmail = 'green')
      : (this.colorEmail = 'red');
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
