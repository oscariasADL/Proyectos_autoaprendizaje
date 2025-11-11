import {
  TransferPayload,
  TransferType
} from '@modules/transfers/entities/transfers.interface';
import { Favorite } from '@modules/favorites/entities/favorites.interface';
import { mapTransferPayload } from '@modules/transfers/mappers/transfers-payload.mapper';
import {
  CustomFacts,
  RechargePayload
} from '@modules/product-options/recharges/entities/recharges.interface';
import { mapRechargesPayload } from '@modules/product-options/recharges/mappers/recharges-payload.mapper';
import { mapMoneyOrdersPayload } from '@modules/withdraw/pages/money-orders/mappers/money-orders-payload.mapper';
import { WithdrawPayload } from '@modules/withdraw/entities/withdraw.interface';
import { mapMoneyOrdersVoucher } from '@modules/withdraw/pages/money-orders/mappers/money-orders-confirm.mapper';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { mapToTransferConfirm } from '@modules/favorites/pages/favorites-transfer/mappers/favorites-transfer-confirm.mapper';
import {
  stringToBoolean,
  valueToNumberFormat
} from '@commons/helpers/text.helpers';
import { mapRechargesVoucher } from '@modules/product-options/recharges/mappers/recharges-confirm.mapper';
import { PayBillPayload } from '@modules/payments/payment-services/entities/payment-services.interface';
import { mapServicesPayPayload } from '@modules/payments/payment-services/pages/payment-services-pay/mappers/services-pay-payload.mapper';
import { getDate } from '@commons/helpers/general.helpers';
import { Product } from '@commons/entities/product/product.interface';

export function mapPayloadTransfer(
  favorite: Favorite,
  amount: number,
  transferType: TransferType
): TransferPayload {
  const payloadTargetMapped = {
    [TransferType.FAST_TRANSFER]: payloadTransferTargetFast,
    [TransferType.SEND_AVV_PHONE]: payloadTransferAvvPhone,
    [TransferType.SEND_TRANSFIYA]: payloadTransferTargetTransfiya,
    [TransferType.SEND_CEL2CEL]: payloadTransferTargetTransfiya,
    [TransferType.MY_CONTACTS]: payloadTransferTargetContact
  };
  const isCel2Cel = transferType === TransferType.SEND_CEL2CEL;

  return mapTransferPayload({
    transferType,
    amount,
    addenda: {
      note: favorite.additionalDataTransaction?.note,
      referenceId: favorite.additionalDataTransaction?.referenceId
    },
    ...payloadTransferSourceAccount(favorite),
    ...(TransferType.SEND_TRANSFIYA === transferType
      ? {
          ...payloadTargetMapped[transferType](
            favorite.additionalDataTransaction.target
          )
        }
      : {
          ...(TransferType.SEND_CEL2CEL === transferType
            ? {
                ...payloadTargetMapped[transferType](
                  favorite.additionalDataTransaction.txTarget
                )
              }
            : {
                ...(TransferType.MY_CONTACTS === transferType
                  ? {
                      ...payloadTargetMapped[transferType](favorite)
                    }
                  : {
                      ...payloadTargetMapped[transferType](
                        favorite.targetAccountTransaction
                      )
                    })
              })
        }),
    ...(isCel2Cel ? payloadTransferCel2celFields(favorite) : {})
  });
}

export function mapPayloadRecharge(
  favorite: Favorite,
  amount: number,
  availableBalance: number,
  customFacts: CustomFacts
): RechargePayload {
  return mapRechargesPayload({
    productOrigin: {
      type: favorite.sourceAccountTransaction.typeAcctTransaction,
      id: favorite.sourceAccountTransaction.idAcctTransaction,
      availableBalance,
      typeName: favorite.additionalDataTransaction?.typeName,
      numberProduct: favorite.additionalDataTransaction?.numberProduct
    },
    mobileOperator: favorite.additionalDataTransaction.mobileOperator,
    amount,
    phoneNumber: favorite.additionalDataTransaction.target,
    customFacts
  });
}

export function mapPayloadMoneyOrder(
  favorite: Favorite,
  amount: number
): WithdrawPayload {
  return mapMoneyOrdersPayload({
    productOrigin: {
      type: favorite.sourceAccountTransaction.typeAcctTransaction,
      id: favorite.sourceAccountTransaction.idAcctTransaction
    },
    moneyOrderChannel: favorite.additionalDataTransaction?.channel,
    amount,
    who: favorite.additionalDataTransaction.target,
    cashoutType: favorite.additionalDataTransaction.cashoutType
  });
}

