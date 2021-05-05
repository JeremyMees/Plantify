import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SuccesStripeComponent } from './succes-stripe.component';

describe('SuccesStripeComponent', () => {
  let component: SuccesStripeComponent;
  let fixture: ComponentFixture<SuccesStripeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccesStripeComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();
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
