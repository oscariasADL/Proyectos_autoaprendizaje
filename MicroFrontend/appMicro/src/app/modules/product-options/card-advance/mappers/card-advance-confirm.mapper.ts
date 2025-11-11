import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { Product } from '@commons/entities/product/product.interface';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import {
  CARD_ADVANCE_AVAILABLE_FIELD,
  CardAdvanceSlide
} from '@modules/product-options/card-advance/constants/card-advance.constants';
import {
  getFullProductType,
  getProductType
} from '@modules/product/helpers/product.helper';

export function mapCardAdvanceConfirm(values: any): VoucherItem[] {
  const fromProduct: Product = values.fromProduct;
  const towardProduct: Product = values.towardProduct;
  const installments: string = values.installments;
  const amount: string = values.amount;
  const fee: string = values.fee;

  return [
    {
      id: 'amount',
      label: this.translate.instant('Valor'),
      fields: [
        this.currencyFormat.transform(sanitizeCurrency(amount)),
        `${this.translate.instant(
          'CARD_ADVANCE.INSTALLMENTS_DESCRIPTION'
        )}: ${installments}`
      ],
      edit: CardAdvanceSlide.amount
    },
    {
      id: 'from',
      label: this.translate.instant('CARD_ADVANCE.FROM'),
      fields: [
        `${getProductType(
          fromProduct
        )} ${fromProduct.franchise.toLocaleLowerCase()} No. ${
          fromProduct.numberProduct
        }`,
        `Disponible ${this.currencyFormat.transform(
          fromProduct[CARD_ADVANCE_AVAILABLE_FIELD]
        )}`
      ]
    },
    {
      id: 'toward',
      label: this.translate.instant('Hacia'),
      fields: [
        `${getProductType(towardProduct)} No. ${towardProduct.numberProduct}`,
        `${this.currencyFormat.transform(towardProduct.availableBalance)}`
      ],
      edit: CardAdvanceSlide.toward
    },
    {
      id: 'cost',
      label: this.translate.instant('Costo'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(fee))]
    }
  ];
}

export function mapCardAdvanceVoucher(values: any): VoucherItem[] {
  const fromProduct: Product = values.fromProduct;
  const towardProduct: Product = values.towardProduct;
  const installments: string = values.installments;
  const amount: string = values.amount;

  return [
    {
      id: 'amount',
      label: this.translate.instant('Valor'),
      fields: [
        this.currencyFormat.transform(sanitizeCurrency(amount)),
        `${this.translate.instant(
          'CARD_ADVANCE.INSTALLMENTS_DESCRIPTION'
        )}: ${installments}`
      ]
    },
    {
      id: 'from',
      label: this.translate.instant('Desde'),
      fields: [
        `${getProductType(
          fromProduct
        )} ${fromProduct.franchise.toLocaleLowerCase()} No. ${
          fromProduct.numberProduct
        }`
      ]
    },
    {
      id: 'toward',
      label: this.translate.instant('Hacia'),
      fields: [
        `${getFullProductType(towardProduct)}`,
        `No. ${towardProduct.numberProduct}`
      ]
    }
  ];
}
