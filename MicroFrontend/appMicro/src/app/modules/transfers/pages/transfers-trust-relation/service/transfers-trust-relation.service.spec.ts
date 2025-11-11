import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { ProductFactory } from '@testing/factories/product.factory';
import { TransfersTrustRelationService } from './transfers-trust-relation.service';
import { RemoveTrustRelationPayloadFactory } from '@testing/factories/transfiya-trust-relation-remove-payload.factory';

describe('TransfersTrustRelationService', () => {
  const setup = (): {
    service: TransfersTrustRelationService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(TransfersTrustRelationService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransfersTrustRelationService]
    })
  );

  it('should be created', () => {
    const service: TransfersTrustRelationService = TestBed.inject(
      TransfersTrustRelationService
    );
    expect(service).toBeTruthy();
  });

  it('should to call fetchTrustRelations', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.transfiya.trust_relationship_list
    );
    const product = new ProductFactory().create();
    const mockData = {};
    service.fetchTrustRelations(product).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call removeTrustRelation', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.transfiya.trust_relationship_remove
    );
    const trustRelationPayload =
      new RemoveTrustRelationPayloadFactory().create();
    const mockData = {};
    service.removeTrustRelation(trustRelationPayload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
