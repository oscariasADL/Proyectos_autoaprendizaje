import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { UpdatePasswordService } from './update-password.service';

describe('UpdatePasswordService', () => {
  const setup = (): {
    service: UpdatePasswordService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(UpdatePasswordService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UpdatePasswordService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: UpdatePasswordService = TestBed.inject(
      UpdatePasswordService
    );
    expect(service).toBeTruthy();
  });

  it('should to call UpdatePasswordService', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.auth.change_expired_password
    );
    const mockData = {};
    service.updatePassword(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
