import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { calculateInstallmentsPocket } from '@modules/pockets/pages/pocket-edit/helpers/pocket-edit.helpers';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';

export function mapPocketEditConfirm(values: any): VoucherItem[] {
  const currencyFormatPipe = new CurrencyFormatPipe('en-US');
  const name: string = values.name.trim();
  const pocketCategory = values.category.label;
  const goal: number = sanitizeCurrency(values.goal);
  const quota: number = sanitizeCurrency(values.quota);
  const period: string = values.period.label;
  const amountSaved: number = values.amountSaved;
  const installments: number = calculateInstallmentsPocket(
    goal,
    quota,
    amountSaved
  );

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
      id: 'goal',
      label: 'POCKETS.FIELDS.GOAL',
      fields: [currencyFormatPipe.transform(goal)]
    },
    {
      id: 'quota',
      label: 'POCKETS.FIELDS.QUOTA',
      fields: [currencyFormatPipe.transform(quota)]
    },
    {
      id: 'period',
      label: 'POCKETS.FIELDS.PERIOD',
      fields: [period]
    },
    {
      id: 'installments',
      label: 'POCKETS.FIELDS.INSTALLMENTS',
      fields: [currencyFormatPipe.transform(installments)]
    }
  ];
}
