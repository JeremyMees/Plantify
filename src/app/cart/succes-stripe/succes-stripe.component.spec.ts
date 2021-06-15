import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SuccesStripeComponent } from './succes-stripe.component';
import { CookieService } from 'ngx-cookie-service';

describe('SuccesStripeComponent', () => {
  let component: SuccesStripeComponent;
  let fixture: ComponentFixture<SuccesStripeComponent>;
  let fakeService: jasmine.SpyObj<CookieService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccesStripeComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: CookieService,
          useValue: jasmine.createSpyObj('CookieService', ['delete']),
        },
      ],
    }).compileComponents();
    fakeService = TestBed.inject(
      CookieService
    ) as jasmine.SpyObj<CookieService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cookieService to delete cookie', () => {
    component.ngOnInit();
    expect(fakeService.delete).toHaveBeenCalledWith('cart', '/');
  });
});
