import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicePaymentCardComponent } from './service-payment-card.component';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { TestingModule } from '@testing/testing.module';
import { PaymentBillFactory } from '@testing/factories/payment-bill.factory';

describe('ServicePaymentCardComponent', () => {
  let component: ServicePaymentCardComponent;
  let fixture: ComponentFixture<ServicePaymentCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ServicePaymentCardComponent,
        CapitalizePipe,
        CurrencyFormatPipe
      ],
      imports: [IonicModule, TestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicePaymentCardComponent);
    component = fixture.componentInstance;
    component.paymentBill = new PaymentBillFactory().create();
    component.paymentBillInfo =
      new PaymentBillFactory().buildPaymentServiceCardItemInfo();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call be get paymentBillInfoSchedule', () => {
    expect(component.paymentBillInfoSchedule).toBeDefined();
  });

  it('should call be get paymentBillInfoSchedulePay', () => {
    expect(component.paymentBillInfoSchedulePay).toBeDefined();
  });

  it('should call be get statusLabel', () => {
    component.paymentBill.enablePaymentButton = true;
    expect(component.statusLabel).toEqual(
      'PAYMENTS.SERVICES.HOME.CARD.LABELS.AVAILABLE'
    );

    component.paymentBill.enablePaymentButton = false;
    component.paymentBill.schedulePayment = true;
    expect(component.statusLabel).toEqual(
      'PAYMENTS.SERVICES.HOME.CARD.LABELS.SCHEDULE_PAYMENT'
    );

    component.paymentBill.enablePaymentButton = false;
    component.paymentBill.schedulePayment = false;
    expect(component.statusLabel).toEqual(
      'PAYMENTS.SERVICES.HOME.CARD.LABELS.NOT_AVAILABLE'
    );
  });

  it('should call be get statusClass', () => {
    component.paymentBill.enablePaymentButton = true;
    expect(component.statusClass).toEqual('success');

    component.paymentBill.enablePaymentButton = false;
    component.paymentBill.schedulePayment = true;
    expect(component.statusClass).toEqual('warning');

    component.paymentBill.enablePaymentButton = false;
    component.paymentBill.schedulePayment = false;
    expect(component.statusClass).toEqual('info');
  });
});
