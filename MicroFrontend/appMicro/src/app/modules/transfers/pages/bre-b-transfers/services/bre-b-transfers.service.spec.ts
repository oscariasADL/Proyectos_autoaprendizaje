import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { BreBTransfersService } from './bre-b-transfers.service';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';

describe('BreBTransfersService', () => {
  const setup = (): {
    service: BreBTransfersService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(BreBTransfersService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BreBTransfersService]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(BreBTransfersService);
    expect(service).toBeTruthy();
  });

  it('should to call addSpiContact', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.contact.spi.add_contact);
    const payload = {} as any;
    const mockData = {};
    service.addSpiContact(payload).subscribe(() => void 0);
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(mockData);
  });

  it('should to call fetchSpiContact', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.contact.spi.contact);
    const payload = '626';
    const mockData = {};
    service.fetchSpiContact(payload).subscribe(() => void 0);
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(mockData);
  });
});
