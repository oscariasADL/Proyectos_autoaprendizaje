import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum QrCancelSlide {
  confirmation = 'confirmation'
}

export const QrCancelStep = {
  [QrCancelSlide.confirmation]: 0
};

export const QR_CANCEL_STEPS: Step[] = [
  {
    id: QrCancelStep[QrCancelSlide.confirmation],
    label: 'Confirma'
  }
];

export const QR_CANCEL_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'qr-pay-confirm-exit-alert',
  title: '¿Estás seguro salir y cancelar la anulación con QR?',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const QR_CANCEL_DATA_ERROR: AlertSheetProperties = {
  type: AlertSheetType.error,
  id: 'qr-pay-scan-error-alert',
  title: 'No fue posible anular tu compra',
  buttons: ['Entendido']
};

export const QR_CANCEL_AVAILABLE_FIELD = 'availableBalance';
