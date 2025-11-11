import {
  PaymentBill,
  PaymentServiceScheduleCreatePayload,
  recurringTypeScheduleType
} from '@modules/payments/payment-services/entities/payment-services.interface';

export function mapPaymentServiceCreateSchedulingPayload(
  values: any,
  bill: PaymentBill
): PaymentServiceScheduleCreatePayload {
  return {
    recurringType: recurringTypeScheduleType[bill.scheduleType],
    amount: Number(bill.maxAmountRecurring),
    productId: values.productId?.id,
    nickname: bill.alias,
    orgIdNum: bill.organizationId,
    nie: bill.referenceId
  };
}

export function mapPaymentServiceCreateSchedulingPayloadOnlyBill(
  bill: PaymentBill
): PaymentServiceScheduleCreatePayload {
  return {
    recurringType: recurringTypeScheduleType[bill.scheduleType],
    amount: Number(bill.maxAmountRecurring),
    productId: bill.productId,
    nickname: bill.alias,
    orgIdNum: bill.organizationId,
    nie: bill.referenceId
  };
}
