import { TestBed } from '@angular/core/testing';

import { AppFacade } from '@app/app.facade';
import { AlertService } from '@commons/services/alert.service';
/*import {
  BarcodeScanner,
  BarcodeScanResult
} from '@ionic-native/barcode-scanner/ngx';*/
import { PaymentServicesError } from '@modules/payments/payment-services/constants/payment-services.constants';
import { NuraCode } from '@modules/payments/payment-services/entities/payment-services.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { ScanBillBarcodeService } from './scan-bill-barcode.service';

describe('ScanBillBarcodeService', () => {
  let service: ScanBillBarcodeService;
  let appFacade: AppFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScanBillBarcodeService,
        { provide: AlertService, useClass: AlertServiceMock },
        { provide: AppFacade, useClass: AppFacadeMock }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(ScanBillBarcodeService);
    appFacade = TestBed.inject(AppFacade);
  });

  const setup = (): {
    nuraCodes: NuraCode[];
  } => {
    return {
      nuraCodes: [
        {
          identity_code: '256142',
          ean_code: '7707209914253',
          service_code: '00000922',
          initial: '23',
          length: '10'
        },
        {
          identity_code: '256142',
          ean_code: '7707209914253',
          service_code: '00000922',
          initial: '23',
          length: '10'
        }
      ]
    };
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*describe('Should mapList', () => {
    const fieldName = 'orgIdNum';
    const mockList = [
      {
        cityInfo: { code: '11002', name: 'Bogotá D.C.' },
        description: 'Bogotá D.C. - Fondo de empleados',
        imageUrl: '',
        isBiller: true,
        name: 'ASO COPROPIETARIOS PAR CERRITA',
        orgIdNum: '00000922'
      }
    ];

    it('Should  return mapped', () => {
      const {
        nuraCodes: [{ service_code }]
      } = setup();

      expect(service.mapList(service_code, mockList, fieldName)).toBeDefined();
    });

    it('Should throw error if list empty', () => {
      const {
        nuraCodes: [{ service_code }]
      } = setup();
      expect(() => {
        service.mapList(service_code, [], fieldName);
      }).toThrow(new Error(PaymentServicesError.agreementLoad));
    });

    it('Should throw error if serviceCode is distinct', () => {
      mockList.push({
        cityInfo: { code: '11001', name: 'Bogotá D.C.' },
        description: 'Bogotá D.C. - Fondo de empleados',
        imageUrl: '',
        isBiller: true,
        name: 'ASO COPROPIETARIOS PAR CERRITO',
        orgIdNum: '00000923'
      });
      expect(() => {
        service.mapList('898776', mockList, fieldName);
      }).toThrow(new Error(PaymentServicesError.agreementFilter));
    });

    it('Should return mapped if list greater than 1', () => {
      const {
        nuraCodes: [{ service_code }]
      } = setup();
      mockList.push({
        cityInfo: { code: '11001', name: 'Bogotá D.C.' },
        description: 'Bogotá D.C. - Fondo de empleados',
        imageUrl: '',
        isBiller: true,
        name: 'ASO COPROPIETARIOS PAR CERRITO',
        orgIdNum: '00000923'
      });
      expect(service.mapList(service_code, mockList, fieldName)).toBeDefined();
    });
  });

  it('should scanBarcode', () => {
    spyOn(service, 'scanBarcode').and.callThrough();
    service.scanBarcode();
    expect(service.scanBarcode).toHaveBeenCalled();
  });*/
});
