import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { PocketsService } from './pockets.service';
import { PocketMovementPayload } from '@modules/pockets/pages/pocket-movements/entities/pocket-movements.interface';

describe('PocketsService', () => {
  const setup = (): {
    service: PocketsService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(PocketsService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PocketsService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: PocketsService = TestBed.inject(PocketsService);
    expect(service).toBeTruthy();
  });

  it('should to call fetchPockets', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.pocket.all);
    const mockData = {};
    service.fetchPockets().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call fetchPocketDetail', () => {
    const { service, httpTestingController } = setup();
    const mockData = {};
    const payload = {
      pocketId: '',
      pocketType: '',
      parentId: '',
      parentIdType: ''
    };
    const url = urlBuilder.services(ENV.api.services.pocket.detail, {
      parent_account_type: payload.parentIdType,
      parent_account_id: payload.parentId,
      pocket_type: payload.pocketType,
      pocket_id: payload.pocketId
    });
    service.fetchPocketDetail(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call fetchPocketDetailWithReturns', () => {
    const { service, httpTestingController } = setup();
    const mockData = {};
    const payload = {
      parentId: '',
      parentIdType: '',
      pocketId: '',
      pocketType: ''
    };

    const url = urlBuilder.services(ENV.api.services.pocketWithReturns.detail, {
      parentId: payload.parentId,
      parentIdType: payload.parentIdType,
      pocketId: payload.pocketId,
      pocketType: payload.pocketType
    });
    service.fetchPocketDetailWithReturns(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call createPocket', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.pocket.create);
    const mockData = {};
    service.createPocket(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call updatePocket', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.pocket.create);
    const mockData = {};
    service.updatePocket(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('PUT');
  });

  it('should to call transferPocket', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.pocket.transfer);
    const mockData = {};
    service.transferPocket(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call deletePocket', () => {
    const { service, httpTestingController } = setup();
    const mockData = {};
    const payload = {
      pocketId: '',
      pocketType: '',
      parentId: '',
      parentIdType: ''
    };
    const url = urlBuilder.services(ENV.api.services.pocket.delete, {
      parent_account_type: payload.parentIdType,
      parent_account_id: payload.parentId,
      pocket_type: payload.pocketType,
      pocket_id: payload.pocketId
    });
    service.deletePocket(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('DELETE');
  });

  it('should to call movmentsPocket', () => {
    const { service, httpTestingController } = setup();
    const mockData = {};
    const payload: PocketMovementPayload = {
      parentIdRelative: '34567890',
      pocketId: '38',
      startDate: '2023-01-08',
      endDate: '2023-02-08'
    };
    const url = urlBuilder.services(ENV.api.services.pocket.movements);
    service.movementsPocket(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
