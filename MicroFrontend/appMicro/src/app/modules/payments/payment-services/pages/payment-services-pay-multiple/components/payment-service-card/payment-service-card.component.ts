import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  PaymentBill,
  PaymentServiceCardItemInfo
} from '@modules/payments/payment-services/entities/payment-services.interface';
import { mapPaymentServiceCardItemsInfo } from '@modules/payments/payment-services/mappers/payment-services.mapper';
import { PAYMENT_BILL_INFO_DEFAULT_CARD_ITEMS } from '@modules/payments/payment-services/constants/payment-services.constants';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-payment-service-card',
  templateUrl: './payment-service-card.component.html',
  styleUrls: ['./payment-service-card.component.sass']
})
export class PaymentServiceCardComponent {
  @Input() control: AbstractControl;
  @Input() bill: PaymentBill;

  @Output() changeSelection: EventEmitter<void> = new EventEmitter<void>();

  private readonly paymentBillInfoDefaultCardItems =
    PAYMENT_BILL_INFO_DEFAULT_CARD_ITEMS;

  get paymentBillInfo(): PaymentServiceCardItemInfo[] {
    return mapPaymentServiceCardItemsInfo(this.bill)?.filter((bill) =>
      this.paymentBillInfoDefaultCardItems.includes(bill.id)
    );
  }
}
