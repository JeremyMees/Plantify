import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../admin';
import { FirebaseService } from '../firebase.service';
import { Product } from '../product';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss'],
})
export class AdminContainerComponent implements OnInit {
  plants: Array<Product>;
  ids: Array<string>;
  chosenProduct: Product;
  chosenProductID: string;
  switch: boolean = false;
  chosenAdmin: Admin;
  admins: Array<Admin>;
  adminsID: Array<string>;
  chosenAdminID: string;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.authService.getUserCredentials().then((credentials) => {
    //   if (credentials == null) {
    //     this.router.navigateByUrl('/product-list');
    //   } else {
    // this.authService
    //   .checkAdmin(credentials.email)
    //   .subscribe((querySnapshot) => {
    //     if (querySnapshot.empty) {
    //       this.router.navigateByUrl('/product-list');
    //     } else {
    //querySnapshot.forEach((doc: any) => {
    this.firebaseService.getProductsFromDB().subscribe((value: Array<any>) => {
      this.plants = value[0];
      this.ids = value[1];
    });
    this.authService.getAdminsFromDB().subscribe((value: Array<any>) => {
      this.admins = value[0];
      this.adminsID = value[1];
    });
    //     });
    //   }
    // });
    //   }
    // });
  }

  addNewProduct(newProductArray: Array<Product>): void {
    this.firebaseService.addNewProductToDB(newProductArray);
  }

  deleteProduct(plant: Product): void {
    this.firebaseService.deleteProductfromDB(plant.id);
  }

  updateProduct(updateArray: Array<Product>): void {
    this.firebaseService.updateProductfromDB(updateArray, this.chosenProductID);
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
  }

  addNewAdmin(email: string): void {
    this.authService.addNewAdminToDB(email);
  }

  adminToDelete(admin: Admin): void {
    this.authService.deleteAdminfromDB(admin.id);
  }
}
