import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';

export const ADD_CASH_TO_T_POCKETS = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Abonar a bolsillo organizador',
  event_label: 'Abonar a bolsillo organizador - abonar - continuar'
};
export const ADD_CASH_TO_T_POCKETS_CONFIRM = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Abonar a bolsillo organizador',
  event_label: 'Abonar a bolsillo organizador - abonar - abonar'
};

export const ADD_CASH_TO_R_POCKETS = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Abonar a bolsillo con rentabilidad',
  event_label: 'Abonar a bolsillo con rentabilidad - abonar - continuar'
};
export const ADD_CASH_TO_R_POCKETS_CONFIRM = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Abonar a bolsillo con rentabilidad',
  event_label: 'Abonar a bolsillo con rentabilidad - abonar - abonar'
};

export const POCKETS_ADD_EVENTS: UtagEvent[] = [
  ADD_CASH_TO_T_POCKETS,
  ADD_CASH_TO_R_POCKETS,
  ADD_CASH_TO_T_POCKETS_CONFIRM,
  ADD_CASH_TO_R_POCKETS_CONFIRM
];
