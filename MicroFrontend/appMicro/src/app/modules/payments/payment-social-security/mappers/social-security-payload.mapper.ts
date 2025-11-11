import { Product } from '@commons/entities/product/product.interface';
import { PaymentSocialSecurityPayload } from '../entities/social-security.interface';

export function mapSocialSecurityPayload(
  values: any
): PaymentSocialSecurityPayload {
  const productOrigin: Product = values.productOrigin;
  const {
    amount,
    referenceId,
    invoiceNumber,
    agreementType,
    maxPaymentDateComplete,
    biller,
    organizationId,
    amountType
  } = values.value;

  return {
    productOrigin: {
      accountType: productOrigin.type.toString(),
      accountId: productOrigin.id.toString()
    },
    amount,
    referenceId,
    invoiceNumber,
    agreementType,
    maxPaymentDateComplete,
    biller,
    organizationId,
    amountType
  };
}
