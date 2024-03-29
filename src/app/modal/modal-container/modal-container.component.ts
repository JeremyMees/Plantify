import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
})
export class ModalContainerComponent {
  constructor(public router: Router) {}

  redirectToShoppingcart(): void {
    this.router.navigateByUrl(`/shopping-cart`);
  }

  redirectToProductList(): void {
    this.router.navigateByUrl(`/product-list`);
  }
}
