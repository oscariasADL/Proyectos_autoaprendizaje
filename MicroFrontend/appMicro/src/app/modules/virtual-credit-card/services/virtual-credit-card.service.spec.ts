import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { VirtualCreditCardService } from './virtual-credit-card.service';
import {
  VirtualCreditCard,
  VirtualCreditCardCreatePayload,
  VirtualCreditCardDetail,
  VirtualCreditCardDetailPayload,
  VirtualCreditCardListPayload,
  VirtualCreditCardOperationPayload
} from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';
import { GenericResponse } from '@app/commons/entities/response/response.interface';
import { urlBuilder } from '@app/commons/utils/url-builder';
import { environment as ENV } from '@environment';

describe('VirtualCreditCardService', () => {
  let service: VirtualCreditCardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VirtualCreditCardService]
    });

    service = TestBed.inject(VirtualCreditCardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchVirtualCreditCards', () => {
    it('should to call request POST and return an array of VirtualCreditCard', () => {
      const mockPayload = {} as VirtualCreditCardListPayload;
      const mockResponse = {
        cards: [{} as VirtualCreditCard, {} as VirtualCreditCard]
      };

      service.fetchVirtualCreditCards(mockPayload).subscribe();

      const req = httpMock.expectOne(
        urlBuilder.services(
          ENV.api.services.management_tcd_server.virtual_credit_card_list
        )
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('fetchVirtualCreditCardDetail', () => {
    it('should to call request POST and return a VirtualCreditCardDetail', () => {
      const mockPayload = {} as VirtualCreditCardDetailPayload;
      const mockResponse = {} as VirtualCreditCardDetail;

      service.fetchVirtualCreditCardDetail(mockPayload).subscribe();

      const req = httpMock.expectOne(
        urlBuilder.services(
          ENV.api.services.management_tcd_server.virtual_credit_card_detail
        )
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('createVirtualCreditCard', () => {
    it('should to call request POST and return a GenericResponse', () => {
      const mockPayload = {} as VirtualCreditCardCreatePayload;
      const mockResponse = {} as GenericResponse;

      service.createVirtualCreditCard(mockPayload).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        urlBuilder.services(
          ENV.api.services.management_tcd_server.virtual_credit_card_create
        )
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('cancelVirtualCreditCard', () => {
    it('should to call request POST and return a GenericResponse', () => {
      const mockPayload = {} as VirtualCreditCardOperationPayload;
      const mockResponse = {} as GenericResponse;

      service.cancelVirtualCreditCard(mockPayload).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        urlBuilder.services(
          ENV.api.services.management_tcd_server.virtual_credit_card_cancel
        )
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('reissueVirtualCreditCard', () => {
    it('should to call request POST and return a GenericResponse', () => {
      const mockPayload = {} as VirtualCreditCardOperationPayload;
      const mockResponse = {} as GenericResponse;

      service.reissueVirtualCreditCard(mockPayload).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        urlBuilder.services(
          ENV.api.services.management_tcd_server.virtual_credit_card_forward
        )
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });
});
