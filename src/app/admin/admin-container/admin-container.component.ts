import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Admin } from '../../models/admin';
import { FirebaseService } from '../../services/firebase.service';
import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss'],
})
export class AdminContainerComponent implements OnInit, OnDestroy {
  plants: Array<Product>;
  ids: Array<string>;
  chosenProduct: Product;
  chosenProductID: string;
  switch: boolean = false;
  chosenAdmin: Admin;
  admins: Array<Admin>;
  adminsID: Array<string>;
  chosenAdminID: string;
  authSubscription: Subscription;
  firebaseSubscription: Subscription;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.firebaseSubscription = this.firebaseService
      .getProductsFromDB()
      .subscribe((value: Array<any>) => {
        this.plants = value[0];
        this.ids = value[1];
      });
    this.authSubscription = this.authService
      .getAdminsFromDB()
      .subscribe((value: Array<any>) => {
        this.admins = value[0];
        this.adminsID = value[1];
      });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.firebaseSubscription.unsubscribe();
  }

  addNewProduct(newProductArray: Array<Product>): void {
    this.firebaseService.addNewProductToDB(newProductArray);
    this.ngOnInit();
  }

  deleteProduct(plant: Product): void {
    this.firebaseService.deleteProductfromDB(plant.id);
    this.ngOnInit();
  }

  updateProduct(updateArray: Array<Product>): void {
    this.firebaseService.updateProductfromDB(updateArray, this.chosenProductID);
    this.ngOnInit();
  }

  productToUpdate(product: Product): void {
    this.chosenProduct = product;
    const arrIndex = this.plants.findIndex(
      (plant: Product) => plant === product
    );
    this.chosenProductID = this.ids[arrIndex];
  }

  switchContent(input: boolean): void {
    this.switch = input;
  }

  adminToUpdate(admin: Admin): void {
    this.chosenAdmin = admin;
    const arrIndex = this.admins.findIndex((user: Admin) => user === admin);
    this.chosenAdminID = this.adminsID[arrIndex];
  }

  updateAdmin(email: string): void {
    this.authService.updateAdminDB(email, this.chosenAdminID);
    this.switch = true;
    this.ngOnInit();
  }

  addNewAdmin(email: string): void {
    this.authService.addNewAdminToDB(email);
    this.switch = true;
    this.ngOnInit();
  }

  adminToDelete(admin: Admin): void {
    this.authService.deleteAdminfromDB(admin.id);
    this.switch = true;
    this.ngOnInit();
  }
}
