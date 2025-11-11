import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { getProductType } from '@modules/product/helpers/product.helper';
import {
  PaytaxSlide,
  PAY_TAX_AVAILABLE_FIELD
} from '../constants/pay-tax.constants';
import { getDate } from '@commons/helpers/general.helpers';

export function mapPayTaxConfirm(values: any): VoucherItem[] {
  const {
    fromProduct,
    fee,
    city,
    reference,
    agreement,
    agreementDetail,
    costGmf
  } = values;

  const gmfMapped = costGmf ? this.currencyFormat.transform(costGmf) : 0;

  return [
    {
      id: 'payValue',
      label: this.translate.instant('Valor'),
      fields: [
        `${this.currencyFormat.transform(
          sanitizeCurrency(agreementDetail.amount)
        )}`,
        ...(costGmf
          ? [`${this.translate.instant('GMF.VALUE', { value: gmfMapped })} `]
          : [])
      ]
    },
    {
      id: 'from',
      label: this.translate.instant('DEBT_PURCHASE.FROM'),
      fields: [
        `${getProductType(fromProduct)}  No. ${fromProduct.numberProduct}`,
        `Disponible ${this.currencyFormat.transform(
          fromProduct[PAY_TAX_AVAILABLE_FIELD]
        )}`
      ],
      edit: PaytaxSlide.from.toString()
    },
    {
      id: 'city',
      label: 'Ciudad',
      fields: [city.name],
      edit: PaytaxSlide.city.toString()
    },
    {
      id: 'tax',
      label: 'Impuesto',
      fields: [agreement.name],
      edit: PaytaxSlide.agreement.toString()
    },
    {
      id: 'reference',
      label: 'Referencia',
      fields: [`No. ${reference}`],
      edit: PaytaxSlide.reference.toString()
    },
    {
      id: 'cost',
      label: this.translate.instant('Costo'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(fee))]
    }
  ];
}

export function mapPayTaxVoucher(values: any): VoucherItem[] {
  const { fromProduct, city, reference, agreement, agreementDetail } = values;

  return [
    {
      id: 'payValue',
      label: this.translate.instant('Valor'),
      fields: [
        this.currencyFormat.transform(sanitizeCurrency(agreementDetail.amount))
      ]
    },
    {
      id: 'from',
      label: this.translate.instant('DEBT_PURCHASE.FROM'),
      fields: [
        `${getProductType(fromProduct)}  No. ${fromProduct.numberProduct}`,
        `Disponible ${this.currencyFormat.transform(
          fromProduct[PAY_TAX_AVAILABLE_FIELD]
        )}`
      ]
    },
    {
      id: 'city',
      label: 'Ciudad',
      fields: [city.name]
    },
    {
      id: 'tax',
      label: 'Impuesto',
      fields: [agreement.name]
    },
    {
      id: 'reference',
      label: 'Referencia',
      fields: [`No. ${reference}`]
    },
    {
      id: 'date-time',
      label: 'Fecha',
      fields: [...getDate.bind(this)()]
    }
  ];
}
