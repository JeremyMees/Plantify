import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.default.User>;
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private firebaseAuth: AngularFireAuth,
    private notificationService: NotificationService
  ) {
    this.user = firebaseAuth.authState;

    this.firebaseAuth.onAuthStateChanged((user: any) => {
      if (user) {
        if (user.emailVerified === false) {
          this.sendVerification();
        }
      }
    });
  }

  login(email: string, password: string): void {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setCookie('logged-in', 'true');
        this.router.navigateByUrl('/product-list');
      })
      .catch((err) => {
        this.notificationService.setNotification(
          'Username or password is incorrect',
          'top',
          2,
          'Clickable'
        );
      });
  }

  async logout(): Promise<void> {
    let credentials: any = await this.getUserCredentials();
    this.firebaseAuth
      .signOut()
      .then(() => {
        alert(`logged ${credentials.email} out`);
        this.deleteCookie('logged-in');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  register(name: string, email: string, password: string): any {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value: any) => {
        this.setCookie('logged-in', 'true');
        this.updateUsername(value.user, name);
      })
      .catch((err: any) => {
        console.log('Something went wrong:', err.message);
      });
    this.router.navigateByUrl('/product-list');
  }

  updateUsername(user: any, name: string): void {
    user.updateProfile({ displayName: name });
  }

  async getUserCredentials(): Promise<any> {
    var user = await this.firebaseAuth.currentUser;
    return user;
  }

  async sendVerification(): Promise<any> {
    const user = await this.firebaseAuth.currentUser;
    user
      .sendEmailVerification()
      .then(() => {
        this.notificationService.setNotification(
          'Verification email was sent',
          'top',
          2,
          'Timer'
        );
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  resetPasswordWithEmail(email: string) {
    this.firebaseAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.notificationService.setNotification(
          'Password reset email was sent',
          'top',
          2,
          'Timer'
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async updateUserCredentials(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    const user = await this.firebaseAuth.currentUser;
    if (user.displayName !== name) {
      user.updateProfile({ displayName: name });
    }
    if (user.email !== email) {
      user.updateEmail(email);
    }
    user.updatePassword(password);
  }

  getCookie(name: string): string {
    return this.cookieService.get(name);
  }

  deleteCookie(name: string): void {
    this.cookieService.delete(name);
  }

  setCookie(name: string, value: string): void {
    this.cookieService.set(name, value);
  }

  checkCookie(name: string): boolean {
    return this.cookieService.check(name);
  }
}
