import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { PaymentTaxesFacadeMock } from '@testing/mocks/facade/payment-taxes.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { PaymentTaxesFacade } from '../../payment-taxes.facade';
import { PaymentsTaxesStepAgreementComponent } from './payments-taxes-step-agreement.component';
import { AgreementTaxes } from '@modules/payments/payment-taxes/entities/payment-taxes.interface';

describe('PaymentsTaxesStepAgreementComponent', () => {
  let component: PaymentsTaxesStepAgreementComponent;
  let fixture: ComponentFixture<PaymentsTaxesStepAgreementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsTaxesStepAgreementComponent],
      imports: [TestingModule],
      providers: [
        { provide: PaymentTaxesFacade, useClass: PaymentTaxesFacadeMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsTaxesStepAgreementComponent);
    component = fixture.componentInstance;
    component.city = new UntypedFormControl({ code: '1020', name: 'Bogota' });
    component.agreement = new UntypedFormControl();
    component.isBarcode = new UntypedFormControl();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSelectAgreement', () => {
    const agreement: AgreementTaxes = {
      code: '00000109',
      name: 'IMPUESTO VEHICULOS BOGOTA',
      additionalInfo: [],
      expectedReferenceDescription: 'No. de Referencia del Recaudo',
      cityInfo: {
        code: '11001',
        name: 'Bogota DC'
      }
    };
    spyOn(component, 'onSelectAgreement').and.callThrough();
    component.onSelectAgreement(agreement);
    expect(component.onSelectAgreement).toHaveBeenCalledWith(agreement);
  });

  it('should call ngOnInit', () => {
    component.isBarcode.setValue(true);
    expect(component.ngOnInit()).toBeUndefined();
  });
});