export function mapPayloadPaymentService(
  favorite: Favorite,
  amount: number
): PayBillPayload {
  return mapServicesPayPayload({
    fromProduct: {
      type: favorite.sourceAccountTransaction.typeAcctTransaction,
      id: favorite.sourceAccountTransaction.idAcctTransaction
    },
    amount,
    bill: {
      referenceId: favorite.additionalDataTransaction.target,
      invoiceNumber: favorite.additionalDataTransaction?.referenceId,
      agreementType: favorite.additionalDataTransaction.agreementType,
      maxPaymentDateComplete:
        favorite.additionalDataTransaction?.maxPaymentDateComplete,
      biller: stringToBoolean(favorite.additionalDataTransaction.biller),
      organizationId: favorite.additionalDataTransaction.organizationId,
      amountType: favorite.additionalDataTransaction.amountType
    }
  });
}

export function mapFavoriteTransfersVoucher(
  favorite: Favorite,
  amount: number
): VoucherItem[] {
  const mapped = mapToTransferConfirm.bind(this)(favorite) as VoucherItem[];
  mapped.unshift({
    id: 'amount',
    label: 'TRANSFERS.STEPS.VALUE',
    fields: [`$ ${valueToNumberFormat(amount)}`]
  });
  mapped.push({
    id: 'date-time',
    label: this.translate.instant('Fecha'),
    fields: [...getDate.bind(this)()]
  });
  return mapped.filter((voucherItem) => voucherItem.id !== 'title');
}

export function mapFavoriteRechargesVoucher(
  favorite: Favorite,
  amount: number
): VoucherItem[] {
  const product: Product = this.facade.getProduct(
    favorite.sourceAccountTransaction.typeAcctTransaction,
    favorite.sourceAccountTransaction.idAcctTransaction
  );
  return mapRechargesVoucher.bind(this)({
    productOrigin: {
      type: favorite.sourceAccountTransaction.typeAcctTransaction,
      numberProduct: product.numberProduct
    },
    mobileOperator: favorite.additionalDataTransaction?.mobileOperator,
    phoneNumber: favorite.additionalDataTransaction.target,
    amount: amount.toString()
  });
}

export function mapFavoriteMoneyOrdersVoucher(
  favorite: Favorite,
  amount: number
): VoucherItem[] {
  const product: Product = this.facade.getProduct(
    favorite.sourceAccountTransaction.typeAcctTransaction,
    favorite.sourceAccountTransaction.idAcctTransaction
  );
  return mapMoneyOrdersVoucher.bind(this)({
    productOrigin: {
      type: favorite.sourceAccountTransaction.typeAcctTransaction,
      numberProduct: product.numberProduct
    },
    amount: amount.toString(),
    moneyOrderChannel: favorite.additionalDataTransaction?.channel,
    who: favorite.additionalDataTransaction.target
  });
}

export function mapFavoritePaymentServiceVoucher(
  favorite: Favorite,
  amount: number
): VoucherItem[] {
  const mapped = mapToTransferConfirm.bind(this)(favorite) as VoucherItem[];
  mapped.unshift({
    id: 'amount',
    label: 'STEP_LABELS.AMOUNT',
    fields: [`$ ${valueToNumberFormat(amount)}`]
  });
  mapped.push({
    id: 'date-time',
    label: this.translate.instant('Fecha'),
    fields: [...getDate.bind(this)()]
  });
  return mapped.filter((voucherItem) => voucherItem.id !== 'title');
}

function payloadTransferSourceAccount(values: any): {
  fromProduct: { type: string; id: string; numberProduct: string };
} {
  return {
    fromProduct: {
      numberProduct: values.additionalDataTransaction.numberProduct,
      type: values.sourceAccountTransaction.typeAcctTransaction,
      id: values.sourceAccountTransaction.idAcctTransaction
    }
  };
}

function payloadTransferTargetFast(values: any): {
  towardAccountType: string;
  towardAccount: string;
} {
  return {
    towardAccountType: values.typeAcctTransaction,
    towardAccount: values.idAcctTransaction
  };
}

function payloadTransferTargetContact(values: Favorite) {
  const { contactId, contactIdType, targetBank } =
    values.additionalDataTransaction;

  return {
    contact: {
      identificationData: {
        id: contactId,
        idType: contactIdType
      }
    },
    contactProduct: {
      type: {
        id: values.targetAccountTransaction.typeAcctTransaction
      },
      relativeId: values.targetAccountTransaction.idAcctTransaction,
      bank: { id: targetBank }
    }
  };
}

function payloadTransferAvvPhone(values: any): { phoneNumber: string } {
  return {
    phoneNumber: values.idAcctTransaction
  };
}

function payloadTransferTargetTransfiya(value: any): { phoneNumber: string } {
  return {
    phoneNumber: value
  };
}

function payloadTransferCel2celFields(favorite: Favorite) {
  const [name, bankName] =
    favorite.additionalDataTransaction.additionalTargetInfo.split('-');
  return {
    towardProduct: {
      account: {
        accountType: favorite.targetAccountTransaction.typeAcctTransaction,
        accountId: favorite.targetAccountTransaction.idAcctTransaction,
        bankInfo: {
          bankId: favorite.additionalDataTransaction.targetBank
        }
      },
      personInfo: {
        name
      },
      bankName
    }
  };
}
