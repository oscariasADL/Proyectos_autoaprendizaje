import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const TAG_AVAL_CANCEL_CUSTOMIZATION_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'personalizacion Tag AVAL',
  event_label:
    'modal de confirmacion - cancelar la personalización del tag aval - cancelar'
};

export const TAG_AVAL_CONFIRM_CUSTOMIZATION_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'personalizacion Tag AVAL',
  event_label:
    'modal de confirmacion - confirmar la personalización del tag aval - confirmar'
};

export const TAG_AVAL_CONTINUE_CUSTOMIZATION_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'personalizacion Tag AVAL',
  event_label:
    'personalizar tag aval - continuar con la personalización del tag aval - cancelar'
};

export const TAG_AVAL_CANCEL_CUSTOMIZATION_EVENT_ALT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'personalizacion Tag AVAL',
  event_label:
    'personalizar tag aval - cancelar la personalización del tag aval - cancelar'
};

export const TAG_AVAL_UPDATE_NAME_CUSTOMIZATION_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'personalizacion Tag AVAL',
  event_label:
    'personalizar tag aval - actualizar nombre del tag aval  - nuevo tag aval'
};

export const TAG_AVAL_REDIRECT_CANCEL_CUSTOMIZATION_MODAL_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'personalizacion Tag AVAL',
  event_label:
    'modal de confirmación personalizar tag aval - redirigir a personalización de tag aval - cancelar'
};

export const TAG_AVAL_REDIRECT_CONTINUE_CUSTOMIZATION_MODAL_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'personalizacion Tag AVAL',
  event_label:
    'modal de confirmación personalizar tag aval - redirigir a personalización de tag aval - continuar'
};

export const CUSTOMIZE_AVAL_TAG_ALERT_INFO: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'aval-icons/tag-aval-transfers.svg',
  id: 'customize-aval-tag-alert-info',
  title: 'CUSTOMIZE_AVAL_TAG.ALERT_INFO.TITLE',
  description: 'CUSTOMIZE_AVAL_TAG.ALERT_INFO.DESCRIPTION',
  buttons: ['ACTIONS.CONTINUE', 'ACTIONS.CANCEL'],
  utag: TAG_AVAL_REDIRECT_CONTINUE_CUSTOMIZATION_MODAL_EVENT.event_label,
  utagCategory:
    TAG_AVAL_REDIRECT_CONTINUE_CUSTOMIZATION_MODAL_EVENT.event_category,
  utagCancel: TAG_AVAL_REDIRECT_CANCEL_CUSTOMIZATION_MODAL_EVENT.event_label
};

export const CUSTOMIZA_AVAL_TAG_EVENTS: UtagEvent[] = [
  TAG_AVAL_CANCEL_CUSTOMIZATION_EVENT,
  TAG_AVAL_CANCEL_CUSTOMIZATION_EVENT_ALT,
  TAG_AVAL_CONFIRM_CUSTOMIZATION_EVENT,
  TAG_AVAL_CONTINUE_CUSTOMIZATION_EVENT,
  TAG_AVAL_REDIRECT_CANCEL_CUSTOMIZATION_MODAL_EVENT,
  TAG_AVAL_REDIRECT_CONTINUE_CUSTOMIZATION_MODAL_EVENT,
  TAG_AVAL_UPDATE_NAME_CUSTOMIZATION_EVENT
];
