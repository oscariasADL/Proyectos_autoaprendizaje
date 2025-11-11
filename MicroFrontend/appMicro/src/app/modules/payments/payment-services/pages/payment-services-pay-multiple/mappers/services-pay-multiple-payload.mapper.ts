import { PayBillsMultiplePayload } from '@modules/payments/payment-services/pages/payment-services-pay-multiple/entities/services-pay-multiple.interface';
import { Product } from '@commons/entities/product/product.interface';
import { PaymentBill } from '@modules/payments/payment-services/entities/payment-services.interface';

export function mapServicesPayMultiplePayload(
  values: any
): PayBillsMultiplePayload {
  const fromProduct: Product = values.fromProduct;
  const bills: PaymentBill[] = values.selectedBills;

  return {
    paymentBillList: bills.map((bill) => ({
      productOrigin: {
        accountType: fromProduct.type,
        accountId: fromProduct.id.toString()
      },
      ...bill,
      amount: bill.amount
    }))
  };
}
