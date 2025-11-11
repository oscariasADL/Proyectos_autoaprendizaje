import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, NavController } from '@ionic/angular';
import { PaymentCreditsFacade } from '@modules/payments/payment-credits/payment-credits.facade';
import { PaymentCreditsFacadeMock } from '@testing/mocks/facade/payment-credits.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { PaymentCreditsPage } from './payment-credits.page';
import { PaymentCredit } from '@modules/payments/payment-credits/entities/payment-credits.interface';

describe('PaymentCreditsPage', () => {
  let component: PaymentCreditsPage;
  let fixture: ComponentFixture<PaymentCreditsPage>;
  const navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentCreditsPage, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: PaymentCreditsFacade,
          useClass: PaymentCreditsFacadeMock
        },
        { provide: NavController, useValue: navCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentCreditsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call payCard(card: PaymentCredit)', () => {
    const card: PaymentCredit = {
      contactName: 'Steve Rogers'
    };
    expect(component.payCard(card)).toBeUndefined();
  });

  it('should return Observable<PaymentCredits>, get payments$()', () => {
    expect(component.payments$).toBeDefined();
  });
});
