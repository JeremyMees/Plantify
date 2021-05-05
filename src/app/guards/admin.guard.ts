import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.authGuardAdmin().pipe(
      tap((isAdmin: boolean) => {
        if (!isAdmin) {
          this.router.navigateByUrl('/product-list');
        }
      })
    );
  }
}

// angular firebase auth guard
// functie in auth service die een boolean terug geeft of de gebruiker een admin is
// proberen die map werkende te krijgen https://stackoverflow.com/questions/37948068/angular-2-routing-canactivate-work-with-observable
