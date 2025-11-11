import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { CardAdvanceService } from './card-advance.service';

describe('CardAdvanceService', () => {
  const setup = (): {
    service: CardAdvanceService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(CardAdvanceService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardAdvanceService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: CardAdvanceService = TestBed.inject(CardAdvanceService);
    expect(service).toBeTruthy();
  });

  it('should to call cardAdvance', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.transactions.card_advance);
    const mockData = {};
    service.cardAdvance(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
