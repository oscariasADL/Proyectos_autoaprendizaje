import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';

export const POCKET_EDIT_T_CONTINUE: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Editar bolsillo organizador',
  event_label: 'Editar bolsillo organizador - continuar - continuar'
};
export const POCKET_EDIT_R_CONTINUE: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Editar bolsillo con rentabilidad',
  event_label: 'Editar bolsillo con rentabilidad - continuar - continuar'
};
export const POCKET_EDIT_R_CONFIRM: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Editar bolsillo con rentabilidad',
  event_label: 'Editar bolsillo con rentabilidad - continuar - confirmar'
};
export const POCKET_EDIT_T_CONFIRM: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Editar bolsillo organizador',
  event_label: 'Editar bolsillo organizador - continuar - confirmar'
};
export const POCKETS_EDIT_EVENTS: UtagEvent[] = [
  POCKET_EDIT_T_CONTINUE,
  POCKET_EDIT_R_CONTINUE,
  POCKET_EDIT_R_CONFIRM,
  POCKET_EDIT_T_CONFIRM
];
