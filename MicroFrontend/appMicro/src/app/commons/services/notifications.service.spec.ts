import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { TypeAccount } from '@commons/entities/product/type-account';
import { environment as ENV } from '@environment';
import { TransfiyaAuthorizationFactory } from '@testing/factories/transfiya-authorization.factory';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  const payload = {
    account: {
      productType: TypeAccount.SDA,
      productId: '1234'
    }
  };

  const setup = (): {
    service: NotificationsService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(NotificationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationsService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: NotificationsService = TestBed.inject(NotificationsService);
    expect(service).toBeTruthy();
  });

  it('should to call fetchTransfiyaConsignmentsList', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.transfiya.consignments_list
    );
    const mockData = {
      authorizations: [new TransfiyaAuthorizationFactory().create()]
    };
    service.fetchTransfiyaConsignmentsList().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchTransfiyaRequestsList', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.transfiya.requests_list);
    const mockData = {
      authorizations: [new TransfiyaAuthorizationFactory().create()]
    };
    service.fetchTransfiyaRequestsList().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call sendTransfiyaAuthorization', () => {
    const { service, httpTestingController } = setup();
    const isRequest = true;
    const url = urlBuilder.services(
      isRequest
        ? ENV.api.services.transfiya.authorize_transfer
        : ENV.api.services.transfiya.consignments_allow
    );
    const mockData = [new TransfiyaAuthorizationFactory().create()];
    service.acceptTransfiyaAuthorization(payload, isRequest).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call sendTransfiyaAuthorization not request', () => {
    const { service, httpTestingController } = setup();
    const isRequest = false;
    const url = urlBuilder.services(
      isRequest
        ? ENV.api.services.transfiya.authorize_transfer
        : ENV.api.services.transfiya.consignments_allow
    );
    const mockData = [new TransfiyaAuthorizationFactory().create()];
    service.acceptTransfiyaAuthorization(payload, isRequest).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call rejectTransfiyaAuthorization', () => {
    const { service, httpTestingController } = setup();
    const isRequest = true;
    const url = urlBuilder.services(
      isRequest
        ? ENV.api.services.transfiya.refuse_transfer
        : ENV.api.services.transfiya.consignments_allow
    );
    const mockData = [new TransfiyaAuthorizationFactory().create()];
    service.rejectTransfiyaAuthorization(payload, isRequest).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call rejectTransfiyaAuthorization not request', () => {
    const { service, httpTestingController } = setup();
    const isRequest = false;
    const url = urlBuilder.services(
      isRequest
        ? ENV.api.services.transfiya.refuse_transfer
        : ENV.api.services.transfiya.consignments_allow
    );
    const mockData = [new TransfiyaAuthorizationFactory().create()];
    service.rejectTransfiyaAuthorization(payload, isRequest).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
