import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import {
  capitalize,
  capitalizeAll,
  sanitizeCurrency
} from '@commons/helpers/text.helpers';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import {
  DIRECTED_PAYMENT_AVAILABLE_FIELD,
  DirectedPaymentSlide
} from '@modules/product-options/credit-movements/pages/directed-payment/constants/directed-payment.constants';
import {
  getFullProductType,
  getProductType,
  srcImgFranchiseV2
} from '@modules/product/helpers/product.helper';

export function mapDirectedPaymentConfirm(values: any): VoucherItem[] {
  const fromProduct: Product = values.fromProduct;
  const selectedMovements: CreditMovement[] = values.selectedMovements;
  const totalAmount: number = selectedMovements.reduce(
    (accumulator, movement) =>
      sanitizeCurrency(movement.valueToPay.toString()) + accumulator,
    0
  );
  const fee: string = values.fee;

  return [
    {
      id: 'transactions',
      label:
        selectedMovements.length > 1
          ? this.translate.instant('DIRECTED_PAYMENTS.FIELDS.TRANSACTIONS')
          : this.translate.instant('DIRECTED_PAYMENTS.FIELDS.TRANSACTION'),
      fields: mapTransactionsFields.bind(this)(selectedMovements)
    },
    {
      id: 'amount',
      label: this.translate.instant('DIRECTED_PAYMENTS.FIELDS.VALUE'),
      fields: [this.currencyFormat.transform(totalAmount)],
      edit: DirectedPaymentSlide.amount.toString()
    },
    {
      id: 'from',
      label: this.translate.instant('DIRECTED_PAYMENTS.FIELDS.FROM'),
      fields: [
        `${getProductType(fromProduct)} ${this.translate.instant(
          'ACCOUNT_NUMBER'
        )} ${fromProduct.numberProduct}`,
        `${this.translate.instant('AVAILABLE')} ${this.currencyFormat.transform(
          fromProduct[DIRECTED_PAYMENT_AVAILABLE_FIELD]
        )}`
      ],
      edit: DirectedPaymentSlide.amount.toString()
    },
    {
      id: 'cost',
      label: this.translate.instant('DIRECTED_PAYMENTS.FIELDS.COST'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(fee))]
    }
  ];
}

export function mapDirectedPaymentVoucher(values: any): VoucherItem[] {
  const fromProduct: Product = values.fromProduct;
  const towardProduct: Product = values.towardProduct;
  const selectedMovements: CreditMovement[] = values.selectedMovements;
  const totalAmount: number = selectedMovements.reduce(
    (accumulator, movement) =>
      sanitizeCurrency(movement.valueToPay.toString()) + accumulator,
    0
  );

  return [
    {
      id: 'amount',
      label:
        selectedMovements.length > 1
          ? this.translate.instant('DIRECTED_PAYMENTS.FIELDS.TOTAL_VALUE')
          : this.translate.instant('DIRECTED_PAYMENTS.FIELDS.VALUE'),
      fields: [this.currencyFormat.transform(totalAmount)]
    },
    {
      id: 'from',
      label: this.translate.instant('DIRECTED_PAYMENTS.FIELDS.FROM'),
      fields: [
        `${getProductType(fromProduct)} ${this.translate.instant(
          'ACCOUNT_NUMBER'
        )} ${fromProduct.numberProduct}`
      ]
    },
    {
      id: 'toward',
      label: this.translate.instant('DIRECTED_PAYMENTS.FIELDS.TOWARD'),
      fields: [
        towardProduct.type === TypeAccount.LOC
          ? `${getFullProductType(towardProduct)}
           No. ${towardProduct.numberProduct}`
          : `<img alt="icon"
          class="franchise-img"
          src="${srcImgFranchiseV2(towardProduct.franchise)}"> ${capitalizeAll(
              towardProduct.cardType
            )}  ${this.translate.instant('ACCOUNT_NUMBER')} ${
              towardProduct.numberProduct
            }`
      ]
    }
  ];
}

function mapTransactionsFields(creditMovements: CreditMovement[]): string[] {
  const length = creditMovements.length;
  return creditMovements.map((movement: CreditMovement) => {
    return `${capitalize(movement.purchaseDescription)}<br/>
      <small>${capitalizeAll(movement.companyDescription)}</small>
      ${
        length > 1
          ? `<br/><small>${this.currencyFormat.transform(
              sanitizeCurrency(movement.valueToPay.toString())
            )}</small><br/><br/>`
          : ''
      }`;
  });
}
