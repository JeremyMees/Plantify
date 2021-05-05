import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FailureStripeComponent } from './failure-stripe.component';

describe('FailureStripeComponent', () => {
  let component: FailureStripeComponent;
  let fixture: ComponentFixture<FailureStripeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FailureStripeComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailureStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
