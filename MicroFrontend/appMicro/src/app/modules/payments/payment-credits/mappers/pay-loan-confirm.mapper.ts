import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { Product } from '@commons/entities/product/product.interface';
import {
  isNullOrUndefinedOrEmpty,
  sanitizeCurrency
} from '@commons/helpers/text.helpers';
import {
  PAY_LOAN_AVAILABLE_FIELD,
  PAY_LOAN_PAYMENT_TYPE_TEXT,
  PayLoanSlide
} from '@modules/payments/payment-credits/constants/pay-loan.constants';
import {
  CurrencyType,
  PayLoanPaymentType
} from '@modules/payments/payment-credits/entities/pay-loan.interface';
import { PaymentCredit } from '@modules/payments/payment-credits/entities/payment-credits.interface';
import { getProductType } from '@modules/product/helpers/product.helper';
import { getDate } from '@commons/helpers/general.helpers';

export function mapPayLoanConfirm(values: any): VoucherItem[] {
  const paymentType: PayLoanPaymentType = values.paymentType;
  const currencyType: CurrencyType = values.currencyType;
  const fromProduct: Product = values.fromProduct;
  const credit: PaymentCredit = values.credit;
  const amount: string = values.amount;
  const fee: string = values.fee;
  const { costGmf } = values;
  const gmfMapped = costGmf ? this.currencyFormat.transform(costGmf) : 0;

  return [
    {
      id: 'amount',
      label: this.translate.instant('PAYMENTS.PAY_LOAN.FIELDS.VALUE'),
      fields: [
        this.currencyFormat.transform(sanitizeCurrency(amount)),
        ...(costGmf
          ? [`${this.translate.instant('GMF.VALUE', { value: gmfMapped })} `]
          : []),
        ...(currencyType === CurrencyType.USD
          ? [
              this.translate.instant('PAYMENTS.PAY_LOAN.FIELDS.DOLLAR_PAY'),
              this.translate.instant('PAYMENTS.PAY_LOAN.FIELDS.MESSAGE')
            ]
          : [])
      ],
      edit: PayLoanSlide.amount
    },
    {
      id: 'from',
      label: this.translate.instant('PAYMENTS.PAY_LOAN.FIELDS.FROM'),
      fields: [
        `${getProductType(fromProduct)} ${this.translate.instant(
          'ACCOUNT_NUMBER'
        )} ${fromProduct.numberProduct}`,
        `${this.translate.instant('AVAILABLE')} ${this.currencyFormat.transform(
          fromProduct[PAY_LOAN_AVAILABLE_FIELD]
        )}`
      ],
      edit: PayLoanSlide.from
    },
    {
      id: 'toward',
      label: this.translate.instant('PAYMENTS.PAY_LOAN.FIELDS.TOWARD'),
      fields: [credit.loanName, credit.numberProduct, credit.bankName]
    },
    ...(!isNullOrUndefinedOrEmpty(paymentType)
      ? [
          {
            id: 'type',
            label: this.translate.instant('PAYMENTS.PAY_LOAN.FIELDS.TYPE'),
            fields: PAY_LOAN_PAYMENT_TYPE_TEXT[paymentType].map((item) =>
              this.translate.instant(item)
            ),
            edit: PayLoanSlide.type
          }
        ]
      : []),
    {
      id: 'cost',
      label: this.translate.instant('PAYMENTS.PAY_LOAN.FIELDS.COST'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(fee))]
    }
  ];
}

export function mapPayLoanVoucher(values: any): VoucherItem[] {
  const currencyType: CurrencyType = values.currencyType;
  const fromProduct: Product = values.fromProduct;
  const credit: PaymentCredit = values.credit;
  const amount: string = values.amount;
  const fee: string = values.fee;

  return [
    {
      id: 'amount',
      label: this.translate.instant('PAYMENTS.PAY_LOAN.FIELDS.VALUE'),
      fields: [
        this.currencyFormat.transform(sanitizeCurrency(amount)),
        ...(currencyType === CurrencyType.USD
          ? [
              this.translate.instant('PAYMENTS.PAY_LOAN.FIELDS.DOLLAR_PAY'),
              this.translate.instant('PAYMENTS.PAY_LOAN.FIELDS.MESSAGE')
            ]
          : [])
      ]
    },
    {
      id: 'from',
      label: this.translate.instant('PAYMENTS.PAY_LOAN.FIELDS.FROM'),
      fields: [
        `${getProductType(fromProduct)} ${this.translate.instant(
          'ACCOUNT_NUMBER'
        )} ${fromProduct.numberProduct}`
      ]
    },
    {
      id: 'toward',
      label: this.translate.instant('PAYMENTS.PAY_LOAN.FIELDS.TOWARD'),
      fields: [credit.loanName, credit.numberProduct, credit.bankName]
    },
    {
      id: 'cost',
      label: this.translate.instant('PAYMENTS.PAY_LOAN.FIELDS.COST'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(fee))]
    },
    {
      id: 'pay-loan-confirm-date-time',
      label: this.translate.instant('Fecha'),
      fields: [...getDate.bind(this)()]
    }
  ];
}
