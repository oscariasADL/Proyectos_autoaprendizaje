import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { ProductFactory } from '@testing/factories/product.factory';
import { PaymentServicesFacadeMock } from '@testing/mocks/facade/payment-services.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { PaymentServicesPayPage } from './payment-services-pay.page';

describe('PaymentServicesPayPage', () => {
  let facade: PaymentServicesFacade;
  let component: PaymentServicesPayPage;
  let fixture: ComponentFixture<PaymentServicesPayPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentServicesPayPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        ImageUrlPipe,
        CurrencyFormatPipe,
        {
          provide: PaymentServicesFacade,
          useClass: PaymentServicesFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentServicesPayPage);
    facade = TestBed.inject(PaymentServicesFacade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call feePayload', () => {
    const prod = new ProductFactory().create();
    component.form.get('fromProduct').patchValue(prod);
    expect(component.feePayload().accountId.toString()).toEqual(
      prod.id.toString()
    );
  });

  it('should call payBill', () => {
    const prod = new ProductFactory().create();
    component.form.get('fromProduct').patchValue(prod);
    expect(component.payBill()).toBeUndefined();
  });

  it('should call toast alert in last step', () => {
    spyOn(facade, 'showToastMaxAmountWarning');
    component.nextStep('confirmation');
    expect(facade.showToastMaxAmountWarning).toHaveBeenCalled();
  });

  it('should get destroy if not in the last step', () => {
    spyOn(facade, 'destroyToast');
    component.nextStep('form');
    expect(facade.destroyToast).toHaveBeenCalled();
  });
});
