import {
  VoucherItem,
  VoucherItemType
} from '@commons/components/voucher/entities/voucher.entities';
import { TransferSlide } from '@modules/transfers/constants/transfers.constants';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { isNullOrUndefinedOrEmpty } from '@commons/helpers/text.helpers';
import {
  mapSourceAccounts,
  payloadMapped
} from '@modules/transfers/mappers/transfers-confirm.mapper';
import { Product } from '@commons/entities/product/product.interface';
import { getProductType } from '@modules/product/helpers/product.helper';

export function mapTransfersCel2celConfirm(values: any): VoucherItem[] {
  const transferType = values.transferType;
  const note: string = values.addenda.note;
  const invoice: string = values.addenda.referenceId;
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
      id: 'toward',
      label:
        transferType === TransferType.SEND_TRANSFIYA ||
        transferType === TransferType.REQUEST_TRANSFIYA
          ? 'TRANSFERS.STEPS.TO'
          : 'TRANSFERS.STEPS.TOWARD',
      fields: payloadMapped[transferType].bind(this, values)(),
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

export function mapSourceAccountsCel2cel(values: any): any {
  const fromProduct: Product = values.fromProduct;

  return [
    `${getProductType(fromProduct)} ${this.translate.instant(
      'ACCOUNT_NUMBER'
    )} ${fromProduct.numberProduct}`
  ];
}
