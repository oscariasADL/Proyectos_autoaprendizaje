import {
  VoucherItem,
  VoucherItemType
} from '@commons/components/voucher/entities/voucher.entities';
import { AVAL_BANKS, BANK_GROUP } from '@commons/constants/card.constants';
import { TransactionCostIds } from '@commons/entities/fee/fee.interface';
import { Product } from '@commons/entities/product/product.interface';
import { isNullOrUndefinedOrEmpty } from '@commons/helpers/text.helpers';
import {
  Contact,
  ContactProduct
} from '@modules/contacts/entities/contact.interface';
import { getProductType } from '@modules/product/helpers/product.helper';
import {
  TRANSFERS_AVAILABLE_FIELD,
  TransferSlide
} from '@modules/transfers/constants/transfers.constants';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { getDate } from '@commons/helpers/general.helpers';
import { mapSourceAccountsCel2cel } from '@modules/transfers/mappers/transfers-cel2cel.mapper';
import { TowardAccount } from '@modules/transfers/pages/transfers-aval-key/entities/transfers-aval-key.interface';
import { SpiKeyType } from '@modules/product/entities/product-spi-user-key';

export const payloadMapped = {
  [TransferType.MY_ACCOUNTS_AVV]: mapTowardOwnAccounts,
  [TransferType.FAST_TRANSFER]: mapTowardFastTransfer,
  [TransferType.MY_CONTACTS]: mapTowardContact,
  [TransferType.SEND_TRANSFIYA]: mapTransfiya,
  [TransferType.SEND_AVV_PHONE]: mapCellPhone,
  [TransferType.SEND_CEL2CEL]: mapCel2cel,
  [TransferType.REQUEST_CEL2CEL]: mapToRequestCel2cel,
  [TransferType.REQUEST_TRANSFIYA]: mapToRequestTransfiya,
  [TransferType.SEND_AVAL_KEY]: mapAvalKey
};

export function mapTransfersConfirm(values: any): VoucherItem[] {
  const transferType = values.transferType;
  const note: string = values.addenda?.note;
  const invoice: string = values.addenda?.referenceId;
  const costGmf = this.form.controls.costGmf.currencyValue();
  const gmfMapped = costGmf ? this.currencyFormat.transform(costGmf) : 0;

  return [
    {
      id: 'amount',
      label: 'TRANSFERS.STEPS.VALUE',
      fields: [
        `${this.currencyFormat.transform(
          this.form.controls.amount.currencyValue()
        )}`,
        ...(costGmf
          ? [`${this.translate.instant('GMF.VALUE', { value: gmfMapped })} `]
          : [])
      ],
      edit: TransferSlide.amount
    },
    {
      id: 'from',
      label:
        transferType === TransferType.REQUEST_TRANSFIYA
          ? 'TRANSFERS.STEPS.TARGET'
          : 'TRANSFERS.STEPS.FROM',
      fields:
        transferType === TransferType.REQUEST_CEL2CEL ||
        transferType === TransferType.SEND_CEL2CEL
          ? [...mapSourceAccountsCel2cel.bind(this, values)()]
          : [...mapSourceAccounts.bind(this, values)()],
      edit: TransferSlide.from
    },
    {
      id: 'toward',
      label:
        transferType === TransferType.SEND_TRANSFIYA ||
        transferType === TransferType.REQUEST_TRANSFIYA
          ? 'TRANSFERS.STEPS.TO'
          : 'TRANSFERS.STEPS.TOWARD',
      fields: payloadMapped[transferType].bind(this, values)(),
      edit: this.currentSlide
    },
    {
      id: 'cost',
      label: 'TRANSFERS.STEPS.COST',
      fields: [this.currencyFormat.transform(this.form.controls.fee.value)]
    },
    ...(!isNullOrUndefinedOrEmpty(note)
      ? [
          {
            id: 'note',
            label: 'TRANSFERS.STEPS.MESSAGE',
            fields: [note],
            type: VoucherItemType.Note,
            edit: TransferSlide.amount
          }
        ]
      : []),
    ...(!isNullOrUndefinedOrEmpty(invoice)
      ? [
          {
            id: 'reference',
            label: 'TRANSFERS.STEPS.ADDITIONAL_DATA',
            fields: [invoice],
            ...(isNullOrUndefinedOrEmpty(note)
              ? { edit: TransferSlide.amount, type: VoucherItemType.Note }
              : { type: VoucherItemType.AdditionalData })
          }
        ]
      : [])
  ];
}

