import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { ModalController } from '@commons/controllers/modal.controller';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { AlertService } from '@commons/services/alert.service';
import { ScanBillBarcodeService } from '@commons/services/scan-bill-barcode.service';
import { SearchBillBarcodeResponse } from '@modules/payments/payment-services/entities/register-service.interface';
import { PaymentBillFactory } from '@testing/factories/payment-bill.factory';
import { PaymentTaxesFacadeMock } from '@testing/mocks/facade/payment-taxes.facade.mock';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { ScanBillBarcodeServiceMock } from '@testing/mocks/services/scan-bill-barcode.service.mock';
import { TestingModule } from '@testing/testing.module';
import { PaymentTaxesFacade } from '../../payment-taxes.facade';
import { PaymentTaxesService } from '../../services/payment-taxes.service';
import { PaymentsTaxesStepCityComponent } from './payments-taxes-step-city.component';

describe('PaymentsTaxesStepCityComponent', () => {
  let modalControllerSpy;
  let component: PaymentsTaxesStepCityComponent;
  let fixture: ComponentFixture<PaymentsTaxesStepCityComponent>;

  beforeEach(waitForAsync(() => {
    modalControllerSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'dismiss'
    ]);
    TestBed.configureTestingModule({
      declarations: [PaymentsTaxesStepCityComponent],
      imports: [TestingModule, HttpClientTestingModule],
      providers: [
        CapitalizePipe,
        PaymentTaxesService,
        { provide: AlertService, useClass: AlertServiceMock },
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: PaymentTaxesFacade, useClass: PaymentTaxesFacadeMock },
        {
          provide: ScanBillBarcodeService,
          useClass: ScanBillBarcodeServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsTaxesStepCityComponent);
    component = fixture.componentInstance;
    component.city = new UntypedFormControl();
    component.agreement = new UntypedFormControl();
    component.reference = new UntypedFormControl();
    component.isBarcode = new UntypedFormControl();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call scan barcode', () => {
    component.scanBarcode2();
    spyOn(component, 'scanBarcode2').and.callThrough();
    expect(component.scanBarcode2).toBeDefined();
  });

  it('should be onSelectCity', () => {
    expect(
      component.onSelectCity({
        code: '1234',
        name: 'Bogota'
      })
    ).toBeUndefined();
  });

  it('should to call to setBillData', () => {
    spyOn(component, 'setBarcodeBillData').and.callThrough();
    const paymentBillFactory = new PaymentBillFactory();
    const bill: SearchBillBarcodeResponse =
      paymentBillFactory.buildBarcodeServiceData();
    expect(component.setBarcodeBillData(bill)).toBeUndefined();
  });
  it('should dismiss the modal and handle barcode data', fakeAsync(() => {
    const barcode = '1234567890';
    const data = { barcode, exit: false };

    const onDidDismissSpy = jasmine
      .createSpy('onDidDismiss')
      .and.returnValue(Promise.resolve({ data }));

    modalControllerSpy.create.and.returnValue({
      present: jasmine.createSpy('present'),
      onDidDismiss: onDidDismissSpy
    });

    component.scanBarcode2();
    flush();

    expect(modalControllerSpy.create).toHaveBeenCalled();
    expect(onDidDismissSpy).toHaveBeenCalled();
  }));
});
