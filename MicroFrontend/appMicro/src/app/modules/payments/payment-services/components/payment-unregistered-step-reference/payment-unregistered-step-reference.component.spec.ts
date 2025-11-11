import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { PaymentServicesFacadeMock } from '@testing/mocks/facade/payment-services.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { PaymentUnregisteredStepReferenceComponent } from './payment-unregistered-step-reference.component';

describe('PaymentUnregisteredStepReferenceComponent', () => {
  let component: PaymentUnregisteredStepReferenceComponent;
  let fixture: ComponentFixture<PaymentUnregisteredStepReferenceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentUnregisteredStepReferenceComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: PaymentServicesFacade,
          useClass: PaymentServicesFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(
      PaymentUnregisteredStepReferenceComponent
    );
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      invoiceNumber: new UntypedFormControl(),
      maxPaymentDateComplete: new UntypedFormControl(),
      agreementType: new UntypedFormControl(),
      amountType: new UntypedFormControl(),
      bill: new UntypedFormControl({ isBiller: false })
    });
    component.reference = new UntypedFormControl();
    component.payValue = new UntypedFormControl();
    component.isBarcode = new UntypedFormControl();
    component.isSelectNewBill = new UntypedFormControl([true]);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
