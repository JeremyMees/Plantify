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
  chosenPlant: Product;
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
        this.plantService.getPlantById(+params.id).subscribe((plant) => {
          this.chosenPlant = plant;
        });
      }
    });
    this.plantService
      .getPlants()
      .pipe(take(1))
      .subscribe((value: Array<Product>) => {
        this.plants = value;
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
        console.log('min');
        this.plants[objIndex].quantity = this.plants[objIndex].quantity - 1;
      }
    }
  }

  productToCart(product: Product) {
    this.cartService.addItemToCart(product);
    this.plantService.openModal();
  }

  onSortChange(how: string): void {
    this.plantService.switchProductSorting(how);
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
