import { TestBed } from '@angular/core/testing';

import { CustomizeAvalTagService } from './customize-aval-tag.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';

describe('CustomizeAvalTagService', () => {
  const setup = (): {
    service: CustomizeAvalTagService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(CustomizeAvalTagService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomizeAvalTagService]
    });
  });

  it('should be created', () => {
    const service: CustomizeAvalTagService = TestBed.inject(
      CustomizeAvalTagService
    );
    expect(service).toBeTruthy();
  });

  it('should call to modifyAvalTag', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.base.modify_aval_tag);
    const mockData = {};
    service.modifyAvalTag(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
