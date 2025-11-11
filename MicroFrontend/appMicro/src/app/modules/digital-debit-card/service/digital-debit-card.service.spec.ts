import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { DigitalDebitCardService } from './digital-debit-card.service';
import {
  DigitalDebitCardCreatePayload,
  DigitalDebitCardEditPayload
} from '@modules/digital-debit-card/entities/digital-debit-card.interface';

describe('DigitalDebitCardService', () => {
  const setup = (): {
    service: DigitalDebitCardService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(DigitalDebitCardService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DigitalDebitCardService]
    })
  );

  it('should be created', () => {
    const service: DigitalDebitCardService = TestBed.inject(
      DigitalDebitCardService
    );
    expect(service).toBeTruthy();
  });

  it('should to call createDigitalDebitCard', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.management.digital_debit_card_create
    );
    const payload = {
      relativeId: '1',
      amount: 123,
      nickName: '123'
    };
    const mockData = {};
    service.createDigitalDebitCard(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call fetchDigitalDebitCards', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.management.digital_debit_card_list
    );
    const mockData = {};
    service.fetchDigitalDebitCards().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchDigitalDebitCards', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.management.digital_debit_card_detail,
      {
        relative_parent_id: '123'
      }
    );
    const product = {
      relativeParentId: '123',
      numberProductParent: '123',
      numberDigitalCard: '123',
      name: 'Prueba'
    };
    const mockData = {};
    service.fetchDigitalDebitCardDetail(product.relativeParentId).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call editDigitalDebitCard', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.management.digital_debit_card_edit
    );
    const payload: DigitalDebitCardEditPayload = {
      relativeIdParent: '123',
      amount: 100000,
      nickName: 'test'
    };
    const mockData = {};
    service.editDigitalDebitCard(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
