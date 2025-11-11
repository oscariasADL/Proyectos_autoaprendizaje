import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { Product } from '@commons/entities/product/product.interface';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { CardAdvanceSlide } from '@modules/product-options/card-advance/constants/card-advance.constants';
import { USE_QUOTA_AVAILABLE_FIELD } from '@modules/product-options/use-quota/constants/use-quota.constants';
import { getFullProductType } from '@modules/product/helpers/product.helper';

export function mapUseQuotaConfirm(values: any): VoucherItem[] {
  const fromProduct: Product = values.fromProduct;
  const towardProduct: Product = values.towardProduct;
  const installments: number = values.installments;
  const amount: string = values.amount;
  const fee: string = values.fee;

  return [
    {
      id: 'amount',
      label: this.translate.instant('USE_QUOTA.AMOUNT'),
      fields: [
        this.currencyFormat.transform(sanitizeCurrency(amount)),
        `${this.translate.instant(
          'USE_QUOTA.INSTALLMENTS_DESCRIPTION'
        )} ${installments}`
      ],
      edit: CardAdvanceSlide.amount
    },
    {
      id: 'from',
      label: this.translate.instant('USE_QUOTA.FROM'),
      fields: [
        `${getFullProductType(fromProduct)}`,
        `${this.translate.instant('USE_QUOTA.NUMBER')} ${
          fromProduct.numberProduct
        }`,
        `${this.translate.instant(
          'USE_QUOTA.AVAILABLE'
        )} ${this.currencyFormat.transform(
          fromProduct[USE_QUOTA_AVAILABLE_FIELD]
        )}`
      ]
    },
    {
      id: 'toward',
      label: this.translate.instant('USE_QUOTA.TO'),
      fields: [
        `${getFullProductType(towardProduct)}`,
        `${this.translate.instant('USE_QUOTA.NUMBER')} ${
          towardProduct.numberProduct
        }`
      ],
      edit: CardAdvanceSlide.toward
    },
    {
      id: 'cost',
      label: this.translate.instant('USE_QUOTA.COST'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(fee))]
    }
  ];
}

export function mapUseQuotaVoucher(values: any): VoucherItem[] {
  const fromProduct: Product = values.fromProduct;
  const towardProduct: Product = values.towardProduct;
  const installments: number = values.installments;
  const amount: string = values.amount;

  return [
    {
      id: 'amount',
      label: this.translate.instant('USE_QUOTA.AMOUNT'),
      fields: [
        this.currencyFormat.transform(sanitizeCurrency(amount)),
        `${this.translate.instant(
          'USE_QUOTA.INSTALLMENTS_DESCRIPTION'
        )} ${installments}`
      ]
    },
    {
      id: 'from',
      label: this.translate.instant('USE_QUOTA.FROM'),
      fields: [
        ` ${getFullProductType(fromProduct)} ${this.translate.instant(
          'USE_QUOTA.NUMBER'
        )} ${fromProduct.numberProduct}`
      ]
    },
    {
      id: 'toward',
      label: this.translate.instant('USE_QUOTA.TO'),
      fields: [
        `${getFullProductType(towardProduct)}`,
        `${this.translate.instant('USE_QUOTA.NUMBER')} ${
          towardProduct.numberProduct
        }`
      ]
    }
  ];
}
