import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { Product } from '@commons/entities/product/product.interface';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { POCKET_CREATE_AVAILABLE_FIELD } from '@modules/pockets/pages/pocket-create/constants/pocket-create.constants';
import { getFullProductType } from '@modules/product/helpers/product.helper';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { calculateInstallmentsPocket } from '@modules/pockets/pages/pocket-edit/helpers/pocket-edit.helpers';

export function mapPocketCreateConfirm(values: any): VoucherItem[] {
  const name: string = values.name.trim();
  const product: Product = values.product;
  const period: string = values.period.label;
  const pocketCategory = values.category.label;
  const goal: number = sanitizeCurrency(values.goal);
  const quota: number = sanitizeCurrency(values.quota);
  const openAmount: number = sanitizeCurrency(values.openAmount) || 0;
  const installments: number = values.installments
    ?.toString()
    ?.split(':')
    ?.at(1)
    .trim();

  return [
    {
      id: 'name',
      label: this.translate.instant(
        'POCKETS.CREATE.CONFIRMATION_STEP.FIELDS.NAME'
      ),
      fields: [name]
    },
    {
      id: 'category',
      label: this.translate.instant(
        'POCKETS.CREATE.CONFIRMATION_STEP.FIELDS.CATEGORY'
      ),
      fields: [pocketCategory]
    },
    {
      id: 'origin-account',
      label: this.translate.instant(
        'POCKETS.CREATE.CONFIRMATION_STEP.FIELDS.ORIGIN_ACCOUNT'
      ),
      fields: [
        getFullProductType(product),
        `${this.translate.instant('ACCOUNT_NUMBER')} ${product.numberProduct}`,
        `${this.translate.instant('AVAILABLE')} ${this.currencyFormat.transform(
          product[POCKET_CREATE_AVAILABLE_FIELD]
        )}`
      ]
    },
    {
      id: 'goal',
      label: this.translate.instant(
        'POCKETS.CREATE.CONFIRMATION_STEP.FIELDS.GOAL'
      ),
      fields: [this.currencyFormat.transform(goal)]
    },
    {
      id: 'quota',
      label: this.translate.instant(
        'POCKETS.CREATE.CONFIRMATION_STEP.FIELDS.QUOTA'
      ),
      fields: [this.currencyFormat.transform(quota)]
    },
    {
      id: 'installments',
      label: this.translate.instant(
        'POCKETS.CREATE.CONFIRMATION_STEP.FIELDS.INSTALLMENTS'
      ),
      fields: [installments.toString()]
    },
    {
      id: 'period',
      label: this.translate.instant(
        'POCKETS.CREATE.CONFIRMATION_STEP.FIELDS.PERIOD'
      ),
      fields: [period]
    },
    {
      id: 'open-amount',
      label: this.translate.instant(
        'POCKETS.CREATE.CONFIRMATION_STEP.FIELDS.OPEN_AMOUNT'
      ),
      fields: [this.currencyFormat.transform(openAmount)]
    }
  ];
}

export function mapPocketCreateVoucher(values: any): VoucherItem[] {
  const currencyFormatPipe = new CurrencyFormatPipe('en-US');
  const name: string = values.name.trim();
  const pocketCategory: string = values.category.label;
  const product: Product = values.product;
  const period: string = values.period.label;
  const goal: number = sanitizeCurrency(values.goal);
  const quota: number = sanitizeCurrency(values.quota);
  const openAmount: number = sanitizeCurrency(values.openAmount) || 0;
  const installments: number = calculateInstallmentsPocket(
    goal,
    quota,
    openAmount
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
      id: 'installments',
      label: 'POCKETS.FIELDS.INSTALLMENTS',
      fields: [installments.toString()]
    },
    {
      id: 'period',
      label: 'POCKETS.FIELDS.PERIOD',
      fields: [period]
    }
  ];
}
