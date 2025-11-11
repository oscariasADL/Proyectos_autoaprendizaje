import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { getProductType } from '@modules/product/helpers/product.helper';
import {
  PAYMENT_UNREGISTERED_SERVICE_AVAILABLE_FIELD,
  PaymentUnregisteredServiceSlide
} from '../constants/payment-unregistered-service.constants';
import { getDate } from '@commons/helpers/general.helpers';

export function mapPaymentUnregisteredServiceConfirm(
  values: any
): VoucherItem[] {
  const { bill, fromProduct, fee, reference, isBarcode, costGmf } = values;
  const gmfMapped = costGmf ? this.currencyFormat.transform(costGmf) : 0;
  const payValue: number = sanitizeCurrency(values.payValue);

  return [
    {
      id: 'payValue',
      label: this.translate.instant('Valor'),
      fields: [
        `${this.currencyFormat.transform(payValue)}`,
        ...(costGmf
          ? [`${this.translate.instant('GMF.VALUE', { value: gmfMapped })} `]
          : [])
      ],
      edit: isBarcode
        ? null
        : PaymentUnregisteredServiceSlide.reference.toString()
    },
    {
      id: 'from',
      label: this.translate.instant('DEBT_PURCHASE.FROM'),
      fields: [
        `${getProductType(fromProduct)}  No. ${fromProduct.numberProduct}`,
        `Disponible ${this.currencyFormat.transform(
          fromProduct[PAYMENT_UNREGISTERED_SERVICE_AVAILABLE_FIELD]
        )}`
      ],
      edit: PaymentUnregisteredServiceSlide.from.toString()
    },
    {
      id: 'service',
      label: 'Servicio',
      fields: [bill.name],
      edit: PaymentUnregisteredServiceSlide.service.toString()
    },
    {
      id: 'reference',
      label: 'Referencia',
      fields: [`No. ${reference}`],
      edit: isBarcode
        ? null
        : PaymentUnregisteredServiceSlide.reference.toString()
    },
    {
      id: 'cost',
      label: this.translate.instant('Costo'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(fee))]
    }
  ];
}

export function mapPaymentUnregisteredServiceVoucher(
  values: any
): VoucherItem[] {
  const { bill, fromProduct, reference, isBarcode } = values;
  const payValue: number = sanitizeCurrency(values.payValue);

  return [
    {
      id: 'payValue',
      label: this.translate.instant('Valor'),
      fields: [this.currencyFormat.transform(payValue)]
    },
    {
      id: 'from',
      label: this.translate.instant('DEBT_PURCHASE.FROM'),
      fields: [
        `${getProductType(fromProduct)}  No. ${fromProduct.numberProduct}`,
        `Disponible ${this.currencyFormat.transform(
          fromProduct[PAYMENT_UNREGISTERED_SERVICE_AVAILABLE_FIELD]
        )}`
      ]
    },
    {
      id: 'service',
      label: 'Servicio',
      fields: [bill.name]
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
