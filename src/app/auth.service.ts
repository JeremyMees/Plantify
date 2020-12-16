import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private cookieService: CookieService) {}

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

  register(name: string, email: string, password: string): void {
    this.setCookie('name', name);
    this.setCookie('email', email);
  }
}
