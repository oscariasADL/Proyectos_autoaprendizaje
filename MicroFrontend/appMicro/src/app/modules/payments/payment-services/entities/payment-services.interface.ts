export interface PaymentBill {
  alias: string;
  referenceId: string;
  organizationId: string;
  organizationName: string;
  maxPaymentDate: string;
  currency: string;
  amount: string;
  paid: boolean;
  enablePaymentButton: boolean;
  amountType: string;
  invoiceNumber: string;
  agreementType: number;
  maxPaymentDateComplete: string;
  biller: boolean;
  productId?: string;
  scheduleType?: ServicePaymentScheduleType;
  scheduleDay?: string;
  schedulePayment?: boolean;
  maxAmountRecurring?: string;
}

export enum ServicePaymentScheduleType {
  DEFAULT = 0,
  BANK_RECEIVES_BILL = 1,
  BILL_DUE_DATE = 2
}

export enum RecurringType {
  onInvoiceDate = 'onInvoiceDate',
  onDueDate = 'onDueDate'
}

export const recurringTypeScheduleType = {
  [ServicePaymentScheduleType.BANK_RECEIVES_BILL]: RecurringType.onInvoiceDate,
  [ServicePaymentScheduleType.BILL_DUE_DATE]: RecurringType.onDueDate
};

export const servicePaymentScheduleTypesTexts = {
  [ServicePaymentScheduleType.DEFAULT]: 'Default',
  [ServicePaymentScheduleType.BANK_RECEIVES_BILL]:
    'PAYMENTS.SERVICES.HOME.CARD.LABELS.SCHEDULE_TYPE_1',
  [ServicePaymentScheduleType.BILL_DUE_DATE]:
    'PAYMENTS.SERVICES.HOME.CARD.LABELS.SCHEDULE_TYPE_2'
};

export interface PaymentServicesResponse {
  biller: PaymentBill[];
  noBiller: PaymentBill[];
}

export interface PayBillPayload {
  productOrigin: {
    accountType: string;
    accountId: string;
  };
  referenceId: string;
  invoiceNumber: string;
  agreementType: number;
  maxPaymentDateComplete: string;
  amount: string;
  biller: boolean;
  organizationId: string;
  amountType: string;
  organizationName?: string;
}

export interface NuraCode {
  identity_code: string;
  ean_code: string;
  service_code: string;
  initial: string;
  length: string;
}

export interface PaymentServiceScheduleCreatePayload {
  recurringType: string;
  amount: number;
  productId: string;
  nickname: string;
  orgIdNum: string;
  nie: string;
}

export interface PaymentServiceCardItemInfo {
  id: PaymentServiceCardItemLabels;
  label: string;
  value?: number | string;
  valueText?: string;
}

export enum PaymentServiceCardItemLabels {
  PAYMENT_REFERENCE = 'payment_reference',
  PAYMENT_AMOUNT = 'payment_amount',
  PAYMENT_LIMIT = 'payment_limit',
  PAYMENT_AMOUNT_MAX = 'payment_amount_max',
  FROM = 'from',
  PAY = 'pay'
}
