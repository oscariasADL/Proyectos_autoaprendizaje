import { TypeAccount } from '@commons/entities/product/type-account';
import {
  DetailTypePayment,
  PaymentCredits,
  PaymentFetchFilter
} from '@modules/payments/payment-credits/entities/payment-credits.interface';

export function mapPaymentsResponse(
  creditCards: PaymentCredits,
  filter: PaymentFetchFilter
): PaymentCredits {
  return {
    loansVillas: creditCards.loansVillas.map((item) => ({
      ...item,
      typePayment:
        item.productType === TypeAccount.CCA
          ? DetailTypePayment.CREDIT_CARD_VILLAS
          : DetailTypePayment.AVAL_CREDITS_VILLAS
    })),
    loansOtherBanks: creditCards.loansOtherBanks.map((item) => ({
      ...item,
      typePayment:
        item.productType === TypeAccount.CCA
          ? DetailTypePayment.CREDIT_CARD_OTHERS
          : DetailTypePayment.AVAL_CREDITS_OTHERS
    })),
    loansContacts: creditCards.loansContacts.map((item) => ({
      ...item,
      typePayment:
        item.productType === TypeAccount.CCA
          ? DetailTypePayment.CREDIT_CARD_CONTACTS
          : DetailTypePayment.AVAL_CREDITS_CONTACTS
    }))
  };
}
