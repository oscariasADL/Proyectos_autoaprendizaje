import { SecureKeys } from '@commons/constants/keys.constants';
import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum UpdateInstallmentsSlide {
  movement,
  installments,
  confirmation
}

export const UPDATE_INSTALLMENTS_STEPS: Step[] = [
  {
    id: UpdateInstallmentsSlide.movement,
    label: 'UPDATE_INSTALLMENTS.STEPS.MOVEMENT'
  },
  {
    id: UpdateInstallmentsSlide.installments,
    label: 'UPDATE_INSTALLMENTS.STEPS.INSTALLMENTS'
  },
  {
    id: UpdateInstallmentsSlide.confirmation,
    label: 'UPDATE_INSTALLMENTS.STEPS.CONFIRM'
  }
];

export const UPDATE_INSTALLMENTS_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'update-installments-confirm-exit-alert',
  title: 'UPDATE_INSTALLMENTS.EXIT_ALERT.TITLE',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const UPDATE_INSTALLMENTS_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenUpdateInstallmentsInfo,
  id: 'update-installments-alert-info',
  title: 'UPDATE_INSTALLMENTS.INFO_ALERT.TITLE',
  icon: 'modificar-cuota.svg',
  description: 'UPDATE_INSTALLMENTS.INFO_ALERT.DESCRIPTION',
  buttons: ['ACTIONS.COPY_THAT']
};

export const UPDATE_INSTALLMENTS_AVAILABLE_FIELD = 'availableBalance';

export const LABELS_FOR_DEBIT_PURCHASE: string[] = [
  'COMPRA CARTERA',
  'COMPRA DE CARTERA',
  'COMPRA DE CARTERA AUT'
];
