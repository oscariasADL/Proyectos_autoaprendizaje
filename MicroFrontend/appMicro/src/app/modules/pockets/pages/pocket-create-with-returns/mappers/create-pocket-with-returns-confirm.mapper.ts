import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { Product } from '@commons/entities/product/product.interface';

export function mapPocketWithReturnsCreateVoucher(values: any): VoucherItem[] {
  const currencyFormatPipe = new CurrencyFormatPipe('en-US');
  const name: string = values.name.trim();
  const pocketCategory: string = values.category.label;
  const product: Product = values.product;
  const goal: number = sanitizeCurrency(values.goal);
  const periodicity: string = values.periodicity.label;
  const period: string = values.period;
  const openAmount: number = sanitizeCurrency(values.openAmount) || 0;

  return [
    {
      id: 'name',
      label: 'POCKETS.FIELDS.POCKET_NAME',
      fields: [name]
    },
    {
      id: 'category',
      label: 'POCKETS.FIELDS.CATEGORY',
      fields: [pocketCategory]
    },
    {
      id: 'from',
      label: 'POCKETS.FIELDS.ORIGIN_ACCOUNT',
      fields: [`No. ${product.idUM}`]
    },
    {
      id: 'goal',
      label: 'POCKETS.FIELDS.GOAL',
      fields: [currencyFormatPipe.transform(goal)]
    },
    {
      id: 'periodicity',
      label: 'POCKETS.FIELDS.PERIOD',
      fields: [periodicity]
    },
    {
      id: 'deadline',
      label: 'POCKETS.FIELDS.DEADLINE',
      fields: [`${period} días`]
    },
    {
      id: 'openAmount',
      label: 'POCKETS.FIELDS.OPEN_AMOUNT',
      fields: [currencyFormatPipe.transform(openAmount)]
    }
  ];
}
