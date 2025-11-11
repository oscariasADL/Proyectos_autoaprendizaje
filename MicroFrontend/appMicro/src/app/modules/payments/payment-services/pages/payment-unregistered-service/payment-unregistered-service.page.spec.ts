import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { ProductFactory } from '@testing/factories/product.factory';
import { PaymentServicesFacadeMock } from '@testing/mocks/facade/payment-services.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { PaymentUnregisteredServiceSlide } from './constants/payment-unregistered-service.constants';

import { PaymentUnregisteredServicePage } from './payment-unregistered-service.page';

describe('PaymentUnregisteredServicePage', () => {
  let facade: PaymentServicesFacade;
  let component: PaymentUnregisteredServicePage;
  let fixture: ComponentFixture<PaymentUnregisteredServicePage>;
  const product = new ProductFactory().create();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentUnregisteredServicePage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: PaymentServicesFacade,
          useClass: PaymentServicesFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentUnregisteredServicePage);
    facade = TestBed.inject(PaymentServicesFacade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    component.payValue.setValue(1000);
    component.fromProduct.setValue(product);
    expect(component).toBeTruthy();
  });

  it('should be call feePayload', () => {
    expect(component.feePayload()).toBeTruthy();
  });

  it('should be call all gets', () => {
    expect(component.bill).toBeTruthy();
    expect(component.reference).toBeTruthy();
    expect(component.isBarcode).toBeTruthy();
    expect(component.amountType).toBeTruthy();
    expect(component.invoiceNumber).toBeTruthy();
    expect(component.maxPaymentDateComplete).toBeTruthy();
    expect(component.PaymentUnregisteredServiceSlide).toBeTruthy();
    expect(component.isSelectNewBill).toBeTruthy();
  });

  it('should be call setConfirmationData', () => {
    component.isBarcode.setValue(true);
    expect(
      (component as any).setConfirmationData(
        PaymentUnregisteredServiceSlide.from
      )
    ).toBeTruthy();
  });

  it('should be call sendPayment', () => {
    expect((component as any).sendPayment()).toBeUndefined();
  });

  it('should call toast alert in last step', () => {
    spyOn(facade, 'showToastMaxAmountWarning');
    component.nextStep('3');
    expect(facade.showToastMaxAmountWarning).toHaveBeenCalled();
  });

  it('should get destroy if not in the last step', () => {
    spyOn(facade, 'destroyToast');
    component.nextStep('0');
    expect(facade.destroyToast).toHaveBeenCalled();
  });
});
