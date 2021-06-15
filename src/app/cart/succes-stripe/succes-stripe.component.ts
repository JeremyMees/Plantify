import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-succes-stripe',
  templateUrl: './succes-stripe.component.html',
  styleUrls: ['./succes-stripe.component.scss'],
})
export class SuccesStripeComponent implements OnInit {
  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.cookieService.delete('cart', '/');
  }
}
