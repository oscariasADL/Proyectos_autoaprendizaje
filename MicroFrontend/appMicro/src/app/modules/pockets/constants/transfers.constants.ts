import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';

export const TRANSFER_FROM_POCKETS: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Transferir desde bolsillo organizador',
  event_label: 'Transferir desde bolsillo organizador - continuar - continuar'
};
export const TRANSFER_FROM_POCKETS_CONFIRM = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'Transferir desde bolsillo organizador',
  event_label: 'Transferir desde bolsillo organizador - continuar - transferir'
};

export const POCKETS_TRANSFER_EVENTS: UtagEvent[] = [
  TRANSFER_FROM_POCKETS,
  TRANSFER_FROM_POCKETS_CONFIRM
];
