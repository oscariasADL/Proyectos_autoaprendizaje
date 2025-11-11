import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import {
  CashOutType,
  CASH_OUT_TYPE,
  ChannelType
} from '../entities/withdraw.interface';
import { WithdrawService } from './withdraw.service';

describe('WithdrawService', () => {
  const setup = (): {
    service: WithdrawService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(WithdrawService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WithdrawService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: WithdrawService = TestBed.inject(WithdrawService);
    expect(service).toBeTruthy();
  });

  it('should to call withdraw', () => {
    const { service, httpTestingController } = setup();
    const payload = {
      cashoutType: CashOutType.WITHOUT_CARD,
      channel: ChannelType.ATM,
      sourceProduct: {
        productType: '',
        productId: ''
      },
      amount: 1000
    };
    const url = urlBuilder.services(
      `${ENV.api.services.transactions.withdraw}/${
        CASH_OUT_TYPE[payload.cashoutType]
      }`
    );
    const mockData = {};
    service.withdraw(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
