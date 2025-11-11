import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TestingModule } from '@testing/testing.module';
import { PaymentCreditCardPipe } from './payment-credit-card.pipe';

describe('PaymentCreditCardPipe', () => {
  let pipe: PaymentCreditCardPipe;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    pipe = new PaymentCreditCardPipe();
  });

  it('Create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be correct', () => {
    const val = {
      loanName: '',
      productType: '',
      productTypeDesc: '',
      numberProduct: '',
      minPaymentAmount: 1000,
      minPaymentReducedAmount: 1000,
      franchise: '',
      cardType: '',
      bankName: '',
      maxPaymentDate: '',
      contactName: '',
      relativeId: '',
      nickname: '',
      bankCode: '',
      totalPaymentAmount: 1000,
      owner: {
        idType: '',
        id: ''
      },
      accountType: '',
      accountId: '',
      bankId: ''
    };
    expect(pipe.transform(val)).toBeTruthy();
  });
});
