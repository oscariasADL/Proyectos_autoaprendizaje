import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { ChangePasswordService } from './change-password.service';

describe('ChangePasswordService', () => {
  const setup = (): {
    service: ChangePasswordService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(ChangePasswordService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChangePasswordService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: ChangePasswordService = TestBed.inject(
      ChangePasswordService
    );
    expect(service).toBeTruthy();
  });

  it('should to call changePassword', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.management.change_password
    );
    const mockData = {};
    service.changePassword(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('PUT');
  });
});
