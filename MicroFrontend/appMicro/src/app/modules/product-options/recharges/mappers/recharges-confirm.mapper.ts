import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { Product } from '@commons/entities/product/product.interface';
import { capitalize, sanitizeCurrency } from '@commons/helpers/text.helpers';
import {
  RECHARGES_AVAILABLE_FIELD,
  RechargesSlide
} from '@modules/product-options/recharges/constants/recharges.constants';
import { getProductType } from '@modules/product/helpers/product.helper';
import { getDate } from '@commons/helpers/general.helpers';

export function mapRechargesConfirm(values: any): VoucherItem[] {
  const productOrigin: Product = values.productOrigin;
  const mobileOperator: string = values.mobileOperator;
  const phoneNumber: string = values.phoneNumber;
  const amount: string = values.amount;
  const fee: string = values.fee;
  const costGmf = values.costGmf;
  const gmfMapped = costGmf ? this.currencyFormat.transform(costGmf) : 0;

  return [
    {
      id: 'amount',
      label: this.translate.instant('Valor'),
      fields: [
        `${this.currencyFormat.transform(sanitizeCurrency(amount))}`,
        ...(costGmf
          ? [`${this.translate.instant('GMF.VALUE', { value: gmfMapped })} `]
          : [])
      ],
      edit: RechargesSlide.amount
    },
    {
      id: 'from',
      label: this.translate.instant('Desde'),
      fields: [
        `${getProductType(productOrigin)} No. ${productOrigin.numberProduct}`,
        `Disponible ${this.currencyFormat.transform(
          productOrigin[RECHARGES_AVAILABLE_FIELD]
        )}`
      ],
      edit: RechargesSlide.productOrigin
    },
    {
      id: 'phone-company',
      label: this.translate.instant('Empresa de telefonía'),
      fields: [
        `<img src="${this.imageUrl.transform(
          'mobile-icons/' + mobileOperator + '-fill.svg'
        )}" alt=""> ${capitalize(mobileOperator)}`
      ],
      edit: RechargesSlide.operator
    },
    {
      id: 'phone-number',
      label: this.translate.instant('Número de celular'),
      fields: [phoneNumber],
      edit: RechargesSlide.phoneNumber
    },
    {
      id: 'cost',
      label: this.translate.instant('Costo'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(fee))]
    }
  ];
}

export function mapRechargesVoucher(values: any): VoucherItem[] {
  const productOrigin: Product = values.productOrigin;
  const mobileOperator: string = values.mobileOperator;
  const phoneNumber: string = values.phoneNumber;
  const amount: string = values.amount;

  return [
    {
      id: 'amount',
      label: this.translate.instant('Valor'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(amount))]
    },
    {
      id: 'from',
      label: this.translate.instant('Desde'),
      fields: [
        `${getProductType(productOrigin)} No. ${productOrigin.numberProduct}`,
        `Disponible ${this.currencyFormat.transform(
          productOrigin[RECHARGES_AVAILABLE_FIELD]
        )}`
      ]
    },
    {
      id: 'phone-company',
      label: this.translate.instant('Empresa de telefonía'),
      fields: [
        `<img src="${this.imageUrl.transform(
          'mobile-icons/' + mobileOperator + '-fill.svg'
        )}" alt=""> ${capitalize(mobileOperator)}`
      ]
    },
    {
      id: 'phone-number',
      label: this.translate.instant('Número de celular'),
      fields: [phoneNumber]
    },
    {
      id: 'date-time',
      label: this.translate.instant('Fecha'),
      fields: [...getDate.bind(this)()]
    }
  ];
}
