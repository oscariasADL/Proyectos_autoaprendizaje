import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { TransfiyaAuthorizationItem } from '@commons/entities/notifications/transfiya.entities';
import { Product } from '@commons/entities/product/product.interface';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { getProductType } from '@modules/product/helpers/product.helper';
import {
  TRANSFIYA_MANAGEMENT_AVAILABLE_FIELD,
  TransfiyaManagementSlide
} from '@modules/transfiya-management/constants/transfiya-management.constants';

export function mapTransfiyaManagementConfirm(values: any): VoucherItem[] {
  const notification: TransfiyaAuthorizationItem = values.notification;
  const productSelected: Product = values.productSelected;
  const isDispatch: boolean = values.isDispatch;
  const fee: string = values.fee;

  return [
    {
      id: 'amount',
      label: this.translate.instant('Valor'),
      fields: [this.currencyFormat.transform(notification.amount.toString())]
    },
    {
      id: 'targetNumber',
      label: isDispatch ? 'Hacia' : 'Desde',
      fields: [notification.targetNumber]
    },
    {
      id: 'management',
      label: isDispatch ? 'Desde' : 'Hacia',
      fields: [
        `${getProductType(productSelected)}  No. ${
          productSelected.numberProduct
        }`,
        `Disponible ${this.currencyFormat.transform(
          productSelected[TRANSFIYA_MANAGEMENT_AVAILABLE_FIELD]
        )}`
      ],
      edit: TransfiyaManagementSlide.management.toString()
    },
    {
      id: 'cost',
      label: this.translate.instant('Costo'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(fee))]
    }
  ];
}

export function mapTransfiyaManagementVoucher(values: any): VoucherItem[] {
  const notification: TransfiyaAuthorizationItem = values.notification;
  const productSelected: Product = values.productSelected;
  const isDispatch: boolean = values.isDispatch;

  return [
    {
      id: 'amount',
      label: this.translate.instant('Valor'),
      fields: [this.currencyFormat.transform(notification.amount.toString())]
    },
    {
      id: 'targetNumber',
      label: isDispatch ? 'Hacia' : 'Desde',
      fields: [notification.targetNumber]
    },
    {
      id: 'management',
      label: isDispatch ? 'Desde' : 'Hacia',
      fields: [
        `${getProductType(productSelected)}  No. ${
          productSelected.numberProduct
        }`
      ]
    }
  ];
}
