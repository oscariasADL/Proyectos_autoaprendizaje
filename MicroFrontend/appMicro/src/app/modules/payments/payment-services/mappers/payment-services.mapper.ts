import {
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import {
  PaymentBill,
  PaymentServiceCardItemInfo,
  PaymentServiceCardItemLabels,
  PaymentServicesResponse,
  ServicePaymentScheduleType,
  servicePaymentScheduleTypesTexts
} from '@modules/payments/payment-services/entities/payment-services.interface';
import { Product } from '@commons/entities/product/product.interface';

export function mapHasServices(services: PaymentServicesResponse): boolean {
  return (
    !isNullOrUndefined(services) &&
    (services?.biller?.length > 0 || services?.noBiller?.length > 0)
  );
}

export function mapPaymentServiceCardItemsInfo(
  bill: PaymentBill,
  product?: Product
): PaymentServiceCardItemInfo[] {
  return [
    {
      id: PaymentServiceCardItemLabels.PAYMENT_REFERENCE,
      label: 'PAYMENTS.SERVICES.HOME.CARD.LABELS.PAYMENT_REFERENCE',
      valueText: `No. ${bill.referenceId}`
    },
    ...(!isNullOrUndefinedOrEmpty(bill.amount) && Number(bill.amount) > 0
      ? [
          {
            id: PaymentServiceCardItemLabels.PAYMENT_AMOUNT,
            label: 'PAYMENTS.SERVICES.HOME.CARD.LABELS.PAYMENT_AMOUNT',
            value: bill.amount
          }
        ]
      : []),
    ...(!isNullOrUndefinedOrEmpty(bill?.maxPaymentDate)
      ? [
          {
            id: PaymentServiceCardItemLabels.PAYMENT_LIMIT,
            label: 'PAYMENTS.SERVICES.HOME.CARD.LABELS.PAYMENT_LIMIT',
            valueText: bill.maxPaymentDate
          }
        ]
      : []),
    ...(!isNullOrUndefinedOrEmpty(bill?.maxAmountRecurring) &&
    Number(bill.maxAmountRecurring) > 0
      ? [
          {
            id: PaymentServiceCardItemLabels.PAYMENT_AMOUNT_MAX,
            label: 'PAYMENTS.SERVICES.HOME.CARD.LABELS.PAYMENT_AMOUNT_MAX',
            value: bill.maxAmountRecurring
          }
        ]
      : []),
    ...(bill?.schedulePayment && !isNullOrUndefined(product)
      ? [
          {
            id: PaymentServiceCardItemLabels.FROM,
            label: 'PAYMENTS.SERVICES.HOME.CARD.LABELS.FROM',
            valueText: `${product.typeName} No. ${product.numberProduct}`
          }
        ]
      : []),
    ...(!isNullOrUndefined(bill?.scheduleType) &&
    ServicePaymentScheduleType.DEFAULT.toString() !==
      bill?.scheduleType.toString()
      ? [
          {
            id: PaymentServiceCardItemLabels.PAY,
            label: 'PAYMENTS.SERVICES.HOME.CARD.LABELS.PAY',
            valueText: servicePaymentScheduleTypesTexts[bill?.scheduleType]
          }
        ]
      : [])
  ];
}
