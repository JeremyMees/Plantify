import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setCookie('logged-in', 'true');
        this.router.navigateByUrl('/product-list');
      })
      .catch((err) => {
        alert('username or password is incorrect');
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
    //this.setCookie('name', name);
    //this.setCookie('email', email);
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value: any) => {
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
