import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { QrPayFacade } from '@modules/qr/pages/qr-pay/qr-pay.facade';
import { QrPayFacadeMock } from '@testing/mocks/facade/qr-pay.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { QrPayPage } from './qr-pay.page';
import { QrPaySlide } from '@modules/qr/pages/qr-pay/constants/qr-pay.constants';

describe('QrPayPage', () => {
  let component: QrPayPage;
  let fixture: ComponentFixture<QrPayPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QrPayPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [{ provide: QrPayFacade, useClass: QrPayFacadeMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(QrPayPage);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should initialize pay flow when isForPay is true', () => {
      spyOnProperty(component, 'isForPay').and.returnValue(true);

      const initPayFormSpy = spyOn<any>(
        component,
        'initPayForm'
      ).and.callThrough();
      const initPayConfigSpy = spyOn<any>(
        component,
        'initPayConfiguration'
      ).and.callThrough();

      component.ngOnInit();

      expect(initPayFormSpy).toHaveBeenCalled();
      expect(initPayConfigSpy).toHaveBeenCalled();
    });
  });

  describe('gmfPayload()', () => {
    it('should return correct GMFPayload', () => {
      component.form = component['formBuilder'].group({
        fromProduct: {
          numberProduct: '123456',
          type: 'SDA',
          availableBalance: 5000
        },
        amount: 1000
      });

      const payload = component.gmfPayload();

      expect(payload).toEqual({
        productNumber: '123456',
        productType: 'SDA',
        amountTransaction: 1000,
        availableBalance: 5000
      });
    });
  });
});
