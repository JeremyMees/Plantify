import { Component, OnInit, Input } from '@angular/core';
import { Cart } from '../cart';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @Input() name: string;
  @Input() email: string;
  @Input() password: string;
  boughtProducts: Array<Cart>;
  credentials: Array<string>;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    /*this.boughtProducts = this.authService.getBoughtProducts();
    this.credentials = this.authService.getUserCredentials();
    this.name = this.credentials[0];
    this.email = this.credentials[1];
    this.password = this.credentials[2];*/
  }
}
