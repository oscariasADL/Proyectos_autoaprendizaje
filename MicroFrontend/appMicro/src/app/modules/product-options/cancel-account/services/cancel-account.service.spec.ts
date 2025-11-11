import { TestBed } from '@angular/core/testing';

import { CancelAccountService } from './cancel-account.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';

describe('CancelAccountService', () => {
  let service: CancelAccountService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CancelAccountService]
    });
    service = TestBed.inject(CancelAccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call cancelAccount', () => {
    const url = urlBuilder.services(ENV.api.services.base.cancel_account);
    const mockData = {};
    const payload = {
      typeAccountCancellation: 'DPT',
      relativeIdProduct: '2323',
      numberProduct: '23231'
    };

    service.cancelAccount(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
