import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FilterMove } from '@commons/entities/product/movement.interface';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { mapMovementsPayload } from '../mappers/movements.mapper';
import { MovementService } from './movement.service';

describe('MovementService', () => {
  const setup = (): {
    service: MovementService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(MovementService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovementService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: MovementService = TestBed.inject(MovementService);
    expect(service).toBeTruthy();
  });

  it('should to call fetchMovements', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.base.movements);
    const mockData = {};
    service.fetchMovements().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchMovementsDetail', () => {
    const { service, httpTestingController } = setup();
    const payload = mapMovementsPayload({
      id: '123',
      params: {
        page: 1,
        pageSize: 1,
        currency: '',
        startDate: '',
        endDate: '',
        state: FilterMove.All
      }
    });
    const url =
      urlBuilder.services(ENV.api.services.base.movements_detail, {
        id: payload.id
      }) + '?page=1&pageSize=1&currency=&startDate=&endDate=';
    const mockData = {};
    service.fetchMovementsDetail(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });
});
