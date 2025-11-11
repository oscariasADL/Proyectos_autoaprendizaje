import {
  capitalizeAll,
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import { PaymentBill } from '@modules/payments/payment-services/entities/payment-services.interface';
import { PaymentCard } from '@modules/shared/entities/payment-card.interface';

export function mapServiceCardTitle(bill: PaymentBill): string {
  return [capitalizeAll(bill?.organizationName), bill?.alias]
    .filter((item) => !isNullOrUndefinedOrEmpty(item))
    .join(' - ');
}

export function mapServiceCard(bill: PaymentBill): PaymentCard {
  const data: PaymentCard = {
    title: mapServiceCardTitle(bill),
    number: `${this.translate.instant(
      'PAYMENTS.SERVICES.FIELDS.PAYMENT_REFERENCE'
    )}: ${bill.referenceId}`,
    canPay: bill.enablePaymentButton,
    canDelete: false,
    items: []
  };

  if (bill.enablePaymentButton) {
    if (!isNullOrUndefined(bill.amount)) {
      data.items.push({
        label: 'PAYMENTS.SERVICES.FIELDS.PAYMENT_AMOUNT',
        value: bill.amount
      });
    }

    if (!isNullOrUndefined(bill.maxPaymentDate)) {
      data.items.push({
        label: 'PAYMENTS.SERVICES.FIELDS.PAYMENT_LIMIT',
        text: bill.maxPaymentDate,
        className: 'opaque'
      });
    }
  } else {
    data.label = 'PAYMENTS.SERVICES.FIELDS.NOT_AVAILABLE';
  }

  return data;
}
