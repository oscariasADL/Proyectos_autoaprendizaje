import {
  ActivateDigitalDebitCardFormValue,
  DigitalDebitCardCreatePayload,
  DigitalDebitCardEditPayload,
  DigitalDebitCardType
} from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';

export function digitalDebitCardCreatePayloadMapper(
  values: ActivateDigitalDebitCardFormValue
): DigitalDebitCardCreatePayload {
  const relativeId = values.productOrigin.id;
  const amount = sanitizeCurrency(values.amount);

  return {
    relativeId,
    nickName: values.nickName.trim(),
    amount,
    digitalDebitCardTrnType: DigitalDebitCardType.NEW
  };
}

export function digitalDebitCardEditPayloadMapper(
  values: ActivateDigitalDebitCardFormValue
): DigitalDebitCardEditPayload {
  const relativeId = values.productOrigin.id;
  const amount = sanitizeCurrency(values.amount);

  return {
    relativeIdParent: relativeId,
    nickName: values.nickName.trim(),
    amount
  };
}
