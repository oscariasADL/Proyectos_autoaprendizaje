import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';

export const DELETE_R_POCKET_TAG = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Eliminar bolsillo organizador',
  event_label: 'Eliminar bolsillo organizador - eliminar'
};
export const DELETE_T_POCKET_TAG = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Eliminar bolsillo con rentabilidad',
  event_label: 'Eliminar bolsillo con rentabilidad - eliminar'
};
export const POCKETS_DELETE_EVENTS: UtagEvent[] = [
  DELETE_R_POCKET_TAG,
  DELETE_T_POCKET_TAG
];
