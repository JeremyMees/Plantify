import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SuccesStripeComponent } from './succes-stripe.component';
import { CartService } from '../../services/cart.service';

describe('SuccesStripeComponent', () => {
  let component: SuccesStripeComponent;
  let fixture: ComponentFixture<SuccesStripeComponent>;
  let fakeService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccesStripeComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: CartService,
          useValue: jasmine.createSpyObj('CartService', ['deleteCookie']),
        },
      ],
    }).compileComponents();
    fakeService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
