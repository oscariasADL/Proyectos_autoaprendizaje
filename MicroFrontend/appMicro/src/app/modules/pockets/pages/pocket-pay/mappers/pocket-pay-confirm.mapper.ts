import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { getFullProductType } from '@modules/product/helpers/product.helper';

export function mapPocketPayConfirm(values: any): VoucherItem[] {
  const amount: number = sanitizeCurrency(values.amount);

  return [
    {
      id: 'from',
      label: this.translate.instant('POCKETS.FIELDS.FROM'),
      fields: [
        getFullProductType({ type: values.pocket.productTypeParent }),
        `${this.translate.instant('ACCOUNT_NUMBER')} ${
          values.pocket.productNumberParent
        }`
      ]
    },
    {
      id: 'toward',
      label: this.translate.instant('POCKETS.FIELDS.TO'),
      fields: [values.pocket.description]
    },
    {
      id: 'amount',
      label: this.translate.instant('POCKETS.FIELDS.VALUE_TO_PAY'),
      fields: [this.currencyFormat.transform(amount)]
    }
  ];
}
