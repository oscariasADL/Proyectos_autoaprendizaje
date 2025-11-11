import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { TransferType } from '../entities/transfers.interface';
import { TransfersService } from './transfers.service';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { of } from 'rxjs';

describe('TransfersService', () => {
  const setup = (): {
    service: TransfersService;
    httpTestingController: HttpTestingController;
    facade: AppFacade;
  } => {
    const service = TestBed.inject(TransfersService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    const facade = TestBed.inject(AppFacade) as jasmine.SpyObj<AppFacade>;
    return { service, httpTestingController, facade };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TransfersService,
        CapitalizePipe,
        { provide: AppFacade, useClass: AppFacadeMock }
      ]
    })
  );

  it('should be created', () => {
    const service: TransfersService = TestBed.inject(TransfersService);
    expect(service).toBeTruthy();
  });

  it('should to call Transfers', () => {
    const { service, httpTestingController, facade } = setup();
    facade.userData$ = of({
      lastAuthDate: '',
      currentDate: '',
      lastIPAddress: '',
      migrate: '',
      dataBasicClientDto: {
        firstname: 'Severus',
        lastName: 'Snape'
      }
    });
    const mockData = {};
    const createUrl = (transferType: TransferType) => {
      let url = ENV.api.services.transactions.transfers.own;
      switch (transferType) {
        case TransferType.MY_ACCOUNTS_AVV:
          url = ENV.api.services.transactions.transfers.own;
          break;
        case TransferType.MY_CONTACTS:
          url = ENV.api.services.transactions.transfers.contacts;
          break;
        case TransferType.FAST_TRANSFER:
          url = ENV.api.services.transactions.transfers.fast;
          break;
        /*case TransferType.SEND_TRANSFIYA:
          url = ENV.api.services.transactions.transfiya_debit;
          break;*/
        case TransferType.REQUEST_TRANSFIYA:
          url = ENV.api.services.transactions.transfiya_request;
          break;
        case TransferType.REQUEST_CEL2CEL:
          url = ENV.api.services.transactions.transfiya_request;
          break;
        case TransferType.SEND_CEL2CEL:
        case TransferType.SEND_TRANSFIYA:
        case TransferType.SEND_AVAL_KEY:
          url = ENV.api.services.transactions.transfers.avvCel2cel;
          break;
        case TransferType.SEND_AVV_PHONE:
          url = ENV.api.services.transactions.transfers.avvPhone;
          break;
      }
      return urlBuilder.services(url);
    };
    Object.keys(TransferType).forEach((key) => {
      if (TransferType[key] === TransferType.SEND_BRE_B) return;
      const transferType = TransferType[key];
      const payload = {
        transferType
      } as any;
      service.transfer(payload).subscribe();
      const req = httpTestingController.expectOne(createUrl(transferType));
      req.flush(mockData);
      expect(req.request.method).toBe('POST');
    });
  });
  it('should set default "-" values for missing device and fingerprint information', () => {
    const { service, httpTestingController, facade } = setup();
    (facade as any).deviceInfo$ = { currentValue: () => ({}) };
    (facade as any).transfiyaFingerprint$ = {
      currentValue: () => ({ Geolocation: {} })
    };
    (facade as any).userData$ = {
      currentValue: () => ({
        dataBasicClientDto: {
          firstName: 'John',
          lastName: 'Doe'
        }
      })
    };
    service
      .transfer({
        transferType: TransferType.FAST_TRANSFER,
        targetNumber: '1',
        sourceAccount: { productType: 'sadasd', productId: 'asdasd' },
        targetAccount: { productType: 'sadasd', productId: 'asdasd' },
        contactInfo: {
          contactId: { id: '2', idType: '3' },
          accountInfo: {
            productType: '3',
            productId: '3',
            bank: 'asdasd'
          }
        }
      })
      .subscribe();
    const req = httpTestingController.expectOne(
      urlBuilder.services(ENV.api.services.transactions.transfers.fast)
    );
    const requestBody = req.request.body;
    expect(requestBody.deviceAdmin).toEqual({
      brand: '-',
      osDevice: '-',
      devModel: '-',
      simCard: {
        operator: '-',
        simCardId: '-'
      },
      locationInfo: {
        countryName: '-',
        cityName: '-',
        geoLocation: '-'
      }
    });
    req.flush({});
  });
});
