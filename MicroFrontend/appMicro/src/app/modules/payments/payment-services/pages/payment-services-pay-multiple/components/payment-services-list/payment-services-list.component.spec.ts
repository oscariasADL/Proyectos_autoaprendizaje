import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { PaymentServicesListComponent } from './payment-services-list.component';
import { TestingModule } from '@testing/testing.module';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { PaymentBillFactory } from '@testing/factories/payment-bill.factory';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PaymentServicesListComponent', () => {
  let component: PaymentServicesListComponent;
  let fixture: ComponentFixture<PaymentServicesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentServicesListComponent, CurrencyFormatPipe],
      imports: [IonicModule, TestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentServicesListComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      countBillSelection: new FormControl(0),
      totalAmount: new FormControl(0),
      selectedBills: new FormControl([])
    });
    component.paymentBillsControl = new FormArray([
      new FormControl(false),
      new FormControl(false)
    ]);
    component.services = new PaymentBillFactory().createBulk(2);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call changeSelection', () => {
    component.services = new PaymentBillFactory().createBulk(6);
    component.paymentBillsControl.push(new FormControl(true));
    component.paymentBillsControl.push(new FormControl(true));
    component.paymentBillsControl.push(new FormControl(true));
    component.paymentBillsControl.push(new FormControl(true));
    const firstBill = component.paymentBillsControl.at(0);
    const secondBill = component.paymentBillsControl.at(1);
    firstBill.setValue(true);
    component.changeSelection();
    fixture.detectChanges();
    expect(secondBill.disabled).toBeTrue();
  });

  it('should be call continueAction', () => {
    const firstBill = component.paymentBillsControl.at(0);
    firstBill.setValue(true);
    const totalValueToPay = component.paymentBillsControl.controls.reduce(
      (acc, cur, index) =>
        cur.value ? acc + Number(component.services[index].amount) : acc,
      0
    );
    component.continueAction();
    expect(component.totalAmount.value).toEqual(totalValueToPay);
  });
  it('should enable all controls when countBillsSelected is less than MAX_SELECTION_SERVICES', () => {
    component.services = new PaymentBillFactory().createBulk(6);
    component.paymentBillsControl = new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]);
    component.changeSelection();
    fixture.detectChanges();

    component.paymentBillsControl.controls.forEach((control) => {
      expect(control.enabled).toBeTrue();
    });
  });
});
