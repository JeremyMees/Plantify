import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Product } from '../models/product';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  plants: Array<Product>;
  chosenPlant: any;
  constructor(
    private firebaseService: FirebaseService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.firebaseService
      .getProductsNewFour()
      .subscribe((plants: Array<Product>) => {
        this.plants = plants;
      });
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
