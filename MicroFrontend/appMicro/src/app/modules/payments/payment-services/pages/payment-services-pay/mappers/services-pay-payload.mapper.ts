import { Product } from '@commons/entities/product/product.interface';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import {
  PayBillPayload,
  PaymentBill
} from '@modules/payments/payment-services/entities/payment-services.interface';

export function mapServicesPayPayload(values: any): PayBillPayload {
  const fromProduct: Product = values.fromProduct;
  const bill: PaymentBill = values.bill;
  const amount: string = values.amount;

  const {
    referenceId,
    invoiceNumber,
    agreementType,
    maxPaymentDateComplete,
    biller,
    organizationId,
    amountType
  } = bill;

  return {
    productOrigin: {
      accountType: fromProduct.type.toString(),
      accountId: fromProduct.id.toString()
    },
    amount: sanitizeCurrency(amount).toString(),
    maxPaymentDateComplete,
    organizationId,
    agreementType,
    invoiceNumber,
    referenceId,
    amountType,
    biller,
    organizationName: bill?.organizationName
  };
}
