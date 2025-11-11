import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { AlertService } from '@commons/services/alert.service';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { QrService } from './qr.service';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

describe('QrService', () => {
  let service: QrService;
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        QrService,
        { provide: AlertService, useClass: AlertServiceMock },
        { provide: AppFacade, useClass: AppFacadeMock }
      ]
    })
  );
  beforeEach(() => (service = TestBed.inject(QrService)));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should to call parseQR', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    const url = urlBuilder.services(ENV.api.services.qr.code);
    const mockData = {};
    service.parseQR('').subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
