import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { ParameterService } from './parameter.service';

describe('ParameterService', () => {
  const setup = (): {
    service: ParameterService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(ParameterService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ParameterService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: ParameterService = TestBed.inject(ParameterService);
    expect(service).toBeTruthy();
  });

  it('should call fetchParameter', (done) => {
    const { service, httpTestingController } = setup();
    const entity = '';
    const extension = 'json';
    const url = urlBuilder.parameter(ENV.api.services.parameter, {
      entity,
      extension
    });
    const mockData = { data: 'mocked data' };

    service.fetchParameter(entity, extension).subscribe({
      next: (data) => {
        expect(data).toEqual(mockData);
        done();
      },
      error: (error) => {
        fail(`fetchParameter threw an error: ${error}`);
        done();
      }
    });

    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });
});
