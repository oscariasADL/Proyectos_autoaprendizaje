import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { capitalize, sanitizeCurrency } from '@commons/helpers/text.helpers';
import { Pocket } from '@modules/pockets/entities/pockets.interface';

export function mapPocketTransferConfirm(values: any): VoucherItem[] {
  const amount: number = sanitizeCurrency(values.amount);
  const pocket = values.pocket as Pocket;
  const towardFields = !!values.targetPocket
    ? [values.targetPocket.label]
    : [
        this.translate.instant('POCKETS.FIELDS.SAVINGS_ACCOUNT'),
        `${this.translate.instant('ACCOUNT_NUMBER')} ${
          values.pocket.productNumberParent
        }`
      ];

  return [
    {
      id: 'from',
      label: this.translate.instant('POCKETS.FIELDS.FROM'),
      fields: [capitalize(pocket.description)]
    },
    {
      id: 'amount_saved',
      label: this.translate.instant('POCKETS.FIELDS.SAVED'),
      fields: [this.currencyFormat.transform(pocket.amountSaved)]
    },
    {
      id: 'toward',
      label: this.translate.instant('POCKETS.FIELDS.TO'),
      fields: towardFields
      //edit: PocketTransferSlide.transfer
    },
    {
      id: 'amount',
      label: this.translate.instant('POCKETS.FIELDS.VALUE_TO_TRANSFER'),
      fields: [this.currencyFormat.transform(amount)]
    }
  ];
}
