import { TestBed } from '@angular/core/testing';

import { TransfersAvalKeyService } from './transfers-aval-key.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment as ENV } from '@environment';
import { urlBuilder } from '@commons/utils/url-builder';
import { TransferType } from '@modules/transfers/entities/transfers.interface';

describe('TransfersAvalKeyServiceService', () => {
  const setup = (): {
    service: TransfersAvalKeyService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(TransfersAvalKeyService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransfersAvalKeyService]
    });
  });

  it('should be created', () => {
    const service: TransfersAvalKeyService = TestBed.inject(
      TransfersAvalKeyService
    );
    expect(service).toBeTruthy();
  });

  it('should to call fetchAccountAvalKey', () => {
    const { service, httpTestingController } = setup();
    const mockData = {};
    const createUrl = () => {
      const url = ENV.api.services.transactions.transfers.accountAvalKey;
      return urlBuilder.services(url);
    };
    Object.keys(TransferType).forEach((key) => {
      const payload = {
        avalKey: '3213444555'
      } as any;
      service.fetchAccountAvalKey(payload).subscribe();
      const req = httpTestingController.expectOne(createUrl());
      req.flush(mockData);
      expect(req.request.method).toBe('POST');
    });
  });
});
