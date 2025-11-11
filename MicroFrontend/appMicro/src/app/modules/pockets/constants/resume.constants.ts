import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';

export const CREATE_POCKET_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Consulta consolidada',
  event_label: 'Crear bolsillo - redirigir a creación de bolsillo'
};

export const CONSOLIDATED_QUERY_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Consulta consolidada',
  event_label:
    'Consulta consolidada - redirigir a consulta detallada de bolsillo'
};

export const POCKET_ADD_CASH_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Consulta detallada',
  event_label: 'Consulta detallada - redirigir a abonar a bolsillo'
};

export const MODIFY_POCKET_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Consulta detallada',
  event_label: 'Consulta detallada -redirigir a modificar bolsillo'
};

export const DELETE_POCKET_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Consulta detallada',
  event_label: 'Consulta detallada - redirigir a eliminar bolsillo'
};

export const DELETE_POCKET_MODAL_EVENT: UtagEvent = {
  track: 'modal',
  tealium_event: 'click',
  event_category: 'Consulta detallada',
  event_label: 'Modal de eliminación - eliminar bolsillo'
};

export const TRANSFER_FROM_POCKET_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Consulta detallada',
  event_label: 'Consulta detallada -redirigir a transferir desde a bolsillo'
};
export const POCKET_ADD_CASH_R_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Consulta detallada',
  event_label: 'Consulta detallada - redirigir a abonar a bolsillo'
};

export const MODIFY_POCKET_R_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Consulta detallada',
  event_label: 'Consulta detallada -redirigir a modificar bolsillo'
};

export const DELETE_POCKET_R_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Consulta detallada',
  event_label: 'Consulta detallada - redirigir a eliminar bolsillo'
};

export const DELETE_POCKET_R_MODAL_EVENT: UtagEvent = {
  track: 'modal',
  tealium_event: 'click',
  event_category: 'Consulta detallada',
  event_label: 'Modal de eliminación - eliminar bolsillo'
};

export const TRANSFER_FROM_POCKET_R_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Consulta detallada',
  event_label: 'Consulta detallada -redirigir a transferir desde a bolsillo'
};
export const POCKETS_RESUME_EVENTS: UtagEvent[] = [
  POCKET_ADD_CASH_R_EVENT,
  MODIFY_POCKET_R_EVENT,
  DELETE_POCKET_R_EVENT,
  DELETE_POCKET_R_MODAL_EVENT,
  TRANSFER_FROM_POCKET_R_EVENT,
  TRANSFER_FROM_POCKET_EVENT,
  CREATE_POCKET_EVENT,
  CONSOLIDATED_QUERY_EVENT,
  POCKET_ADD_CASH_EVENT,
  MODIFY_POCKET_EVENT,
  DELETE_POCKET_EVENT,
  DELETE_POCKET_MODAL_EVENT,
  TRANSFER_FROM_POCKET_EVENT
];
