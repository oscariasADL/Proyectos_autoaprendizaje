import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { PayLoanPaymentType } from '../../entities/pay-loan.interface';

import { PayLoanTypeComponent } from './pay-loan-type.component';
import { NumberFormatPipe } from '@commons/pipes/number-format.pipe';

describe('PayLoanTypeComponent', () => {
  let component: PayLoanTypeComponent;
  let fixture: ComponentFixture<PayLoanTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        PayLoanTypeComponent,
        CurrencyFormatPipe,
        NumberFormatPipe
      ],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PayLoanTypeComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      amount: new UntypedFormControl(100),
      paymentType: new UntypedFormControl('100')
    });
    component.control = new UntypedFormControl(0);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be setActiveType', () => {
    Object.keys(PayLoanPaymentType).forEach((key) =>
      component.setActiveType(PayLoanPaymentType[key])
    );
    expect(component).toBeTruthy();
  });

  it('should to call to setExtraordinaryPayment', () => {
    spyOn(component, 'setExtraordinaryPayment').and.callThrough();
    component.setExtraordinaryPayment();
    expect(component.setExtraordinaryPayment).toHaveBeenCalled();

    spyOnProperty(component, 'isExtraordinaryPayment', 'get').and.returnValue(
      true
    );
    component.setExtraordinaryPayment();
    expect(component.setExtraordinaryPayment).toHaveBeenCalled();
  });

  it('should call initType', () => {
    expect((component as any).initType()).toBeUndefined();
  });

  it('should be call all gets', () => {
    expect(component.isExtraordinaryPayment).toEqual(false);
    expect(component.payLoanPaymentType.quota).toEqual(
      PayLoanPaymentType.quota
    );
  });
});