export function mapTransfersVoucher(values: any): VoucherItem[] {
  const transferType = values.transferType;
  const note: string = values.addenda.note;
  const invoice: string = values.addenda.referenceId;

  return [
    {
      id: 'amount',
      label: 'TRANSFERS.STEPS.VALUE',
      fields: [
        this.currencyFormat.transform(this.form.controls.amount.currencyValue())
      ]
    },
    {
      id: 'from',
      label:
        transferType === TransferType.REQUEST_TRANSFIYA
          ? 'TRANSFERS.STEPS.TARGET'
          : 'TRANSFERS.STEPS.FROM',
      fields:
        transferType === TransferType.REQUEST_CEL2CEL ||
        transferType === TransferType.SEND_CEL2CEL
          ? [...mapSourceAccountsCel2cel.bind(this, values)()]
          : [...mapSourceAccounts.bind(this, values)()]
    },
    {
      id: 'toward',
      label:
        transferType === TransferType.SEND_TRANSFIYA ||
        transferType === TransferType.REQUEST_TRANSFIYA
          ? 'TRANSFERS.STEPS.TO'
          : 'TRANSFERS.STEPS.TOWARD',
      fields: payloadMapped[transferType].bind(this, values, false)()
    },
    {
      id: 'date-time',
      label: 'Fecha',
      fields: [...getDate.bind(this)()]
    },
    ...(!isNullOrUndefinedOrEmpty(note)
      ? [
          {
            id: 'note',
            label: 'TRANSFERS.STEPS.MESSAGE',
            fields: [note]
            // type: VoucherItemType.Note
          }
        ]
      : []),
    ...(!isNullOrUndefinedOrEmpty(invoice)
      ? [
          {
            id: 'reference',
            label: 'TRANSFERS.STEPS.ADDITIONAL_DATA',
            fields: [invoice]
            /*...(isNullOrUndefinedOrEmpty(note)
? { type: VoucherItemType.Note }
: { type: VoucherItemType.AdditionalData })*/
          }
        ]
      : [])
  ];
}

export function mapSourceAccounts(values: any): any {
  const transferType: TransferType = values.transferType;
  const fromProduct: Product = values.fromProduct;

  return transferType === TransferType.SEND_TRANSFIYA
    ? [
        `${getProductType(fromProduct)} ${this.translate.instant(
          'ACCOUNT_NUMBER'
        )} ${fromProduct.numberProduct}`
      ]
    : [
        `${getProductType(fromProduct)} ${this.translate.instant(
          'ACCOUNT_NUMBER'
        )} ${fromProduct.numberProduct}`,
        `${this.translate.instant('AVAILABLE')} ${this.currencyFormat.transform(
          fromProduct[TRANSFERS_AVAILABLE_FIELD]
        )}`
      ];
}

function mapTowardOwnAccounts(values: any): string[] {
  const product: Product = values.ownProduct;
  return [
    `${getProductType(product)} No. ${product.numberProduct}`,
    `${this.currencyFormat.transform(product.availableBalance)}`
  ];
}

function mapTowardFastTransfer(values: any): string[] {
  const type: string = values.towardAccountType;
  const productId: string = values.towardAccount;

  return [
    this.translate.instant('AVAL_PRODUCTS.AV_VILLAS'),
    `${getProductType({ type })} ${this.translate.instant(
      'ACCOUNT_NUMBER'
    )} ${productId}`
  ];
}

