import { TestBed } from '@angular/core/testing';

import { TransfersCel2celSendService } from './transfers-cel2cel-send.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { environment as ENV } from '@environment';
import { urlBuilder } from '@commons/utils/url-builder';

describe('TransfersCel2celSendService', () => {
  const setup = (): {
    service: TransfersCel2celSendService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(TransfersCel2celSendService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransfersCel2celSendService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: TransfersCel2celSendService = TestBed.inject(
      TransfersCel2celSendService
    );
    expect(service).toBeTruthy();
  });

  it('should to call fetchTowardProductsByPhoneNumber', () => {
    const { service, httpTestingController } = setup();
    const mockData = {};
    const createUrl = () => {
      const url =
        ENV.api.services.transactions.transfers
          .avvPhoneGetProductsByPhoneNumber;
      return urlBuilder.services(url);
    };
    Object.keys(TransferType).forEach((key) => {
      const payload = {
        phone: '3213444555'
      } as any;
      service.fetchTowardProductsByPhoneNumber(payload).subscribe();
      const req = httpTestingController.expectOne(createUrl());
      req.flush(mockData);
      expect(req.request.method).toBe('POST');
    });
  });
});
