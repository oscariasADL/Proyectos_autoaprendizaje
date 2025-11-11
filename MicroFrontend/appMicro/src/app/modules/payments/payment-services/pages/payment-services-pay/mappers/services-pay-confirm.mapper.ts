import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { Product } from '@commons/entities/product/product.interface';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { PaymentBill } from '@modules/payments/payment-services/entities/payment-services.interface';
import { mapServiceCardTitle } from '@modules/payments/payment-services/pages/payment-services-home/mappers/payment-services-card.mapper';
import {
  SERVICES_PAY_AVAILABLE_FIELD,
  ServicesPaySlide
} from '@modules/payments/payment-services/pages/payment-services-pay/constants/services-pay.constants';
import { getProductType } from '@modules/product/helpers/product.helper';
import { getDate } from '@commons/helpers/general.helpers';

export function mapServicesPayConfirm(values: any): VoucherItem[] {
  const fromProduct: Product = values.fromProduct;
  const bill: PaymentBill = values.bill;
  const amount: string = values.amount;
  const fee: string = values.fee;

  return [
    {
      id: 'amount',
      label: this.translate.instant('PAYMENTS.SERVICES.FIELDS.VALUE'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(amount))],
      edit: !bill.biller ? ServicesPaySlide.amount : null
    },
    {
      id: 'toward',
      label: this.translate.instant('PAYMENTS.SERVICES.FIELDS.TOWARD'),
      fields: [
        mapServiceCardTitle(bill),
        `${this.translate.instant(
          'PAYMENTS.SERVICES.FIELDS.PAYMENT_REFERENCE'
        )}: ${bill.referenceId}`
      ]
    },
    {
      id: 'from',
      label: this.translate.instant('PAYMENTS.SERVICES.FIELDS.FROM'),
      fields: [
        `${getProductType(fromProduct)} ${this.translate.instant(
          'ACCOUNT_NUMBER'
        )} ${fromProduct.numberProduct}`,
        `${this.translate.instant('AVAILABLE')} ${this.currencyFormat.transform(
          fromProduct[SERVICES_PAY_AVAILABLE_FIELD]
        )}`
      ],
      edit: ServicesPaySlide.from
    },
    {
      id: 'cost',
      label: this.translate.instant('PAYMENTS.SERVICES.FIELDS.COST'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(fee))]
    }
  ];
}

export function mapServicesPayVoucher(values: any): VoucherItem[] {
  const fromProduct: Product = values.fromProduct;
  const bill: PaymentBill = values.bill;
  const amount: string = values.amount;

  return [
    {
      id: 'amount',
      label: this.translate.instant('PAYMENTS.SERVICES.FIELDS.VALUE'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(amount))]
    },
    {
      id: 'from',
      label: this.translate.instant('PAYMENTS.SERVICES.FIELDS.FROM'),
      fields: [
        `${getProductType(fromProduct)} ${this.translate.instant(
          'ACCOUNT_NUMBER'
        )} ${fromProduct.numberProduct}`
      ]
    },
    {
      id: 'toward',
      label: this.translate.instant('PAYMENTS.SERVICES.FIELDS.TOWARD'),
      fields: [mapServiceCardTitle(bill)]
    },
    {
      id: 'reference',
      label: 'Referencia',
      fields: [`No. ${bill.referenceId}`]
    },
    {
      id: 'date-time',
      label: this.translate.instant('Fecha'),
      fields: [...getDate.bind(this)()]
    }
  ];
}
