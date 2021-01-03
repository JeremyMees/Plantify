import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.default.User>;
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private firebaseAuth: AngularFireAuth
  ) {
    this.user = firebaseAuth.authState;
  }

  login(email: string, password: string): void {
    if (email === 'test' && password === 'test') {
      this.setCookie('email', email);
      this.router.navigateByUrl('/product-list');
    } else {
      alert('username or password is incorrect');
    }
  }

  logout(): void {
    let email: string = this.getCookie('email');
    alert(`logged ${email} out`);
    this.deleteCookie('email');
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

  getUserCredentials(): User {
    return {
      username: 'testname',
      email: 'test@email.com',
      password: 'testpassword',
    };
  }

  register(name: string, email: string, password: string): any {
    this.setCookie('name', name);
    this.setCookie('email', email);
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value: any) => {
        console.log(value);
        console.log(value.user);
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
}
