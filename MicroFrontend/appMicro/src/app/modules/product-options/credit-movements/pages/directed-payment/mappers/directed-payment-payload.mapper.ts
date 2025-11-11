import { Product } from '@commons/entities/product/product.interface';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import { DirectedPaymentPayload } from '@modules/product-options/credit-movements/pages/directed-payment/entities/directed-payment.interface';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';

export function mapDirectedPaymentPayload(
  values: any
): DirectedPaymentPayload[] {
  const fromProduct: Product = values.fromProduct;
  const towardProduct: Product = values.towardProduct;
  const selectedMovements: CreditMovement[] = values.selectedMovements;
  const commonFields = {
    productOrigin: {
      accountType: fromProduct.type,
      accountId: fromProduct.id.toString()
    },
    productTarget: {
      accountType: towardProduct.type,
      id: towardProduct.id.toString(),
      bankId: towardProduct.bankCode
    }
  };

  return selectedMovements.map((movement: CreditMovement) => ({
    ...commonFields,
    rate: movement.rate,
    purchaseDescription: movement.purchaseDescription,
    companyDescription: movement.companyDescription,
    purchaseDate: movement.purchaseDate,
    installments: movement.installments,
    approvalId: movement.approvalId,
    purchaseValue: movement.purchaseValue,
    balance: movement.balance,
    directedPayment: sanitizeCurrency(movement.valueToPay.toString())
  }));
}
