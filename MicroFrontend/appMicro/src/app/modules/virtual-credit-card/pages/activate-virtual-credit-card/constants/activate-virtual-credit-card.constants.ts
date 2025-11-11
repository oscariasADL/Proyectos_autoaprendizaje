import { Step } from '@modules/forms-avv/entities/stepper.interface';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';

export enum ActivateVirtualCreditCardSlide {
  from = 'from',
  config = 'config',
  confirm = 'confirm'
}

export const ACTIVATE_VIRTUAL_CREDIT_CARD_STEP = {
  [ActivateVirtualCreditCardSlide.from]: 0,
  [ActivateVirtualCreditCardSlide.config]: 1,
  [ActivateVirtualCreditCardSlide.confirm]: 2
};

export const ACTIVATE_VIRTUAL_CREDIT_CARD_STEPS: Step[] = [
  {
    id: ACTIVATE_VIRTUAL_CREDIT_CARD_STEP[ActivateVirtualCreditCardSlide.from],
    label: 'VIRTUAL_CREDIT_CARD.ACTIVATE.STEPS.FROM'
  },
  {
    id: ACTIVATE_VIRTUAL_CREDIT_CARD_STEP[
      ActivateVirtualCreditCardSlide.config
    ],
    label: 'VIRTUAL_CREDIT_CARD.ACTIVATE.STEPS.CONFIG'
  },
  {
    id: ACTIVATE_VIRTUAL_CREDIT_CARD_STEP[
      ActivateVirtualCreditCardSlide.confirm
    ],
    label: 'VIRTUAL_CREDIT_CARD.ACTIVATE.STEPS.INFO'
  }
];

export const ACTIVATE_VIRTUAL_CREDIT_CARD_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'qr-pay-confirm-exit-alert',
  title:
    '¿Estás seguro de salir y cancelar la activación tu tarjeta crédito virtual?',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};
export const ACTIVATE_TCV: UtagEvent = {
  track: 'link',
  tealium_event: 'link',
  event_category: 'Activar TCV',
  event_label: 'Activar TCV - onboarding activacion'
};
export const ACTIVATE_TCV_CONFIG: UtagEvent = {
  track: 'link',
  tealium_event: 'link',
  event_category: 'Activar TCV',
  event_label: 'Activar TCV - configurar tarjeta'
};
export const ACTIVATE_TCV_CONFIRM: UtagEvent = {
  track: 'link',
  tealium_event: 'link',
  event_category: 'Activar TCV',
  event_label: 'Activar TCV - confirmar'
};
