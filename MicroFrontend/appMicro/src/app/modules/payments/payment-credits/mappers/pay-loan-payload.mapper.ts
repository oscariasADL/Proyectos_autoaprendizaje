import { Product } from '@commons/entities/product/product.interface';
import {
  isNullOrUndefinedOrEmpty,
  sanitizeCurrency
} from '@commons/helpers/text.helpers';
import {
  PAY_LOAN_CONTACTS,
  PAY_LOAN_VILLAS
} from '@modules/payments/payment-credits/constants/pay-loan.constants';
import {
  CurrencyType,
  PayLoanPaymentType,
  PaymentPayload
} from '@modules/payments/payment-credits/entities/pay-loan.interface';
import { PaymentCredit } from '@modules/payments/payment-credits/entities/payment-credits.interface';

export function mapPayLoanPayload(values: any): PaymentPayload {
  const paymentType: PayLoanPaymentType = values.paymentType;
  const currencyType: CurrencyType = values.currencyType;
  const fromProduct: Product = values.fromProduct;
  const credit: PaymentCredit = values.credit;
  const amount: string = values.amount;

  return {
    productOrigin: {
      accountType: fromProduct.type,
      accountId: fromProduct.id.toString(),
      bankId: ''
    },
    productTarget: {
      accountType: credit.productType,
      accountId: credit.relativeId,
      bankId: credit.bankCode,
      ...(PAY_LOAN_CONTACTS.includes(credit.typePayment)
        ? {
            owner: credit.owner
          }
        : {})
    },
    ...(!isNullOrUndefinedOrEmpty(paymentType)
      ? {
          paymentType
        }
      : {}),
    ...(!isNullOrUndefinedOrEmpty(currencyType) &&
    currencyType === CurrencyType.USD
      ? {
          currencyType
        }
      : {}),
    isOwnLoan: PAY_LOAN_VILLAS.includes(credit.typePayment).toString(),
    amount: sanitizeCurrency(amount)
  };
}
