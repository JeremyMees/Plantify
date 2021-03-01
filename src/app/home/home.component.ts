import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Product } from '../product';

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
    const newArray: Array<Product> = [];
    this.firebaseService.getProductsNewFour().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc: any) => {
        newArray.push(doc.data());
      });
      this.plants = newArray;
    });
  }

  onSelect(plant: Product): void {
    this.router.navigateByUrl(`/product-list/${plant.id}`);
  }

  redirectToProductList(): void {
    this.router.navigateByUrl(`/product-list`);
  }
}
