import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { PaymentBillFactory } from '@testing/factories/payment-bill.factory';
import { PaymentTaxesFacadeMock } from '@testing/mocks/facade/payment-taxes.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { PaymentTaxesFacade } from '../../payment-taxes.facade';
import { PaymentsTaxesStepReferenceComponent } from './payments-taxes-step-reference.component';

describe('PaymentsTaxesStepReferenceComponent', () => {
  let component: PaymentsTaxesStepReferenceComponent;
  let fixture: ComponentFixture<PaymentsTaxesStepReferenceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsTaxesStepReferenceComponent],
      imports: [TestingModule],
      providers: [
        { provide: PaymentTaxesFacade, useClass: PaymentTaxesFacadeMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsTaxesStepReferenceComponent);

    const paymentBillFactory = new PaymentBillFactory();

    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      city: new UntypedFormControl({ code: '1020', name: 'Bogota' }),
      agreement: new UntypedFormControl(
        paymentBillFactory.buildBarcodeServiceData()
      ),
      agreementDetail: new UntypedFormControl(),
      reference: new UntypedFormControl(123),
      isBarcode: new UntypedFormControl(true),
      fromProduct: new UntypedFormControl()
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cleanReferenceDetail', () => {
    expect(component.searchReference('')).toBeUndefined();
  });

  it('should call tryAgain', () => {
    expect(component.tryAgain()).toBeUndefined();
    spyOnProperty(component, 'isBarcode').and.returnValue(false);
    expect(component.tryAgain()).toBeUndefined();
  });

  it('should call onContinue', () => {
    component.isOnlyOneAccount$.subscribe();
    component.fromProduct.setValue(null);
    expect(component.city.value.code).toEqual('1020');
    expect(
      component.onContinue(component.agreementDetail.value)
    ).toBeUndefined();
  });
});
