import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { TransfersAccountDefaultService } from './transfers-account-default.service';
import { environment as ENV } from '@environment';
import { urlBuilder } from '@commons/utils/url-builder';

describe('TransfersAccountDefaultService', () => {
  const setup = (): {
    service: TransfersAccountDefaultService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(TransfersAccountDefaultService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  let service: TransfersAccountDefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransfersAccountDefaultService]
    });
    service = TestBed.inject(TransfersAccountDefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should to call fetchDefaultAccount', () => {
    const { service, httpTestingController } = setup();
    const mockData = {};
    const createUrl = () => {
      const url = ENV.api.services.transfiya.default_account;
      return urlBuilder.services(url);
    };
    service.fetchDefaultAccount().subscribe();
    const req = httpTestingController.expectOne(createUrl());
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call deleteDefaultAccount', () => {
    const { service, httpTestingController } = setup();
    const mockData = {};
    const createUrl = () => {
      const url = ENV.api.services.transfiya.default_account_delete;
      return urlBuilder.services(url);
    };
    service.deleteDefaultAccount().subscribe();
    const req = httpTestingController.expectOne(createUrl());
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
