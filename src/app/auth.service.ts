import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(email: string, password: string) {
    if (email === 'test' && password === 'test') {
      document.cookie = `email=${email}`;
      document.cookie = `password=${password}`;
      this.router.navigateByUrl('/product-list');
    } else {
      alert('username or password is incorrect');
    }
  }
}
