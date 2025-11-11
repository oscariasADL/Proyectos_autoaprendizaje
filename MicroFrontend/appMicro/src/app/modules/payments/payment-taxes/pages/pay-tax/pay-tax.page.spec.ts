import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ProductFactory } from '@testing/factories/product.factory';
import { PaymentTaxesFacadeMock } from '@testing/mocks/facade/payment-taxes.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { PaymentTaxesFacade } from '../../payment-taxes.facade';
import { PaytaxSlide } from './constants/pay-tax.constants';
import { PayTaxPage } from './pay-tax.page';

describe('PayTaxPage', () => {
  let component: PayTaxPage;
  let fixture: ComponentFixture<PayTaxPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PayTaxPage],
      imports: [GenericStepperMockModule],
      providers: [
        CurrencyFormatPipe,
        {
          provide: PaymentTaxesFacade,
          useClass: PaymentTaxesFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PayTaxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call feePayload', () => {
    const app = fixture.debugElement.componentInstance;
    const prod = { id: '1', type: 'CCA' };
    app.form.get('fromProduct').patchValue(prod);
    expect(app.feePayload().accountId).toEqual(prod.id);
    expect(app.accountFilters).toBeDefined();
    expect(app.PaytaxSlide.from).toEqual(PaytaxSlide.from);
  });

  it('should call onExit and scrollToTop', () => {
    component.content = {
      scrollToTop: async (time: any) => {
        return;
      }
    } as any;
    expect(component.scrollToTop(0)).toBeUndefined();
    expect(component.onExit()).toBeUndefined();
  });

  it('should call sendPayment', () => {
    const app = fixture.debugElement.componentInstance;
    app.form.get('fromProduct').setValue(new ProductFactory().create());
    app.form.get('city').setValue('123');
    app.form.get('agreement').setValue('123');
    app.form.get('agreementDetail').setValue({
      amount: 1000,
      referenceId: '123',
      invoiceNumber: '',
      organizationId: ''
    });
    app.form.get('reference').setValue('123');
    app.form.get('isBarcode').setValue(false);
    expect(app.sendPayment()).toBeUndefined();
  });
});
