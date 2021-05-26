import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-succes-stripe',
  templateUrl: './succes-stripe.component.html',
  styleUrls: ['./succes-stripe.component.scss'],
})
export class SuccesStripeComponent implements OnInit {
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.deleteCookie('cart');
  }
}
