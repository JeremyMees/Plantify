import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';
import { AuthService } from '../auth.service';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';

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
  boughtProducts: Array<Cart>;
  credentials: any;
  input: boolean = false;

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    public router: Router
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
      alert('Please enter a valid email address.');
    } else if (newPassword !== newPasswordc) {
      alert('Passwords are not the same');
    } else if (newName.length < 6) {
      alert('Username is to short');
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

  redirectToProductDetails(product: Cart): void {
    this.router.navigateByUrl(`/product-list/${product.id}`);
  }
}
