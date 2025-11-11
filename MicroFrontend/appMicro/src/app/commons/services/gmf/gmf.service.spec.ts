import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { GmfService } from './gmf.service';
import { GMFPayload } from '@app/commons/entities/gmf/gmf.interface';

describe('GmfService', () => {
  const setup = (): {
    service: GmfService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(GmfService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GmfService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: GmfService = TestBed.inject(GmfService);
    expect(service).toBeTruthy();
  });

  it('should to call fetchGMF', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.base.gmf);
    const mockData = {};
    const payload: GMFPayload = {
      productNumber: '640846882',
      productType: 'SDA',
      amountTransaction: 100000,
      availableBalance: 100000
    };
    service.fetchGMF(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
