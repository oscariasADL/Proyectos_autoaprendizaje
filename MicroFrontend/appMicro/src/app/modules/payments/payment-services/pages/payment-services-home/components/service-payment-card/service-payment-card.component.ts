import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  PaymentBill,
  PaymentServiceCardItemInfo,
  PaymentServiceCardItemLabels
} from '@modules/payments/payment-services/entities/payment-services.interface';
import {
  PAYMENT_BILL_INFO_DEFAULT_CARD_ITEMS,
  PAYMENT_BILL_INFO_SCHEDULE_CARD_ITEMS
} from '@modules/payments/payment-services/constants/payment-services.constants';

@Component({
  selector: 'app-service-payment-card',
  templateUrl: './service-payment-card.component.html',
  styleUrls: ['./service-payment-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicePaymentCardComponent {
  @Input() paymentBill: PaymentBill;
  @Input() paymentBillInfo: PaymentServiceCardItemInfo[];

  @Output() pay: EventEmitter<void> = new EventEmitter<void>();
  @Output() schedule: EventEmitter<void> = new EventEmitter<void>();
  @Output() editSchedule: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeScheduling: EventEmitter<void> = new EventEmitter<void>();

  private readonly paymentBillInfoDefaultCardItems =
    PAYMENT_BILL_INFO_DEFAULT_CARD_ITEMS;
  private readonly paymentBillInfoScheduleCardItems =
    PAYMENT_BILL_INFO_SCHEDULE_CARD_ITEMS;
  public isCollapsedCard = false;

  get paymentBillInfoDefault(): PaymentServiceCardItemInfo[] {
    return this.paymentBillInfo.filter((item) =>
      this.paymentBillInfoDefaultCardItems.includes(item.id)
    );
  }

  get paymentBillInfoSchedule(): PaymentServiceCardItemInfo[] {
    return this.paymentBillInfo.filter((item) =>
      this.paymentBillInfoScheduleCardItems.includes(item.id)
    );
  }

  get paymentBillInfoSchedulePay(): PaymentServiceCardItemInfo {
    return this.paymentBillInfo.find(
      (item) => item.id === PaymentServiceCardItemLabels.PAY
    );
  }

  get statusLabel(): string {
    if (this.paymentBill.enablePaymentButton)
      return 'PAYMENTS.SERVICES.HOME.CARD.LABELS.AVAILABLE';
    if (this.paymentBill?.schedulePayment)
      return 'PAYMENTS.SERVICES.HOME.CARD.LABELS.SCHEDULE_PAYMENT';
    return 'PAYMENTS.SERVICES.HOME.CARD.LABELS.NOT_AVAILABLE';
  }

  get statusClass(): string {
    if (this.paymentBill.enablePaymentButton) return 'success';
    if (this.paymentBill?.schedulePayment) return 'warning';
    return 'info';
  }
}
