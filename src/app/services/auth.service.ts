import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { NotificationService } from './notification.service';
import { Admin } from '../models/admin';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<any>;
  adminsArray: Array<string>;
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private firebaseAuth: AngularFireAuth,
    private notificationService: NotificationService,
    private firestore: AngularFirestore
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
        this.router.navigateByUrl('/home');
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

  logout(): void {
    this.firebaseAuth
      .signOut()
      .then(() => {
        this.notificationService.setNotification(
          'User is logged out',
          'bottom',
          2,
          'Timer'
        );
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
    this.router.navigateByUrl('/home');
  }

  updateUsername(user: any, name: string): void {
    user.updateProfile({ displayName: name });
  }

  getUserCredentials(): any {
    return this.user;
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

  getAdminsFromDB(): Observable<Array<Array<Admin> | Array<string>>> {
    let adminsArray = [];
    let adminsIdArray = [];
    this.firestore
      .collection('admins')
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          adminsArray.push(doc.data());
          adminsIdArray.push(doc.id);
        });
        this.adminsArray = adminsArray;
      });
    return of([adminsArray, adminsIdArray]);
  }

  updateAdminDB(email: string, id: string): void {
    this.firestore.collection('admins').doc(id).update({
      email: email,
    });
  }

  addNewAdminToDB(email: string): void {
    const adminsArray: Array<Admin> = [];
    const emailRegex: RegExp =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (emailRegex.test(email)) {
      this.highestAdminID().subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          adminsArray.push(doc.data());
        });
        const newAdmin = {
          email: email,
          id: adminsArray[0].id + 1,
        };
        this.firestore.collection('admins').add(newAdmin);
      });
    } else {
      this.notificationService.setNotification(
        'Please enter a valid email address',
        'bottom',
        2,
        'Timer'
      );
    }
  }

  highestAdminID(): Observable<any> {
    return this.firestore
      .collection('admins', (ref) => ref.orderBy('id', 'desc'))
      .get();
  }

  deleteAdminfromDB(id: number): void {
    this.firestore
      .collection('admins', (ref) => ref.where('id', '==', id))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.firestore.collection('admins').doc(`${doc.id}`).delete();
          this.notificationService.setNotification(
            'Admin was deleted successfully',
            'bottom',
            2,
            'Timer'
          );
        });
      });
  }

  checkAdmin(email: string): Observable<boolean> {
    return this.firestore
      .collection('admins', (ref) => ref.where('email', '==', email))
      .get()
      .pipe(
        map((value: any) => {
          return !value.empty;
        })
      );
  }

  isLoggedIn(): Observable<any> {
    return this.firebaseAuth.authState.pipe(first());
  }

  authGuardAdmin(): Observable<boolean> {
    return this.isLoggedIn().pipe(
      switchMap((user: any) => {
        if (user) {
          return this.checkAdmin(user.email);
        } else {
          return of(false);
        }
      })
    );
  }

  isUserLoggedIn(): Observable<any> {
    return this.firebaseAuth.authState.pipe(
      switchMap((user: any) => {
        if (user) {
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }
}
