import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@app/commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export const BRE_B_TRANSFERS_PATH = 'bre-b-transfers';
export const BRE_B_TRANSFER_CONFIRMATION_PATH = 'bre-b-transfers/confirmation';
export const BRE_B_TRANSFER_SPI_KEY_QUERY_PARAM = 'spiKey';
export const BRE_B_TRANSFER_IS_FAVORITE_CONTACT_QUERY_PARAM =
  'isFavoriteContact';
export const BRE_B_TRANSFER_IS_SAVED_CONTACT_QUERY_PARAM = 'isSavedContact';
export const GMF_TRANSACTION_IS_NOT_ALLOWED = 'NO';
export const GMF_TRANSACTION_IS_ALLOWED = 'SI';

export enum BreBTransfersSlide {
  key = 'key',
  data = 'data',
  confirmation = 'confirmation'
}

export const BreBTransfersStep = {
  [BreBTransfersSlide.key]: 0,
  [BreBTransfersSlide.data]: 1,
  [BreBTransfersSlide.confirmation]: 2
};

export const BREB_TRANSFERS_STEPS: Step[] = [
  {
    id: BreBTransfersStep[BreBTransfersSlide.key],
    label: 'TRANSFERS.BRE_B.STEPS.FROM'
  },
  {
    id: BreBTransfersStep[BreBTransfersSlide.data],
    label: ''
  },
  {
    id: BreBTransfersStep[BreBTransfersSlide.confirmation],
    label: 'TRANSFERS.BRE_B.STEPS.CONFIRMATION'
  }
];

export const BRE_B_TRANSFER_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'illustrations/money-error.svg',
  id: 'breb-transfer-confirm-exit-alert',
  title: 'TRANSFERS.BRE_B.EXIT_ALERT.TITLE',
  description: 'TRANSFERS.BRE_B.EXIT_ALERT.DESCRIPTION',
  buttons: [
    'TRANSFERS.BRE_B.EXIT_ALERT.BUTTON_OK',
    'TRANSFERS.BRE_B.EXIT_ALERT.BUTTON_CANCEL'
  ]
};

export const TAG_AVAL_OR_KEY_UTAG_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'transferencias Bre-B',
  event_label: 'transferencias bre-b - enviar dinero - tag aval o llave'
};

export const AMOUT_UTAG_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'transferencias Bre-B',
  event_label: 'transferencias bre-b - enviar dinero - valor a transferir'
};

export const MESSAGE_UTAG_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'transferencias Bre-B',
  event_label: 'transferencias bre-b - enviar dinero - mensaje'
};

export const CONTINUE_BUTTON_UTAG_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'transferencias Bre-B',
  event_label: 'transferencias bre-b - enviar dinero - continuar'
};

export const TRANSFER_SUCCESS_UTAG_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'event_confirmation',
  event_category: 'transferencias Bre-B',
  event_label: 'transferencias bre-b - enviar dinero - exito'
};

export const TRANSFER_FAIL_UTAG_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'event_confirmation',
  event_category: 'transferencias Bre-B',
  event_label: 'transferencias bre-b - enviar dinero - fallido'
};

export const BRE_B_EVENTS: UtagEvent[] = [
  TAG_AVAL_OR_KEY_UTAG_EVENT,
  AMOUT_UTAG_EVENT,
  MESSAGE_UTAG_EVENT,
  CONTINUE_BUTTON_UTAG_EVENT,
  TRANSFER_SUCCESS_UTAG_EVENT,
  TRANSFER_FAIL_UTAG_EVENT
];
