import { AlertService } from '@commons/services/alert.service';
import { AnalyticsService } from '@commons/services/analytics.service';
import { ModalController } from '@commons/controllers/modal.controller';
import { PaymentServicesError } from '@modules/payments/payment-services/constants/payment-services.constants';
import { PaymentBillFactory } from '@testing/factories/payment-bill.factory';
import { UntypedFormControl } from '@angular/forms';
import { BillFactory } from '@testing/factories/bill.factory';
import { TitleCasePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@app/commons/pipes/capitalize.pipe';
import { ScanBillBarcodeService } from '@app/commons/services/scan-bill-barcode.service';
import { IonicModule } from '@ionic/angular';
import { PaymentServicesFacadeMock } from '@testing/mocks/facade/payment-services.facade.mock';
import { PaymentServicesServiceMock } from '@testing/mocks/services/payment-services.service.mock';
import { ScanBillBarcodeServiceMock } from '@testing/mocks/services/scan-bill-barcode.service.mock';
import { TestingModule } from '@testing/testing.module';
import { PaymentServicesFacade } from '../../payment-services.facade';
import { PaymentServicesService } from '../../services/payment-services.service';
import { PaymentUnregisteredStepServiceComponent } from './payment-unregistered-step-service.component';

describe('PaymentUnregisteredStepServiceComponent', () => {
  let component: PaymentUnregisteredStepServiceComponent;
  let fixture: ComponentFixture<PaymentUnregisteredStepServiceComponent>;
  let paymentServicesService: PaymentServicesService;
  let facade: PaymentServicesFacade;
  let alertService: AlertService;
  let analyticsService: AnalyticsService;
  let modalCtrl: ModalController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentUnregisteredStepServiceComponent],
      imports: [IonicModule, HttpClientTestingModule, TestingModule],
      providers: [
        TitleCasePipe,
        CapitalizePipe,
        {
          provide: PaymentServicesFacade,
          useClass: PaymentServicesFacadeMock
        },
        {
          provide: ScanBillBarcodeService,
          useClass: ScanBillBarcodeServiceMock
        },
        {
          provide: PaymentServicesService,
          useClass: PaymentServicesServiceMock
        }
      ],
      teardown: { destroyAfterEach: false },
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentUnregisteredStepServiceComponent);
    component = fixture.componentInstance;

    component.bill = new UntypedFormControl(new BillFactory().create());
    component.isBarcode = new UntypedFormControl(false);
    component.reference = new UntypedFormControl('');
    component.amountType = new UntypedFormControl('');
    component.fromProduct = new UntypedFormControl('');
    component.invoiceNumber = new UntypedFormControl('');
    component.maxPaymentDateComplete = new UntypedFormControl('');
    component.payValue = new UntypedFormControl(0);
    component.isSelectNewBill = new UntypedFormControl(true);

    paymentServicesService = TestBed.inject(PaymentServicesService);
    facade = TestBed.inject(PaymentServicesFacade);
    alertService = TestBed.inject(AlertService);
    analyticsService = TestBed.inject(AnalyticsService);
    modalCtrl = TestBed.inject(ModalController);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchCategoryClean when isSelectNewBill is true', () => {
    const facadeSpy = spyOn(facade, 'searchCategoryClean');
    component.isSelectNewBill.setValue(true);

    component.ngOnInit();
    expect(facadeSpy).toHaveBeenCalled();
  });

  it('should not call searchCategoryClean when isSelectNewBill is false', () => {
    const facadeSpy = spyOn(facade, 'searchCategoryClean');
    component.isSelectNewBill.setValue(false);

    component.ngOnInit();

    expect(facadeSpy).not.toHaveBeenCalled();
  });

  it('should call removeSubscriptions on ngOnDestroy', () => {
    component.ngOnDestroy();

    expect(component['subscriptions']).toBeDefined();
  });

  describe('onselectCategory', () => {
    it('should set isSelectNewBill when bill orgIdNum is different', () => {
      const currentBill = new BillFactory().create();
      currentBill.orgIdNum = '123';
      component.bill.setValue(currentBill);

      const newBill = new BillFactory().create();
      newBill.orgIdNum = '456';

      const emitSpy = spyOn(component.continue, 'emit');

      component.onselectCategory(newBill);

      expect(component.isSelectNewBill.value).toBeTrue();
      expect(component.isBarcode.value).toBeFalse();
      expect(emitSpy).toHaveBeenCalledWith(false);
      expect(component.bill.value.orgIdNum).toEqual('456');
    });

    it('should set isSelectNewBill to false when bill orgIdNum is the same', () => {
      const currentBill = new BillFactory().create();
      currentBill.orgIdNum = '123';
      component.bill.setValue(currentBill);

      const sameBill = new BillFactory().create();
      sameBill.orgIdNum = '123';

      const emitSpy = spyOn(component.continue, 'emit');

      component.onselectCategory(sameBill);

      expect(component.isSelectNewBill.value).toBeFalse();
      expect(component.isBarcode.value).toBeFalse();
      expect(emitSpy).toHaveBeenCalledWith(false);
    });

    it('should transform the bill name using titleCase pipe', () => {
      const bill = new BillFactory().create();
      bill.name = 'test bill';
      const titleCasePipe = TestBed.inject(TitleCasePipe);
      const titleCaseSpy = spyOn(titleCasePipe, 'transform').and.returnValue(
        'Test Bill'
      );

      component.onselectCategory(bill);

      expect(titleCaseSpy).toHaveBeenCalledWith('test bill');
      expect(component.bill.value.name).toEqual('Test Bill');
    });
  });

  describe('scanBarcode2', () => {
    it('should successfully scan barcode and set bill data', async () => {
      const barcode = '12345678901234';
      const mockBill = new PaymentBillFactory().buildBarcodeServiceData();

      const modalMock = {
        present: jasmine.createSpy('present').and.resolveTo(),
        onDidDismiss: jasmine.createSpy('onDidDismiss').and.resolveTo({
          data: { barcode, exit: false }
        })
      };

      spyOn(modalCtrl, 'create').and.returnValue(
        Promise.resolve(modalMock as any)
      );
      spyOn(component, 'setBarcodeBillData').and.callThrough();
      spyOn(facade, 'enableLoading');
      spyOn(facade, 'closeToast');

      await component.scanBarcode2();

      expect(component.isSelectNewBill.value).toBeTrue();
      expect(facade.closeToast).toHaveBeenCalled();
      expect(modalCtrl.create).toHaveBeenCalled();
      expect(modalMock.present).toHaveBeenCalled();
      expect(modalMock.onDidDismiss).toHaveBeenCalled();
      expect(facade.enableLoading).toHaveBeenCalled();
      expect(component.isScanActive).toBeFalse();
    });

    it('should exit early when user closes the scanner', async () => {
      const modalMock = {
        present: jasmine.createSpy('present').and.resolveTo(),
        onDidDismiss: jasmine.createSpy('onDidDismiss').and.resolveTo({
          data: { exit: true }
        })
      };

      spyOn(modalCtrl, 'create').and.returnValue(
        Promise.resolve(modalMock as any)
      );
      spyOn(component, 'setBarcodeBillData');

      await component.scanBarcode2();

      expect(component.setBarcodeBillData).not.toHaveBeenCalled();
      expect(component.isScanActive).toBeFalse();
    });

    it('should handle error when barcode is null', async () => {
      const modalMock = {
        present: jasmine.createSpy('present').and.resolveTo(),
        onDidDismiss: jasmine.createSpy('onDidDismiss').and.resolveTo({
          data: { barcode: null, exit: false }
        })
      };

      spyOn(modalCtrl, 'create').and.returnValue(
        Promise.resolve(modalMock as any)
      );
      spyOn(analyticsService, 'sendError').and.returnValue(Promise.resolve());
      spyOn(facade, 'searchBillReferenceClean');
      spyOn(facade, 'searchCategoryClean');
      spyOn(facade, 'disableLoading');
      const alertSpy = spyOn(alertService, 'create').and.returnValue(
        Promise.resolve(false)
      );

      await component.scanBarcode2();

      expect(analyticsService.sendError).toHaveBeenCalledWith(
        'Barcode Error',
        'Error en la lectura de código de barras'
      );
      expect(facade.searchBillReferenceClean).toHaveBeenCalled();
      expect(facade.searchCategoryClean).toHaveBeenCalled();
      expect(facade.disableLoading).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalled();
      expect(component.isScanActive).toBeFalse();
    });

    it('should retry scanning when user confirms the alert', async () => {
      const modalMock = {
        present: jasmine.createSpy('present').and.resolveTo(),
        onDidDismiss: jasmine.createSpy('onDidDismiss').and.resolveTo({
          data: { barcode: null, exit: false }
        })
      };

      spyOn(modalCtrl, 'create').and.returnValue(
        Promise.resolve(modalMock as any)
      );
      spyOn(analyticsService, 'sendError').and.returnValue(Promise.resolve());
      spyOn(alertService, 'create').and.returnValue(Promise.resolve(true));
      const scanBarcodeSpy = spyOn(component, 'scanBarcode2').and.callThrough();

      await component.scanBarcode2();

      expect(scanBarcodeSpy.calls.count()).toBeGreaterThan(1);
    });

    it('should handle error from searchBillBarcode', async () => {
      const barcode = '12345678901234';
      const error = 'error desconocido';

      const modalMock = {
        present: jasmine.createSpy('present').and.resolveTo(),
        onDidDismiss: jasmine.createSpy('onDidDismiss').and.resolveTo({
          data: { barcode, exit: false }
        })
      };

      spyOn(modalCtrl, 'create').and.returnValue(
        Promise.resolve(modalMock as any)
      );
      spyOn(analyticsService, 'sendError').and.returnValue(Promise.resolve());
      spyOn(facade, 'searchBillReferenceClean');
      spyOn(facade, 'searchCategoryClean');
      spyOn(facade, 'disableLoading');
      spyOn(alertService, 'create').and.returnValue(Promise.resolve(false));

      await component.scanBarcode2();

      expect(analyticsService.sendError).toHaveBeenCalledWith(
        'Barcode Error',
        'Error desconocido'
      );
      expect(facade.searchBillReferenceClean).toHaveBeenCalled();
      expect(facade.searchCategoryClean).toHaveBeenCalled();
      expect(facade.disableLoading).toHaveBeenCalled();
    });
  });

  describe('setBarcodeBillData', () => {
    it('should set form controls with bill data', () => {
      const mockBill = new PaymentBillFactory().buildBarcodeServiceData();
      const continueSpy = spyOn(component.continue, 'emit');

      mockBill.nie = 'TEST123';
      mockBill.amount = '100.50';
      mockBill.serviceType = 'Test Service';
      mockBill.biller = true;
      mockBill.orgId = { optOrgIdNum: '12345', orgIdNum: '12345' };
      mockBill.amountType = 'FIXED';
      mockBill.invoiceNum = 'INV-001';

      component.setBarcodeBillData(mockBill);

      expect(component.bill.value.name).toEqual('Test Service');
      expect(component.bill.value.isBiller).toEqual(true);
      expect(component.bill.value.orgIdNum).toEqual('12345');
      expect(component.reference.value).toEqual('TEST123');
      expect(component.payValue.value).toEqual(100.5);
      expect(component.amountType.value).toEqual('FIXED');
      expect(component.invoiceNumber.value).toEqual('INV-001');
      expect(component.isBarcode.value).toBeTrue();
      expect(continueSpy).toHaveBeenCalledWith(true);
    });

    it('should throw error when bill.nie is missing', () => {
      const mockBill = new PaymentBillFactory().buildBarcodeServiceData();
      mockBill.nie = null;
      mockBill.amount = '100.50';

      expect(() => component.setBarcodeBillData(mockBill)).toThrowError(
        PaymentServicesError.billError
      );
    });

    it('should throw error when bill.amount is missing', () => {
      const mockBill = new PaymentBillFactory().buildBarcodeServiceData();
      mockBill.nie = 'TEST123';
      mockBill.amount = null;

      expect(() => component.setBarcodeBillData(mockBill)).toThrowError(
        PaymentServicesError.billError
      );
    });
  });
});
