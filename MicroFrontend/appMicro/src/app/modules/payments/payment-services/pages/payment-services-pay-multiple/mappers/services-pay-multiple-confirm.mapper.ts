import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { Product } from '@commons/entities/product/product.interface';
import { PaymentBill } from '@modules/payments/payment-services/entities/payment-services.interface';
import {
  capitalize,
  capitalizeAll,
  sanitizeCurrency
} from '@commons/helpers/text.helpers';
import { getProductType } from '@modules/product/helpers/product.helper';
import {
  SERVICES_PAY_MULTIPLE_AVAILABLE_FIELD,
  ServicesPayMultipleSlide
} from '@modules/payments/payment-services/pages/payment-services-pay-multiple/constants/services-pay-multiple.constants';
import { getDate } from '@app/commons/helpers/general.helpers';

export function mapServicesPayMultipleConfirm(values: any): VoucherItem[] {
  const fromProduct: Product = values.fromProduct;
  const bills: PaymentBill[] = values.selectedBills;
  const amount: string = values.totalAmount;
  const fee: string = values.fee;
  const { costGmf } = values;
  const gmfMapped = costGmf ? this.currencyFormat.transform(costGmf) : 0;

  return [
    {
      id: 'amount',
      label:
        bills.length > 1
          ? this.translate.instant('PAYMENTS.SERVICES.FIELDS.TOTAL_VALUE')
          : this.translate.instant('PAYMENTS.SERVICES.FIELDS.VALUE'),
      fields: [
        `${this.currencyFormat.transform(sanitizeCurrency(amount))}`,
        ...(costGmf
          ? [`${this.translate.instant('GMF.VALUE', { value: gmfMapped })} `]
          : [])
      ]
    },
    {
      id: 'toward',
      label: this.translate.instant('PAYMENTS.SERVICES.FIELDS.TOWARD'),
      fields: mapBillsFields.bind(this)(bills),
      edit: ServicesPayMultipleSlide.service
    },
    {
      id: 'from',
      label: this.translate.instant('PAYMENTS.SERVICES.FIELDS.FROM'),
      fields: [
        `${getProductType(fromProduct)} ${this.translate.instant(
          'ACCOUNT_NUMBER'
        )} ${fromProduct.numberProduct}`,
        `${this.translate.instant('AVAILABLE')} ${this.currencyFormat.transform(
          fromProduct[SERVICES_PAY_MULTIPLE_AVAILABLE_FIELD]
        )}`
      ],
      edit: ServicesPayMultipleSlide.from
    },
    {
      id: 'cost',
      label: this.translate.instant('PAYMENTS.SERVICES.FIELDS.COST'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(fee))]
    },
    {
      id: 'date',
      label: this.translate.instant('DIRECTED_PAYMENTS.FIELDS.DATE'),
      fields: [...getDate.bind(this)()]
    }
  ];
}

export function mapServicesPayMultipleVoucher(values: any): VoucherItem[] {
  const fromProduct: Product = values.fromProduct;
  const bills: PaymentBill[] = values.selectedBills;
  const amount: string = values.totalAmount;
  const fee: string = values.fee;
  return [
    {
      id: 'amount',
      label:
        bills.length > 1
          ? this.translate.instant('PAYMENTS.SERVICES.FIELDS.TOTAL_VALUE')
          : this.translate.instant('PAYMENTS.SERVICES.FIELDS.VALUE'),
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
      id: 'cost',
      label: this.translate.instant('PAYMENTS.SERVICES.FIELDS.COST'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(fee))]
    },
    {
      id: 'date',
      label: this.translate.instant('DIRECTED_PAYMENTS.FIELDS.DATE'),
      fields: [...getDate.bind(this)()]
    }
  ];
}

function mapBillsFields(bills: PaymentBill[]): string[] {
  const length = bills.length;
  return bills.map((bill: PaymentBill) => {
    return `${capitalize(bill.organizationName)}<br/>
      <small>Ref. de pago ${capitalizeAll(bill.referenceId)}</small>
      ${
        length > 1
          ? `<br/><small>${this.currencyFormat.transform(
              bill.amount
            )}</small><br/><br/>`
          : ''
      }`;
  });
}
