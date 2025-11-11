import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import {
  CurrencyType,
  PayLoanAmountType
} from '../../entities/pay-loan.interface';

import { PayLoanAmountComponent } from './pay-loan-amount.component';

describe('PayLoanAmountComponent', () => {
  let component: PayLoanAmountComponent;
  let fixture: ComponentFixture<PayLoanAmountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PayLoanAmountComponent],
      imports: [IonicModule, FormsModule, ReactiveFormsModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PayLoanAmountComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      credit: new UntypedFormControl({ typePayment: '' }),
      activeType: new UntypedFormControl(null),
      currencyType: new UntypedFormControl(null)
    });
    component.control = new UntypedFormControl(0);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be setActiveType', () => {
    Object.keys(PayLoanAmountType).forEach((key) =>
      component.setActiveType(PayLoanAmountType[key])
    );
    expect(component).toBeTruthy();
  });

  it('should be call all gets', () => {
    expect(component.hasErrors).toEqual(false);
    expect(component.showNotice).toEqual(false);
    expect(component.payLoanAmountType.minPayment).toEqual(
      PayLoanAmountType.minPayment
    );
  });

  it('should call setActiveCurrencyType()', () => {
    spyOn(component, 'setActiveCurrencyType').and.callThrough();
    component.setActiveCurrencyType(CurrencyType.COP);
    expect(component.setActiveCurrencyType).toHaveBeenCalled();
  });

  it('should call initForm()', () => {
    const componentAny = component as any;
    component.isOccidente = true;
    component.setActiveCurrencyType(CurrencyType.COP);
    expect(componentAny.initForm()).toBeUndefined();
  });

  it('should call verifyControlStatus()', () => {
    component.control.setValue(component.credit.minPaymentAmount);
    const componentAny = component as any;
    expect(componentAny.verifyControlStatus()).toBeUndefined();
  });

  it('should return AbstractControl, currencyType()', () => {
    expect(component.currencyType).toBeDefined();
  });

  it('should return CurrencyType, currentType()', () => {
    expect(component.currentType).toBeDefined();
  });
});
