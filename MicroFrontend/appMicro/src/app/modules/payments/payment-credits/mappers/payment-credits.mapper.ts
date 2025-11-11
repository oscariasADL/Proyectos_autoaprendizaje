import {
  isNullOrUndefined,
  sanitizeCreditCardNumber
} from '@commons/helpers/text.helpers';
import {
  DetailTypePayment,
  PaymentCredit,
  PaymentCredits
} from '@modules/payments/payment-credits/entities/payment-credits.interface';
import { ProductNickname } from '@modules/product/entities/product-nickname.interface';
import { PaymentCard } from '@modules/shared/entities/payment-card.interface';
import find from 'lodash/find';

export function mapCreditCard(credit: PaymentCredit): PaymentCard {
  const data: PaymentCard = {
    title: credit?.nickname
      ? credit?.nickname
      : `${credit.loanName} - ${credit.bankName}`,
    number: `No. ${sanitizeCreditCardNumber(credit.numberProduct)}`,
    canPay: true,
    canDelete: true,
    items: []
  };

  switch (credit.typePayment) {
    case DetailTypePayment.CREDIT_CARD_VILLAS:
      if (
        !isNullOrUndefined(credit?.minPaymentAmount) &&
        credit?.minPaymentAmount > 0
      ) {
        data.items.push({
          label: 'PAYMENTS.PAY_LOAN.FIELDS.MINIMUM_TO_PAY',
          value: credit.minPaymentAmount
        });
      }

      if (
        !isNullOrUndefined(credit?.maxPaymentDate) &&
        !isNullOrUndefined(credit?.minPaymentAmount) &&
        credit?.minPaymentAmount > 0
      ) {
        data.items.push({
          label: 'PAYMENTS.PAY_LOAN.FIELDS.DUE_DATE',
          text: credit.maxPaymentDate,
          className: 'opaque'
        });
      }

      data.canDelete = false;
      data.canPay = credit?.totalPaymentAmount > 0;
      data.icon = credit.franchise;
      break;

    case DetailTypePayment.CREDIT_CARD_OTHERS:
      data.icon = credit.franchise;
      break;

    case DetailTypePayment.CREDIT_CARD_CONTACTS:
      data.icon = credit.franchise;
      data.title = `${credit.contactName}`;
      data.texts = [credit.loanName, credit.bankName];
      break;

    case DetailTypePayment.AVAL_CREDITS_VILLAS:
      if (
        !isNullOrUndefined(credit?.minPaymentAmount) &&
        credit?.minPaymentAmount > 0
      ) {
        data.items.push({
          label: 'PAYMENTS.PAY_LOAN.FIELDS.NEXT_INSTALLMENT',
          value: credit.minPaymentAmount
        });
      }

      if (
        !isNullOrUndefined(credit?.maxPaymentDate) &&
        !isNullOrUndefined(credit?.minPaymentAmount) &&
        credit?.minPaymentAmount > 0
      ) {
        data.items.push({
          label: 'PAYMENTS.PAY_LOAN.FIELDS.DUE_DATE',
          text: credit.maxPaymentDate,
          className: 'opaque'
        });
      }

      data.canDelete = false;
      data.canPay = credit.totalPaymentAmount > 0;
      break;

    case DetailTypePayment.AVAL_CREDITS_OTHERS:
      break;

    case DetailTypePayment.AVAL_CREDITS_CONTACTS:
      data.title = `${credit.contactName}`;
      data.texts = [credit.loanName, credit.bankName];
      break;
  }
  return data;
}

export function mapPaymentsData(
  data: PaymentCredits,
  nicknames: ProductNickname[]
): PaymentCredits {
  return {
    loansVillas:
      data?.loansVillas.map((item) => mapPaymentCreditItem(item, nicknames)) ||
      [],
    loansOtherBanks:
      data?.loansOtherBanks.map((item) =>
        mapPaymentCreditItem(item, nicknames)
      ) || [],
    loansContacts:
      data?.loansContacts.map((item) =>
        mapPaymentCreditItem(item, nicknames)
      ) || []
  };
}

function mapPaymentCreditItem(
  item: PaymentCredit,
  nicknames: ProductNickname[]
): PaymentCredit {
  if (isNullOrUndefined(item)) {
    return item;
  }

  const productNickname = find(nicknames, [
    'productRelativeId',
    item.relativeId.toString()
  ]);

  return {
    ...item,
    nickname: !isNullOrUndefined(productNickname)
      ? productNickname.nickname
      : item.accountType
  };
}
