import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { CareChannelsService } from './care-channels.service';

describe('CareChannelsService', () => {
  const setup = (): {
    service: CareChannelsService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(CareChannelsService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CareChannelsService]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: CareChannelsService = TestBed.inject(CareChannelsService);
    expect(service).toBeTruthy();
  });

  it('should fetch adviser information', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.management.preferred_customer
    );
    const mockData = {
      contactName: 'Luis Alberto Chacón Ordoñez',
      contactPhone: '3186453338',
      contactEmail: 'chaconordonez@bancoavvillas.com.co',
      contactJobTitle: 'Ejecutivo'
    };
    service.fetchAdvisor().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });
});
