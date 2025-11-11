import {
  Favorite,
  IdentificationFavoriteType,
  SubtypeOperations
} from '@modules/favorites/entities/favorites.interface';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { getProductType } from '@modules/product/helpers/product.helper';
import { Product } from '@commons/entities/product/product.interface';
import {
  capitalize,
  isNullOrUndefinedOrEmpty,
  valueToNumberFormat
} from '@commons/helpers/text.helpers';
import { ChannelType } from '@modules/withdraw/entities/withdraw.interface';

export function mapToTransferConfirm(favorite: Favorite): VoucherItem[] {
  const subTypeOperation = favorite.additionalDataTransaction.subtypeOperation;

  switch (favorite.identificationFavoriteType) {
    case IdentificationFavoriteType.TRANSFER:
      const isCel2cel =
        favorite.additionalDataTransaction.subtypeOperation &&
        favorite.additionalDataTransaction.subtypeOperation?.toString() ===
          SubtypeOperations.CEL2CEL.toString();
      return [
        {
          id: 'from',
          label: 'TRANSFERS.STEPS.FROM',
          fields: mapSourceAccount.bind(this)(favorite.sourceAccountTransaction)
        },
        {
          id: !isCel2cel ? 'toward' : 'target',
          label:
            subTypeOperation === SubtypeOperations.TRANSFIYA
              ? 'TRANSFERS.STEPS.TO'
              : 'TRANSFERS.STEPS.TOWARD',
          fields: [
            ...mapFieldsType[
              favorite.additionalDataTransaction.subtypeOperation
            ](favorite)
          ]
        },
        ...additionalData(
          favorite?.additionalDataTransaction?.note,
          favorite?.additionalDataTransaction?.referenceId
        ),
        {
          id: 'title',
          label: 'FAVORITES.LABEL',
          fields: [favorite.nameFavoriteTransaction]
        }
      ];
    case IdentificationFavoriteType.RECHARGE:
      return [
        {
          id: 'from',
          label: 'TRANSFERS.STEPS.FROM',
          fields: mapSourceAccount.bind(this)(favorite.sourceAccountTransaction)
        },
        {
          id: 'telephone_operator',
          label: 'RECHARGES.STEPS.OPERATOR',
          fields: [
            capitalize(favorite.additionalDataTransaction.mobileOperator)
          ]
        },
        {
          id: 'toward',
          label: 'STEP_LABELS.TOWARD',
          fields: [favorite.additionalDataTransaction.target]
        },
        {
          id: 'title',
          label: 'FAVORITES.LABEL',
          fields: [favorite.nameFavoriteTransaction]
        }
      ];
    case IdentificationFavoriteType.MONEY_ORDER:
      return [
        {
          id: 'from',
          label: 'TRANSFERS.STEPS.FROM',
          fields: mapSourceAccount.bind(this)(favorite.sourceAccountTransaction)
        },
        {
          id: 'toward',
          label: 'TRANSFERS.STEPS.TO',
          fields: [
            this.translate.instant(
              'FAVORITES.TRANSFER.CONTENT.MONEY_ORDER.FIELD_DOC'
            ),
            favorite.additionalDataTransaction.target
          ]
        },
        {
          id: 'channel_type',
          label: 'FAVORITES.TRANSFER.CONTENT.MONEY_ORDER.FIELD_WHERE',
          fields: [
            ...(favorite.additionalDataTransaction.channel.toString() ===
            ChannelType.ATM.toString()
              ? [this.translate.instant('WITHDRAW.CHANNEL_TYPE.ATM')]
              : [this.translate.instant('WITHDRAW.CHANNEL_TYPE.CB')])
          ]
        },
        {
          id: 'title',
          label: 'FAVORITES.LABEL',
          fields: [favorite.nameFavoriteTransaction]
        }
      ];
    case IdentificationFavoriteType.PAYMENT:
      return [
        ...(favorite.amountTransaction
          ? [
              {
                id: 'amount',
                label: 'TRANSFERS.STEPS.VALUE',
                fields: [
                  `$ ${valueToNumberFormat(Number(favorite.amountTransaction))}`
                ]
              }
            ]
          : []),
        {
          id: 'from',
          label: 'STEP_LABELS.FROM',
          fields: mapSourceAccount.bind(this)(favorite.sourceAccountTransaction)
        },
        {
          id: 'service',
          label: 'PAYMENTS.SERVICES.STEPS.SERVICE',
          fields:
            `${favorite.additionalDataTransaction.descriptionTargetLabel} ${favorite.additionalDataTransaction.target}`
              .split('-')
              .map((str) => str.trim())
        },
        {
          id: 'title',
          label: 'FAVORITES.LABEL',
          fields: [favorite.nameFavoriteTransaction]
        }
      ];
  }
}

export function additionalData(
  note: string,
  referenceId: string
): VoucherItem[] {
  return [
    ...(!isNullOrUndefinedOrEmpty(note)
      ? [
          {
            id: 'note',
            label: 'TRANSFERS.STEPS.MESSAGE',
            fields: [note]
          }
        ]
      : []),
    ...(!isNullOrUndefinedOrEmpty(referenceId)
      ? [
          {
            id: 'additional_data',
            label: 'TRANSFERS.STEPS.ADDITIONAL_DATA',
            fields: [referenceId]
          }
        ]
      : [])
  ];
}

export function mapSourceAccount(values: any): string[] {
  const product: Product = this.facade.getProduct(
    values.typeAcctTransaction,
    values.idAcctTransaction
  );
  return [
    `${getProductType(product)}
    ${this.translate.instant('ACCOUNT_NUMBER')} ${product.numberProduct}`,
    `${this.translate.instant('PRODUCT.FIELDS.AVAILABLE')} $ ${
      product.availableBalance && valueToNumberFormat(product.availableBalance)
    }`
  ];
}

export const mapFieldsType = {
  [SubtypeOperations.TRANSFER_AVV_ACC]: mapTowardAVVAccounts,
  [SubtypeOperations.TRANSFER_MY_AVV_ACCOUNTS]: mapTowardAVVAccounts,
  [SubtypeOperations.TRANSFER_AVV_PHONE]: mapTowardAVVPhone,
  [SubtypeOperations.TRANSFIYA]: mapTowardTransfiya,
  [SubtypeOperations.CEL2CEL]: mapTowardCel2cel,
  [SubtypeOperations.REGISTERED_CONTACTS]: mapTransferContacts
};

export function mapTowardAVVAccounts(value: Favorite): string[] {
  return [
    value.additionalDataTransaction.descriptionTargetLabel,
    `${getProductType({
      type: value.targetAccountTransaction.typeAcctTransaction
    })} No. ${value.targetAccountTransaction.idAcctTransaction}`
  ];
}

function mapTowardAVVPhone(value: Favorite): string[] {
  return [
    value.additionalDataTransaction.target,
    value.additionalDataTransaction.descriptionTargetLabel
  ];
}

function mapTowardTransfiya(value: Favorite): string[] {
  return [
    value.additionalDataTransaction.target,
    value.additionalDataTransaction.descriptionTargetLabel
  ];
}

function mapTowardCel2cel(value: Favorite): string[] {
  return [
    value.additionalDataTransaction.txTarget,
    value.additionalDataTransaction.additionalTargetInfo
  ];
}
function mapTransferContacts(value: Favorite) {
  return [
    value.additionalDataTransaction.target,
    value.additionalDataTransaction.descriptionTargetLabel
  ];
}
