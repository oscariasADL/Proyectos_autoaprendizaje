import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { Product } from '@commons/entities/product/product.interface';
import {
  capitalize,
  capitalizeAll,
  sanitizeCurrency
} from '@commons/helpers/text.helpers';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import { UpdateInstallmentsSlide } from '@modules/product-options/credit-movements/pages/update-installments/constants/update-installments.constants';
import { getProductType } from '@modules/product/helpers/product.helper';

export function mapUpdateInstallmentsConfirm(values: any): VoucherItem[] {
  const fromProduct: Product = values.fromProduct;
  const movement: CreditMovement = values.movement;
  const installments: number = values.installments;
  const fee: string = values.fee;

  return [
    {
      id: 'transaction',
      label: this.translate.instant('UPDATE_INSTALLMENTS.FIELDS.TRANSACTION'),
      fields: [
        capitalize(movement?.purchaseDescription),
        capitalizeAll(movement.companyDescription)
      ],
      edit: UpdateInstallmentsSlide.movement.toString()
    },
    /*{
      id: 'product',
      label: this.translate.instant('UPDATE_INSTALLMENTS.FIELDS.PRODUCT'),
      fields: [
        `${getProductType(fromProduct)} ${capitalize(
          fromProduct.franchise
        )} ${this.translate.instant('ACCOUNT_NUMBER')} ${
          fromProduct.numberProduct
        }`
      ]
    },*/
    {
      id: 'balance',
      label: this.translate.instant('UPDATE_INSTALLMENTS.FIELDS.BALANCE'),
      fields: [this.currencyFormat.transform(movement?.balance)]
    },
    {
      id: 'rate',
      label: this.translate.instant('UPDATE_INSTALLMENTS.FIELDS.RATE'),
      fields: [`${movement?.rate} %`]
    },
    {
      id: 'installments',
      label: this.translate.instant(
        'UPDATE_INSTALLMENTS.FIELDS.INSTALLMENTS_NUMBER'
      ),
      fields: [installments.toString()],
      edit: UpdateInstallmentsSlide.installments.toString()
    }
    /*{
      id: 'cost',
      label: this.translate.instant('DIRECTED_PAYMENTS.FIELDS.COST'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(fee))]
    }*/
  ];
}

export function mapUpdateInstallmentsVoucher(values: any): VoucherItem[] {
  const fromProduct: Product = values.fromProduct;
  const movement: CreditMovement = values.movement;
  const installments: number = values.installments;

  return [
    {
      id: 'transaction',
      label: this.translate.instant('UPDATE_INSTALLMENTS.FIELDS.TRANSACTION'),
      fields: [
        `${capitalizeAll(movement?.purchaseDescription)} - ${capitalizeAll(
          movement.companyDescription
        )}`
      ]
    },
    {
      id: 'product',
      label: this.translate.instant('UPDATE_INSTALLMENTS.FIELDS.PRODUCT'),
      fields: [
        `${getProductType(fromProduct)} ${capitalize(
          fromProduct.franchise
        )} ${this.translate.instant('ACCOUNT_NUMBER')} ${
          fromProduct.numberProduct
        }`
      ]
    },
    {
      id: 'installments',
      label: this.translate.instant('UPDATE_INSTALLMENTS.FIELDS.INSTALLMENTS'),
      fields: [installments]
    },
    {
      id: 'balance',
      label: this.translate.instant('UPDATE_INSTALLMENTS.FIELDS.BALANCE'),
      fields: [this.currencyFormat.transform(movement?.balance)]
    }
  ];
}
