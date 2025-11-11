import { Pocket } from '@modules/pockets/entities/pockets.interface';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { Product } from '@app/commons/entities/product/product.interface';

export function mapPocketPayData(
  pocket: Pocket,
  product: Product
): VoucherItem[] {
  const currencyFormatPipe = new CurrencyFormatPipe('en-US');
  return [
    {
      id: 'goal',
      label: 'POCKETS.FIELDS.GOAL',
      fields: [currencyFormatPipe.transform(pocket.goal.toString())]
    },
    {
      id: 'amount_Saved',
      label: 'POCKETS.FIELDS.SAVED',
      fields: [currencyFormatPipe.transform(pocket.amountSaved.toString())]
    },
    {
      id: 'from',
      label: 'POCKETS.FIELDS.FROM',
      fields: [`No. ${product.idUM}`]
    },
    {
      id: 'available',
      label: 'POCKETS.FIELDS.AVAILABLE_BALANCE',
      fields: [
        currencyFormatPipe.transform(product.availableBalance.toString())
      ]
    }
  ];
}
