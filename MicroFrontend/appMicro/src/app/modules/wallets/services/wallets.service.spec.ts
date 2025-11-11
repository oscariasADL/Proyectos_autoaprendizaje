import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { WalletsService } from './wallets.service';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';

describe('WalletsService', () => {
  let service: WalletsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WalletsService]
    });
    service = TestBed.inject(WalletsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should to call createWallet', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    const url = urlBuilder.services(ENV.api.services.wallets.createWallet);
    const mockData = {};
    service.createWallet().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call cardList', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    const url = urlBuilder.services(ENV.api.services.wallets.card_list);
    const mockData = {};
    service.fetchCardList().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchPrepareCardEnrollmentData', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    const url = urlBuilder.services(
      ENV.api.services.wallets.prepare_digitization
    );
    const payload = null;
    const mockData = {};
    service.fetchPrepareCardEnrollmentData(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
