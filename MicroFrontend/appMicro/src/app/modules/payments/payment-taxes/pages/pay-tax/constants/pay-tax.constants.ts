import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { ProductFilterSelector } from '@commons/entities/product/product-types.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { Step } from '@modules/forms-avv/entities/stepper.interface';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';

export enum PaytaxSlide {
  from,
  city,
  agreement,
  reference,
  confirmation
}

export const PAY_TAX_STEPS: Step[] = [
  {
    id: PaytaxSlide.from,
    label: 'Desde'
  },
  {
    id: PaytaxSlide.city,
    label: 'Ciudad'
  },
  {
    id: PaytaxSlide.agreement,
    label: 'Impuesto'
  },
  {
    id: PaytaxSlide.reference,
    label: 'Ref'
  },
  {
    id: PaytaxSlide.confirmation,
    label: 'Confirma'
  }
];

export const PAY_TAX_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'debit-purchase-confirm-exit-alert',
  title: '¿Estás seguro salir y cancelar el pago del servicio?',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const PAY_TAX_AVAILABLE_FIELD = 'availableBalance';

export const accountFilters: ProductFilterSelector = {
  typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA],
  excludeSubtypeAccountProducts: [ProductTypeDetail.CER]
};
