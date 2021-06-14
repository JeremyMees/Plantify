import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  plants: Array<Product>;
  chosenPlant: Product;
  firebaseSubscription: Subscription;
  constructor(
    private firebaseService: FirebaseService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.firebaseSubscription = this.firebaseService
      .getProductsNewFour()
      .subscribe((plants: Array<Product>) => {
        this.plants = plants;
      });
  }

  ngOnDestroy(): void {
    this.firebaseSubscription.unsubscribe();
  }

  onSelect(plant: Product): void {
    this.router.navigateByUrl(`/product-list/${plant.id}`);
  }

  redirectToProductList(): void {
    this.router.navigateByUrl(`/product-list`);
  }

  redirectToMission(): void {
    this.router.navigateByUrl(`/mission`);
  }
}
