import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { TypeAccount } from '@commons/entities/product/type-account';
import {
  isNullOrUndefined,
  sanitizeCurrency
} from '@commons/helpers/text.helpers';
import {
  getFullProductType,
  getProductType,
  srcImgFranchise
} from '@modules/product/helpers/product.helper';
import {
  DEBIT_PURCHASE_AVAILABLE_FIELD,
  DEBIT_PURCHASE_ROTATING_AVAILABLE_FIELD,
  DebitPurchaseSlide
} from '../constants/debit-purchase.constants';

export function mapDebitPurchaseConfirm(values: any): VoucherItem[] {
  const { fromProduct, bank, account, amount, installments, fee, rates } =
    values;

  return [
    {
      id: 'amount',
      label: this.translate.instant('Valor'),
      fields: [
        this.currencyFormat.transform(sanitizeCurrency(amount)),
        `${this.translate.instant(
          'DEBT_PURCHASE.INSTALLMENTS_NUMBER'
        )}: ${installments}`
      ],
      edit: DebitPurchaseSlide.amount
    },
    {
      id: 'from',
      label: this.translate.instant('DEBT_PURCHASE.FROM'),
      fields: [
        ...[
          fromProduct.type === TypeAccount.LOC
            ? `${getFullProductType(fromProduct)}
           No. ${fromProduct.numberProduct}`
            : `${getProductType(
                fromProduct
              )} ${fromProduct.franchise?.toLocaleLowerCase()} No. ${
                fromProduct.numberProduct
              }`,
          `Disponible ${this.currencyFormat.transform(
            fromProduct[
              fromProduct.type === TypeAccount.LOC
                ? DEBIT_PURCHASE_ROTATING_AVAILABLE_FIELD
                : DEBIT_PURCHASE_AVAILABLE_FIELD
            ]
          )}`
        ],
        ...(!isNullOrUndefined(rates)
          ? [
              this.translate.instant('DEBT_PURCHASE.TOWARD_STEP.PRODUCT_RATE', {
                month: rates.monthRate,
                annual: rates.annualRate
              })
            ]
          : [])
      ],
      ...(fromProduct.type === TypeAccount.LOC
        ? {}
        : {
            edit: DebitPurchaseSlide.from
          })
    },
    {
      id: 'toward',
      label: this.translate.instant('Hacia'),
      fields: [
        bank.label,
        `<img alt="icon" 
          class="franchise-img"
          src="${srcImgFranchise(account)}">
        No. ${account}`
      ],
      edit: DebitPurchaseSlide.toward
    },
    {
      id: 'cost',
      label: this.translate.instant('Costo'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(fee))]
    }
  ];
}

export function mapDebitPurchaseVoucher(values: any): VoucherItem[] {
  const { fromProduct, bank, account, amount, installments, rates } = values;

  return [
    {
      id: 'amount',
      label: this.translate.instant('Valor'),
      fields: [
        this.currencyFormat.transform(sanitizeCurrency(amount)),
        `${this.translate.instant(
          'DEBT_PURCHASE.INSTALLMENTS_NUMBER'
        )}: ${installments}`
      ]
    },
    {
      id: 'from',
      label: this.translate.instant('DEBT_PURCHASE.FROM'),
      fields: [
        ...[
          fromProduct.type === TypeAccount.LOC
            ? `${getFullProductType(fromProduct)}
           No. ${fromProduct.numberProduct}`
            : `${getProductType(
                fromProduct
              )} ${fromProduct.franchise?.toLocaleLowerCase()} No. ${
                fromProduct.numberProduct
              }`
        ],
        ...(!isNullOrUndefined(rates)
          ? [
              this.translate.instant('DEBT_PURCHASE.TOWARD_STEP.PRODUCT_RATE', {
                month: rates.monthRate,
                annual: rates.annualRate
              })
            ]
          : [])
      ]
    },
    {
      id: 'toward',
      label: this.translate.instant('Hacia'),
      fields: [
        bank.label,
        `<img alt="icon" 
          class="franchise-img"
          src="${srcImgFranchise(account)}">
        No. ${account}`
      ]
    }
  ];
}