function mapTowardContact(values: any, showName: boolean = true): string[] {
  const contact: Contact = values.contact;
  const contactProduct: ContactProduct = values.contactProduct;

  return [
    ...(showName ? [contact.name] : []),
    contactProduct.bank.name,
    `${contactProduct.type.name} ${this.translate.instant('ACCOUNT_NUMBER')} ${
      contactProduct.number
    }`
  ];
}

function mapCellPhone(values: any, showName: boolean = true): string[] {
  const phoneNumber = values?.phoneNumber || values?.contactProduct;
  return [
    ...(showName && values?.contact?.name ? [values?.contact?.name] : []),
    phoneNumber,
    this.translate.instant('TRANSFERS.TYPES.SEND_AVV_PHONE')
  ];
}

function mapCel2cel(values: any): string[] {
  const phoneNumber = values?.phoneNumber || values?.contactProduct;
  return [
    phoneNumber,
    values.towardProduct?.bankName
      ? ''
      : this.translate.instant('TRANSFERS.CEL2CEL.OTHER_ENTITIES_TRANSFIYA'),
    ...(values?.towardProduct?.personInfo?.name &&
    values?.towardProduct?.bankName
      ? [
          values?.towardProduct?.personInfo?.name +
            ' / ' +
            values?.towardProduct?.bankName
        ]
      : [])
  ];
}

function mapTransfiya(values: any, showName: boolean = true): string[] {
  const phoneNumber = values?.phoneNumber || values?.contactProduct;
  return [
    ...(showName && values?.contact?.name ? [values?.contact?.name] : []),
    phoneNumber,
    this.translate.instant('TRANSFERS.TYPES.SEND_TRANSFIYA')
  ];
}

function mapToRequestTransfiya(values: any): string[] {
  const phoneNumber = values?.phoneNumber || values?.contactProduct;
  return [phoneNumber];
}

function mapToRequestCel2cel(values: any): string[] {
  const phoneNumber = values?.phoneNumber || values?.contactProduct;
  const nameToward = values?.contactData
    ? ' - ' + values?.contactData?.displayName
    : '';
  return [
    phoneNumber + ' ' + nameToward,
    this.translate.instant('TRANSFERS.CEL2CEL.OTHER_ENTITIES_TRANSFIYA')
  ];
}

function mapAvalKey(values: any): string[] {
  const avalKey = values.towardAvalKey;
  const name = values.contactName;
  const towardProduct = values.towardProduct as TowardAccount;
  const bankName = towardProduct.bankName;
  return [avalKey, ...(name && bankName ? [`${name} - ${bankName}`] : [])];
}

export function mapBreBKey(values: any): string[] {
  const breBKey = values.towardAvalKey;
  const towardProduct = values.towardProduct as TowardAccount;
  const bankName = towardProduct.bankName;
  return [`${towardProduct.fullName} - ${bankName}`, `${breBKey}`];
}

export function mapFeePayload(
  transferType: TransferType,
  contactProduct?: ContactProduct
): number {
  switch (transferType) {
    case TransferType.MY_ACCOUNTS_AVV:
    case TransferType.FAST_TRANSFER:
      return TransactionCostIds.TransferToAVVillas;
    case TransferType.SEND_TRANSFIYA:
      return TransactionCostIds.Transfiya;
    case TransferType.REQUEST_TRANSFIYA:
      return TransactionCostIds.RequestTransfiya;
    case TransferType.SEND_CEL2CEL:
    case TransferType.SEND_AVAL_KEY:
      return TransactionCostIds.TransferToAVAL;
    case TransferType.MY_CONTACTS:
      const bankId = contactProduct.bank.id;
      return bankId === BANK_GROUP.VILLAS_CODE
        ? TransactionCostIds.TransferToAVVillas
        : AVAL_BANKS.includes(bankId)
        ? TransactionCostIds.TransferToAVAL
        : TransactionCostIds.TransferToACH;
  }
}
