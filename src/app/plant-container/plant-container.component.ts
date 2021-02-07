import { Component, OnInit } from '@angular/core';
import { PlantService } from '../plant.service';
import { FirebaseService } from '../firebase.service';
import { CartService } from '../cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Product } from '../product';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-plant-container',
  templateUrl: './plant-container.component.html',
  styleUrls: ['./plant-container.component.scss'],
})
export class PlantContainerComponent implements OnInit {
  plants: Array<Product>;
  chosenPlant: any;
  products: Array<Product>;
  id: number;
  destroy$ = new Subject();

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private plantService: PlantService,
    private cartService: CartService,
    private firebaseService: FirebaseService,
    private notificationService: NotificationService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (+params.id >= 0) {
        this.firebaseService
          .getProductfromDBByID(+params.id)
          .subscribe((querySnapshot) => {
            querySnapshot.forEach((doc: any) => {
              this.chosenPlant = doc.data();
            });
          });
      }
    });
    const newArray: Array<Product> = [];
    this.firebaseService.getProductsNewAll().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc: any) => {
        newArray.push(doc.data());
      });
      this.plants = newArray;
    });
  }

  onPlantChange(plant: Product): void {
    this.router.navigateByUrl(`/product-list/${plant.id}`);
  }

  onQuantityChange(change: Array<number>) {
    const objIndex = this.plants.findIndex(
      (plant: Product) => plant.id === change[1]
    );
    if (change[0] === 1) {
      this.plants[objIndex] = {
        ...this.plants[objIndex],
        quantity: this.plants[objIndex].quantity + 1,
      };
      this.chosenPlant = { ...this.plants[objIndex] };
    } else {
      /* istanbul ignore if  */
      if (this.plants[objIndex].quantity <= 1) {
        this.notificationService.setNotification(
          "Can't go lower than one",
          'top',
          2,
          'Timer'
        );
      } else {
        this.plants[objIndex] = {
          ...this.plants[objIndex],
          quantity: this.plants[objIndex].quantity - 1,
        };
        this.chosenPlant = { ...this.plants[objIndex] };
      }
    }
  }

  productToCart(product: Product) {
    this.cartService.addItemToCart(product);
    this.plantService.openModal();
  }

  onSortChange(how: string): void {
    if (how === 'high') {
      const highArray: Array<Product> = [];
      this.firebaseService.getProductsHighAll().subscribe((querySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          highArray.push(doc.data());
        });
        this.plants = highArray;
        this.router.navigate(['/product-list']);
      });
    } else if (how === 'low') {
      const lowArray: Array<Product> = [];
      this.firebaseService.getProductsLowAll().subscribe((querySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          lowArray.push(doc.data());
        });
        this.plants = lowArray;
        this.router.navigate(['/product-list']);
      });
    } else {
      const newArray: Array<Product> = [];
      this.firebaseService.getProductsNewAll().subscribe((querySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          newArray.push(doc.data());
        });
        this.plants = newArray;
        this.router.navigate(['/product-list']);
      });
    }
  }

  redirectToProductList(): void {
    this.router.navigateByUrl(`/product-list`);
  }

  searchProduct(string: string): void {
    string.length === 0
      ? alert('Need name to search')
      : this.firebaseService.searchProductByName(string);
  }
}
