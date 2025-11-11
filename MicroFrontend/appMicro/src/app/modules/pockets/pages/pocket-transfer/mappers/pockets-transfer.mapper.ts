import { Pocket } from '@modules/pockets/entities/pockets.interface';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { capitalize } from '@commons/helpers/text.helpers';

export function mapPocketTransferData(pocket: Pocket): VoucherItem[] {
  const currencyFormatPipe = new CurrencyFormatPipe('en-US');
  return [
    {
      id: 'from',
      label: 'Desde',
      fields: [capitalize(pocket.description)]
    },
    {
      id: 'amount_Saved',
      label: 'Plata ahorrada',
      fields: [currencyFormatPipe.transform(pocket.amountSaved.toString())]
    }
  ];
}
