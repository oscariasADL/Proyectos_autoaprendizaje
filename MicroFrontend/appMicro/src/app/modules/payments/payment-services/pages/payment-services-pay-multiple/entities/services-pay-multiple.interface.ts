import { PayBillPayload } from '@modules/payments/payment-services/entities/payment-services.interface';

export interface PayBillsMultiplePayload {
  paymentBillList: PayBillPayload[];
}

export interface PayBillResponse
  extends Omit<
    PayBillPayload,
    | 'productOrigin'
    | 'agreementType'
    | 'maxPaymentDateComplete'
    | 'biller'
    | 'organizationId'
    | 'amountType'
  > {
  approvalId: string;
  statusPayment: boolean;
  transactionDate: string;
  codeError?: string;
  messageError?: string;
}

export interface PayBillsMultipleResponse {
  paymentBillList: PayBillResponse[];
}
