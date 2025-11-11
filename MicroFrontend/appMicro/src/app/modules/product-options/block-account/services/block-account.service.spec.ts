import { TestBed } from '@angular/core/testing';

import { BlockAccountService } from './block-account.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { ActivationPayloadRequest } from '@modules/security/security-media-activation/entities/security-media.interface';

describe('BlockAccountService', () => {
  const setup = (): {
    service: BlockAccountService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(BlockAccountService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlockAccountService]
    }).compileComponents();
  });

  it('should be created', () => {
    const service: BlockAccountService = TestBed.inject(BlockAccountService);
    expect(service).toBeTruthy();
  });

  it('should to call fetchProductMedias', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.base.activations);
    const mockData = [];
    service
      .fetchProductMedias()
      .subscribe((resp) => expect(resp).toEqual(resp));
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call sendBlockAccount', () => {
    const url = urlBuilder.services(ENV.api.services.base.block_account);
    const { service, httpTestingController } = setup();
    const payload: {
      relativeId: string;
      lockId: string;
    } = {
      relativeId: '3',
      lockId: '04'
    };
    const mockData = {
      approvalId: '123',
      transactionDate: '',
      name: '',
      code: '',
      description: ''
    };

    service.sendBlockAccount(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
