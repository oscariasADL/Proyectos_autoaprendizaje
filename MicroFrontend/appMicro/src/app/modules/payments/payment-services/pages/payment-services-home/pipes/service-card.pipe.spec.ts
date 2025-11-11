import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { PaymentBillFactory } from '@testing/factories/payment-bill.factory';
import { TestingModule } from '@testing/testing.module';
import { ServiceCardPipe } from './service-card.pipe';

describe('ServiceCardPipe', () => {
  let pipe: ServiceCardPipe;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestingModule],
      providers: [
        {
          provide: TranslateService,
          useValue: { instant: () => 'myKey' }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    const translateService: TranslateService = TestBed.inject(TranslateService);
    pipe = new ServiceCardPipe(translateService);
  });

  it('Create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be correct', () => {
    const val = new PaymentBillFactory().create();
    expect(pipe.transform(val, {})).toBeTruthy();
  });
});
